import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  public maps = [];


  constructor(private data: DataService, private router: Router) {
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
