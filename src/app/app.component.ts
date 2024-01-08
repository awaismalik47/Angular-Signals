import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal_project';
    // // signal Intitlization  
    // fName = signal('Bilal');
    // lName = signal('Asghar');
    // // fullName = this.fName() + " " + this.lName();
    // changeFirstName(firstName:any){
    //   this.fName.set(firstName)
    // }
    // changeLastName(lastName:any){
    //   this.lName.set(lastName)
    // }
}
