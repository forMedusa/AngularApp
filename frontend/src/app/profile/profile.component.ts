import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private cookies:CookieService,
    private service:ApiserviceService,
    private router: Router) {}
  ngOnInit(): void {
    this.getData()
  }

  submitButton = true;
  userForm = new FormGroup({
    name: new FormControl({value:'',disabled: true},
    [Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl({value:'',disabled: true},[Validators.required]),
    gender: new FormControl({value:'',disabled: true}),
    mobile: new FormControl({value:'',disabled: true}),
    address: new FormGroup({
      street: new FormControl({value:'',disabled: true}),
      city: new FormControl({value:'',disabled: true}),
      state: new FormControl({value:'',disabled: true}),
      zipCode: new FormControl({value:'',disabled: true}),
    }),
    employment: new FormGroup({
      company: new FormControl({value:'',disabled: true}),
      startYear: new FormControl({value:'',disabled: true}),
      endYear: new FormControl({value:'',disabled: true}),
    })
  });
  userData:any;
  getData(){
    this.userData = this.service.sendData()
      this.userForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        gender: this.userData.gender,
        mobile:this.userData.mobile,
        address:{
          street: this.userData.address.street,
          city: this.userData.address.city,
          state: this.userData.address.state,
          zipCode: this.userData.address.zipCode
        },
          employment:{
            company: this.userData.employment.company,
            startYear: this.userData.employment.startYear,
            endYear:this.userData.employment.endYear
          }
    })
    console.log(this.userData.id)
      console.log(this.userForm.value)
  }

  enableEdit(){
    this.userForm.controls['name'].enable()
    this.userForm.controls['email'].enable()
    this.userForm.controls['mobile'].enable()
    this.userForm.controls['gender'].enable()
    this.userForm.controls['address'].controls['street'].enable()
    this.userForm.controls['address'].controls['city'].enable()
    this.userForm.controls['address'].controls['state'].enable()
    this.userForm.controls['address'].controls['zipCode'].enable()
    this.userForm.controls['employment'].controls['company'].enable()
    this.userForm.controls['employment'].controls['startYear'].enable()
    this.userForm.controls['employment'].controls['endYear'].enable()
    this.submitButton = false;
  }
  updateData(){
    this.userData = this.userForm.value
    console.warn(this.userData)
    console.warn(this.userData.id)
    this.service.updateUser(this.userData).subscribe(res => {
      console.log(res)
      alert("User Updated")
    })
  }
  userDelete(){
    this.service.deleteUser().subscribe(res => {
      console.log(res);
      alert("User Deleted")
      this.router.navigateByUrl('users');
    })
  }
}
