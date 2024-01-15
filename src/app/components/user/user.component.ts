import { Component, Input, OnInit, Output } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { DataService } from '../../services/data.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',

  
})
export class UserComponent implements OnInit{
  Images:any;
  currentPage: any;
  searchedValue:any="trending";
  errorMessage="Try Again";
  displayView:any=false;
 
  constructor(private data:DataService){

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

}
 

