import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  private mapData;

  addedTypes: any = [];
  categories: any = ['The Block', 'PVP', 'Hide-N-Seek', 'Mini-Games', 'Obstacle Course', 'Race', 'Training', 'Remake', 'Explore', 'Escape', 'Music', 'Other'];
  cSelected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.mapData = JSON.parse(this.router.getCurrentNavigation().extras.state.map)
        this.addedTypes = this.mapData.categories;
      }
    });
  }

  ngOnInit() {}

  async selectCategories(ev: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Select Categories',
      inputs: this.createInputs(),
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Okay',
          handler: data => {
            console.log('Checkbox data:', data);
            this.addedTypes = data;
        }
        }
      ]
    });

    await alert.present();
  }
  removeType(type) {
    const index = this.addedTypes.indexOf(type, 0);
    if (index > -1) {
        this.addedTypes.splice(index, 1);
    }
  }

  createInputs() {
    const theNewInputs = [];

    for (const index of Object.keys(this.categories)) {
      let isChecked = false;

      if (this.addedTypes.includes(this.categories[index])) {
        isChecked = true;
      }

      theNewInputs.push(
        {
          type: 'checkbox',
          label: this.categories[index],
          value: this.categories[index],
          checked: isChecked
        }
      );
    }
    return theNewInputs;
  }

  addMap() {
    // const navigationExtras: NavigationExtras = { routerDirection: 'back'};
    // this.router.navigate(['/'], navigationExtras);
    this.data.addMapToDB(this.mapData.id,
                         this.mapData.code,
                         this.mapData.name,
                         this.mapData.desc,
                         this.mapData.creator,
                         this.mapData.categories,
                         this.mapData.img_urls,
                         this.mapData.video_id)
        .then(data => {
        }).catch(error => {
        });
    this.data.removeMap(this.mapData);
    this.navCtrl.navigateBack('/');
  }

  removeMap() {
    this.data.removeMap(this.mapData)
    this.navCtrl.navigateBack('/');
  }
}

