import { Component, OnInit } from '@angular/core';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import { Dragoon } from 'src/models/Dragoon';

import planeData from 'src/assets/planes.json';
const dragoonData: Dragoon[] = planeData as Dragoon[];

@Component({
  selector: 'fd-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [DragoonRandomizerService]
})
export class SceneComponent implements OnInit {
  public readonly laneCount: number = 4;
  public readonly laneHeightPx: number = 215;

  lanes: any[] = [];

  constructor(public randomizerService: DragoonRandomizerService) { }

  ngOnInit(): void {
    this.randomizerService.loadDragoons(dragoonData);
    for (let i = 0; i < this.laneCount; i++) {
      this.lanes.push({ id: i + 1 })
    }
  }
}
