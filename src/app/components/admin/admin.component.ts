import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UserComponent,HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
 
  constructor(){

  }
  ngOnInit(): void {
   
  }
  


}
