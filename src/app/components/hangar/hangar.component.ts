import { Component, OnInit } from '@angular/core';
import { DragoonsService } from 'src/app/services/dragoons.service';
import { Dragoon } from 'src/models/dragoon';

@Component({
  selector: 'fd-hangar',
  templateUrl: './hangar.component.html',
  styleUrls: ['./hangar.component.scss']
})
export class HangarComponent implements OnInit {
  dragoons: Dragoon[] = [];
  planeHeightPx: number = 250;
  constructor(private dragoonsService: DragoonsService) { }

  ngOnInit(): void {
    this.dragoons = this.dragoonsService.dragoons;
  }
}
