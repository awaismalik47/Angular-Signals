import { Component, Input, OnInit, Output } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { DataService } from '../../services/data.service';
import { EventEmitter } from 'stream';
import { saveAs } from 'file-saver';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FileSaverModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',

  
})
export class UserComponent implements OnInit{
  Images:any;
  currentPage: any;
  searchedValue:any="trending";
  errorMessage="Try Again";
  displayView:any=false;
  downloadDisplay:boolean=false;
  imgUrl!:string
  AccessKey = "QzaS3qDWPaH-TBmotU4mlhVBPAgMiU1MKlx09750S4Q";
  constructor(private data:DataService,private http:HttpClient){

  }
ngOnInit(): void {
  console.log("ngOnit of Admin component")
  this.getAllImages(this.searchedValue,1)
  
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

getSearchedImages(value:any){
this.searchedValue=value;
   this.getAllImages(value,1)
  console.log("searched values here...",value)

}
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
 

