import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {



  constructor(private data: DataService, private router: Router, private http: HttpClient, private loadingController: LoadingController) {
    data.loadMaps()
  }
  ngOnInit() {
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete() ;
    }, 3000);
  }

  navigate(mapData) {
    console.log(mapData)
    const navigationExtras: NavigationExtras = { state: { map: JSON.stringify(mapData) } };
    this.router.navigate(['message'], navigationExtras);
  }

  getMaps() {
    return this.data.getMaps();
  }

}
