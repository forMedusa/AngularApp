import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  constructor(
    private service:ApiserviceService){}
  ngOnInit(): void {
    this.validateStep1()
    this.validateStep2()
    this.validateStep3()
    this.userForm.patchValue({
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      mobile: localStorage.getItem('mobile')
    })
  }
  userForm = new FormGroup({
    name: new FormControl('',
    [Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('',[Validators.required]),
    gender: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl('')
    }),
    employment: new FormGroup({
      company: new FormControl(''),
      startYear: new FormControl(''),
      endYear: new FormControl('')
    })
  });

    name:any;
    email:any;
    mobile:any;
      street:any;
      city:any;
      state:any;
      zipCode:any;
        company: any;
        startYear: any;
        endYear: any;

  usersData:any;

  isStep1Valid:any; 
  isStep2Valid:any; 
  isStep3Valid:any;
  validateStep1() {
    this.isStep1Valid = this.userForm.get('name')?.valid;
    return this.isStep1Valid;
  }

  validateStep2() {
    this.isStep2Valid = this.userForm.get('address')?.valid;
    return this.isStep2Valid;
  }

  validateStep3() {
    this.isStep3Valid = this.userForm.get('employment')?.valid;
    return this.isStep3Valid;
  }

  submitData(){
    this.usersData = this.userForm.value;
    console.log(this.usersData)
    this.service.postUsers(this.usersData).subscribe(res => {
      console.log(res)
    })
  }

  datasave1(){
    this.name = this.userForm.get('name')?.value
    localStorage.setItem('name', this.name)
    this.email = this.userForm.get('email')?.value
    localStorage.setItem('email', this.email)
    this.mobile = this.userForm.get('mobile')?.value
    localStorage.setItem('mobile', this.mobile)
  }
}
