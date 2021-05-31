import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public maps:any = []

  constructor(private http: HttpClient) {
    
  }

  loadMaps() {
    console.log("loading maps")
    this.http.get('http://cgrob10.pythonanywhere.com/get/maps_to_add')
      .subscribe(data => {
        this.maps = data;
        console.log(this.maps);
       }, error => {
        console.log(error);
      });
  }

  addMapToDB(id, code, name, desc, creator, types, imgs, videoId) {
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
      .subscribe(data => {
        console.log(data);
        resolve(data);
       }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  deleteMap() {

  }

  public getMaps() {
    return this.maps;
  }

  public removeMap(map) {
    this.maps = this.maps.filter(i => i !== map);
    // TODO: Call function to remove map from database
  }
}
