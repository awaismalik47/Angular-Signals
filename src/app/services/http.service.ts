import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  baseUrl = "https://api.unsplash.com/search/photos";
  AccessKey = "QzaS3qDWPaH-TBmotU4mlhVBPAgMiU1MKlx09750S4Q";
  
  getAllImages(keyWord: string, page: any = 1) {

    const perPage = 30; // Set the number of results per page
    return this.http.get(`${this.baseUrl}/?page=${page}&query=${keyWord}&per_page=${perPage}&client_id=${this.AccessKey}`);

  }
  downloadImage(imageUrl:any){

    return this.http.get(`${imageUrl}&client_id=${this.AccessKey}`)
    
  }
  
}
