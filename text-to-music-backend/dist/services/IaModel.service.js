"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const firebase_1 = require("../config/firebase");
const storage_1 = require("firebase/storage");
const HuggingFace_1 = require("./HuggingFace");
dotenv_1.default.config();
const huggingFaceApiKey = process.env.HUGGINFACE_API_KEY || "";
const modelApi = process.env.MODEL_API_URL || "";
class IaModelService {
    /**
     *
     * @param inputs the prompt to send to the model
     * @returns the url of the auidio file generated by the model and stored in firebase
     */
    queryIaModel(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!huggingFaceApiKey && !modelApi) {
                throw new Error("Hugging face api key or model api not found");
            }
            return yield this.upload(inputs);
        });
    }
    /**
     * Upload the audio file to firebase storage
     * @param inputs the prompt to send to the model
     * @returns the url of the auidio file generated by the model and stored in firebase
     */
    upload(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioBlob = yield (0, HuggingFace_1.query)(inputs, huggingFaceApiKey);
            const metadata = {
                contentType: "audio/wav",
            };
            const uploadTask = (0, storage_1.uploadBytesResumable)(firebase_1.storageRef, audioBlob, metadata);
            uploadTask.on("state_changed", (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            }, (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        console.log("User doesn't have permission to access the object");
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        console.log("User canceled the upload");
                        break;
                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            });
            return (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref).then((downloadURL) => {
                return downloadURL;
            });
        });
    }
}
exports.default = new IaModelService();
