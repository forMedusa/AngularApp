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
      mobile: localStorage.getItem('mobile'),
      gender: localStorage.getItem('gender'),
      address:{
        street: localStorage.getItem('street'),
        city: localStorage.getItem('city'),
        state: localStorage.getItem('state'),
        zipCode: localStorage.getItem('zipCode')
      },
    })
  }
  userForm = new FormGroup({
    name: new FormControl('',
    [Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required]),
    address: new FormGroup({
      street: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zipCode: new FormControl('',[Validators.required]),
    }),
    employment: new FormGroup({
      company: new FormControl('',[Validators.required]),
      startYear: new FormControl('',[Validators.required]),
      endYear: new FormControl('',[Validators.required]),
    })
  });

    name:any;
    email:any;
    mobile:any;
    gender:any;
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
    if(this.userForm.get('name')?.valid == true && this.userForm.get('email')?.valid == true && this.userForm.get('gender')?.valid == true && this.userForm.get('mobile')?.valid == true){
      this.isStep1Valid = true
    }else{
      this.isStep1Valid = false
    }
    return this.isStep1Valid;
  }

  validateStep2() {
    this.isStep2Valid = this.userForm.get('address')?.valid
    return this.isStep2Valid;
  }

  validateStep3() {
    this.isStep3Valid = this.userForm.get('employment')?.valid
    return this.isStep3Valid;
  }

  submitData(){
    this.usersData = this.userForm.value;
    console.log(this.usersData)
    this.service.postUsers(this.usersData).subscribe(res => {
      console.log(res)
      localStorage.clear();
    })
  }

  datasave1(){
    this.name = this.userForm.get('name')?.value
    localStorage.setItem('name', this.name)
    this.email = this.userForm.get('email')?.value
    localStorage.setItem('email', this.email)
    this.mobile = this.userForm.get('mobile')?.value
    localStorage.setItem('mobile', this.mobile)
    this.gender = this.userForm.get('gender')?.value
    localStorage.setItem('gender', this.gender)
  }

  datasave2(){
    this.street = this.userForm.get('address')?.get('street')?.value
    localStorage.setItem('street',this.street)
    this.city = this.userForm.get('address')?.get('city')?.value
    localStorage.setItem('city',this.city)
    this.state = this.userForm.get('address')?.get('state')?.value
    localStorage.setItem('state',this.street)
    this.zipCode = this.userForm.get('address')?.get('zipCode')?.value
    localStorage.setItem('zipCode',this.zipCode)
  }
}
