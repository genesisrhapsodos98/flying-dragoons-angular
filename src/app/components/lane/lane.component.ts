import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import { Dragoon } from 'src/models/dragoon';

import { DragoonComponent } from '../dragoon/dragoon.component';

@Component({
  selector: 'fd-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements AfterViewInit {
  @ViewChild(DragoonComponent) dragoonComponent!: DragoonComponent;
  dragoon: Dragoon | null = null;

  constructor(private randomizerService: DragoonRandomizerService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.getNewDragoon();
  }

  public getNewDragoon(): void {
    const randomDragoon = this.randomizerService.getRandomDragoon();
    timer(Math.random() * 5000).subscribe(() => {
      this.dragoon = randomDragoon;
    })
  }
}
