import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  public maps:any = []

  
  constructor(private data: DataService, private router: Router, private http: HttpClient) {
    this.http.get('http://cgrob10.pythonanywhere.com/get/maps_to_add')
      .subscribe(data => {
        this.maps = data;
        console.log(this.maps);
       }, error => {
        console.log(error);
      });
  }
  ngOnInit() {
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete() ;
    }, 3000);
  }

  navigate(mapData) {
    const navigationExtras: NavigationExtras = { state: { map: mapData } };
    this.router.navigate(['message'], navigationExtras);
  }

  getMaps() {
    return this.data.getMaps();
  }

}
