import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public maps:any = []
  loaded: boolean = false;

  constructor(private http: HttpClient, private toastController: ToastController) {
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  loadMaps() {
    console.log("loading maps")
    this.http.get('http://cgrob10.pythonanywhere.com/get/maps_to_add')
      .subscribe(data => {
        this.maps = data;
        this.loaded = true
        console.log(this.maps);
       }, error => {
        console.log(error);
      });
  }

  async addMapToDB(id, code, name, desc, creator, types, imgs, videoId) {
    const requestOptions = {
      header: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin' : '*',
        Authorization: '',
      })
    };

    const postData = {
            // tslint:disable:object-literal-shorthand
            id: id,
            name: name,
            code: code,
            desc: desc,
            creator: creator,
            types: types,
            imgs: imgs,
            video_id: videoId
    };

    return new Promise((resolve, reject) => {
      this.http.post('http://cgrob10.pythonanywhere.com/add/map_to_add', postData, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .subscribe(async data => {
        console.log(data);
        if('error' in data) {
          this.presentToast(data['error'])
        } else {
          this.presentToast("added map to DB")
        }
        resolve(data);
       }, error => {
        console.log(error);
        this.presentToast("Error adding map to DB")
        reject(error);
      });
    });
  }

  removeMapFromDB(map_id) {
    return new Promise((resolve, reject) => {
      this.http.get('http://cgrob10.pythonanywhere.com/remove/map_to_add/' + map_id)
      .subscribe(data => {
        console.log(data);
        
        this.presentToast("succesfully deleted map")
        resolve(data);
       }, error => {
        console.log(error);
        
        this.presentToast("Failed to delete map from DB")
        reject(error);
      });
    });
  }


  public getMaps() {
    return this.maps;
  }

  public removeMap(map) {
    this.maps = this.maps.filter(i => i !== map);
    this.removeMapFromDB(map.id)
  }
}
