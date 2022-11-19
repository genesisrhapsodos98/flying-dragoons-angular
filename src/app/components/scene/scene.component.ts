import { Component, OnInit } from '@angular/core';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';

@Component({
  selector: 'fd-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [DragoonRandomizerService]
})
export class SceneComponent implements OnInit {
  public readonly laneCount: number = 4;
  public readonly laneHeightPx: number = 250;

  lanes: any[] = [];

  constructor(public randomizerService: DragoonRandomizerService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.laneCount; i++) {
      this.lanes.push({ id: i + 1 })
    }
  }
}
