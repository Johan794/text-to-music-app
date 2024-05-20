"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageRef = exports.storage = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(app, "gs://" + process.env.FIREBASE_STORAGE_BUCKET);
exports.storage = storage;
const storageRef = (0, storage_1.ref)(storage, "audio");
exports.storageRef = storageRef;
