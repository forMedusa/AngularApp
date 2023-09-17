import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit{
  constructor(private service:ApiserviceService,
    private cookies:CookieService,
    private router:Router){}
  ngOnInit(): void {
      this.getData()
  }
  url = '../assets/mock-data.json'
  users:any;
  getData(){
    this.service.getUsers().subscribe(res => {
      this.users = res
      console.log(res)
    })
  }

  getuserData(i:any){
    console.log(this.users[i])
    this.service.userData = this.users[i];
    this.cookies.set('id',this.users[i].id)
    this.router.navigateByUrl('profile');
  }
}
