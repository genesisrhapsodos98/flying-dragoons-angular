import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';

@Component({
  selector: 'fd-squadron',
  templateUrl: './squadron.component.html',
  styleUrls: ['./squadron.component.scss'],
  providers: [DragoonRandomizerService]
})
export class SquadronComponent implements OnInit {
  public readonly laneCount: number = 4;
  public readonly laneHeightPx: number = 190;
  public selenInFlight: boolean = false;

  lanes: any[] = [];

  constructor(public randomizerService: DragoonRandomizerService) { }

  public ngOnInit(): void {
    this.selenInFlight = true;

    timer(1000).subscribe(() => {
      for (let i = 0; i < this.laneCount; i++) {
        this.lanes.push({ id: i + 1 })
      }
    })
  }
}
