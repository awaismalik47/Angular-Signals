import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(private fb:FormBuilder){}
 display:boolean=false
  employeeForm!:FormGroup
 
  
  // signals Initialization  
firstName=signal('John');
lastName=signal('Doe');
x=signal<number>(1);
y=signal<number>(2)
qty=signal<number>(5)
employeesSignalArray=signal<any[]>([
  {name:'ALi Afzaal',position:'Manager',department:'Gaming'},
  {name:'Muhammad Jawad',position:'CEO',department:'Full Stack'},
  {name:'Ahsan Ch',position:'SQA Engineer',department:'Quality Assurance'},
  {name:'Haseeb Nasir',position:'Manager',department:'Amazon'},
  {name:'usama qayaum ',position:'Assitant Manager',department:'sales & Purchase'},
])
product=signal<any>({
  name:'laptop',
  category:'Electronics',
  price:2000,
  rating:2.4
})
// NgOninit Here....
ngOnInit(): void {
  this.employeeForm=this.fb.group({
    name:['',Validators.required],
    position:['',Validators.required],
    department:['',Validators.required]
  })
 
}

// computed Signals 
fullName=computed(()=>
  this.firstName()+''+this.lastName()
)
totalValue=computed(()=>
this.x()*1+this.y()*1+this.qty()*1
)
// Function to set the value 
// fullName=this.(firstName)+''+this.lastName
public changeFirstName(value:any){
  this.firstName.set(value);
}
public changeLastName(value:any){
  this.lastName.set(value);
}

public updateX(value:any){
  this.x.set(value)
}
public updateY(value:any){
  this.y.set(value)
}
public onDecrement(){
this.qty.update(currentValue=>
  currentValue-1
)
}
public onIncrement(){
this.qty.update(currentValue=>
  currentValue+1)
}
getEmployeeDetails(){
  this.display=false;
 console.log(this.employeeForm.value)
this.employeesSignalArray.update((employee)=>[...employee,this.employeeForm.value])
 console.log(this.employeesSignalArray());
 this.employeeForm.reset()

}
showEmployeeFields(){
  
  this.display=true;
}
resetForm(){
  this.display=false
  this.employeeForm.reset();
}
changeProduct(){

  this.product.update((pro)=>{
    pro.name='Mobile';
    return pro;
  })
  // this.product.mutate(product=>product.name='mobile')
}
sideEffect=effect(()=>console.log('Product Name has been Changed',this.employeesSignalArray()))


}
