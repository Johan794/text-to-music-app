import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly url: string = 'http://ec2-100-24-32-149.compute-1.amazonaws.com:3000/api/v1/generate-audio' || process.env['BACKEND_URL'];

  constructor(private http: HttpClient) { }

  sendMessage(userMessage: string): Observable<{ audioUrl: string }>{
    return this.http.post<{ audioUrl: string }>(this.url, { inputs: userMessage });
  }
}
