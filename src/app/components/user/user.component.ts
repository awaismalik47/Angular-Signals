import { Component, Input, OnInit, Output } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { DataService } from '../../services/data.service';
import { EventEmitter } from 'stream';
import { saveAs } from 'file-saver';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { ImageCreatorComponent } from '../image-creator/image-creator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FileSaverModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',

  
})
export class UserComponent implements OnInit{
  searchSubject = new Subject<string>();
  Images:any;
  currentPage: any;
  searchedValue:any="trending";
  errorMessage="Try Again";
  displayView:any=false;
  downloadDisplay:boolean=false;
  imgUrl!:string
  AccessKey = "QzaS3qDWPaH-TBmotU4mlhVBPAgMiU1MKlx09750S4Q";
  constructor(private data:DataService,private http:HttpClient,private dialog: MatDialog){

  }
ngOnInit(): void {
  console.log("ngOnit on every call")
  this.searchSubject.pipe(
    debounceTime(300), // Adjust the debounce time as needed
    distinctUntilChanged(), // Only emit if the new value is different from the previous one
    switchMap(searchTerm => this.getAllImages(searchTerm, 1))
  ).subscribe(
    () => {
      // Optionally handle any logic after the API call completes
    },
    error => {
      console.error(error);
    }
  );
  console.log("ngOnit of Admin component")
  this.getAllImages(this.searchedValue,1)
  
}
openUserDialog(item:any){
  this.dialog.open(ImageCreatorComponent, {
   
  });
}

async getAllImages(keyWord: string, page?: any) {
  
  this.data.getAllImages(keyWord,page).subscribe(
    (res)=>{
      if(res.status){
        this.Images=res.data['results']; 
        this.displayView=true;
         
      }else{
        this.errorMessage=res.message
      }
    },
    (error)=>{
      this.errorMessage=error;
    }
  )
}

getSearchedImages(value: any) {
if(value)
{
  this.searchSubject.next(value);
}
else{
  this.searchSubject.next("trending")
}
  console.log("searched values here...", value);
}

// getSearchedImages(value:any){
// this.searchedValue=value;
//    this.getAllImages(value,1)
//   console.log("searched values here...",value)

// }
async loadImages(page: any) {
  this.Images=[];
  
let currentPage: number;

if (page === 'previous') {
  currentPage = this.currentPage - 1;
} else if (page === 'next') {
  currentPage = this.currentPage + 1;
} else {
  currentPage = page;
}

if (currentPage < 1) {
  currentPage = 1;
}

// Update the current page
this.currentPage = currentPage;

// Call the API with the updated page number
await this.getAllImages(this.searchedValue, currentPage);
}

indexValue!:number;
viewDownloadBtn(currentIndex:number){
  this.indexValue=currentIndex;
}

// get Downloadable Url of selected Image 
getImageDownloadLink(imageData:any){
  this.data.downloadImage(imageData.links.download_location).subscribe(
    (res)=>{
      if(res.status){
        this.imgUrl=res['data']['url']
        this.downloadImage(this.imgUrl,'test123')
        console.log(this.imgUrl,"response <--")
      }else{
        this.errorMessage=res.message
      }
    },
    (error)=>{
      this.errorMessage=error;
    }
  )
}

// Download Image using blob
downloadImage(imageUrl: string, imageName: string) {
  this.http.get(imageUrl, { responseType: 'arraybuffer' }).subscribe(
    (data: any) => {
      const blob = new Blob([data], { type: 'image/jpeg' });
      console.log("blobbb ",blob)
      saveAs(blob, imageName);
    },
    (error) => {
      console.error('Error downloading image:', error);
    }
  );
}





}
 

