import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';
import { TrainTramService } from '../services/train-tram.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 48.8566;
  longitude = 2.3522;
  zoom = 12;
  geoJsonObject: Object;
  lines = [];

  constructor(private _lineService: LineService) { }

  getGeoJson() {
    this._lineService.getGeoJson()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          this.lines.push({
            'coords': data['features'][i]['geometry']['coordinates'],
            'color': data['features'][i]['properties']['color']
          });
        }
      });
  }
  ngOnInit() {
    this.getGeoJson();
    console.log(this.lines);
  }
}
