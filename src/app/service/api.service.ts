import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiEndPoint = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  postData(url:string, data) {
    return this.http.post(this.apiEndPoint + url, data);
  }

  getData(url:string) {
    return this.http.get(this.apiEndPoint + url);
  }
}
