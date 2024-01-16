import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpService) { }
  // getAllImages(keyWord:string,page?:any){
  //   return new Promise((resolve, reject) => {
  //     const response = { data:null as any, status: false, message: null as any };
  //     try {
  //       this.http.getAllImages(keyWord,page).subscribe(
  //         (data) => {
  //           // console.log(data);
  //           response.data = data;
  //           response.message = "success";
  //           response.status = true;
  //           resolve(response);
           
  //         },
  //         (err) => {
  //           response.message = err;
  //           resolve(response);
           
  //         }
  //       );
  //     } catch (error) {
  //       response.message = error;
  //       resolve(response);
       
  //     }
  //   });
    
  // }
  getAllImages(keyWord: string, page?: any): Observable<any> {

    return this.http.getAllImages(keyWord, page).pipe(
      map((data) => {
        return { data, status: true, message: 'success' };
      }),
      catchError((error) => {
        console.error('Error fetching images:', error);
        return of({ data: null, status: false, message: error });
      })
    );
  }

  downloadImage(imgaeUrl: string): Observable<any> {

    return this.http.downloadImage(imgaeUrl).pipe(
      map((data) => {
        return { data, status: true, message: 'success' };
      }),
      catchError((error) => {
        console.error('Error fetching images:', error);
        return of({ data: null, status: false, message: error });
      })
    );
  }




}