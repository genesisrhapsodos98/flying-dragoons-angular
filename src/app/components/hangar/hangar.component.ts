import { Component, OnInit } from '@angular/core';
import { DragoonViewerService } from 'src/app/services/dragoon-viewer.service';
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
  constructor(private dragoonsService: DragoonsService, private viewerService: DragoonViewerService) { }

  public ngOnInit(): void {
    this.dragoons = this.dragoonsService.dragoons;
  }

  public openViewer(dragoon: Dragoon): void {
    this.viewerService.openViewer(dragoon);
  }
}
