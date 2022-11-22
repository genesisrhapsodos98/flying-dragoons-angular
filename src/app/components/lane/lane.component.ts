import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { of, repeat, Subscription, switchMap, timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import { Dragoon } from 'src/models/dragoon';

import { DragoonComponent } from '../dragoon/dragoon.component';

@Component({
  selector: 'fd-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DragoonComponent) dragoonComponent!: DragoonComponent;
  @Input() laneHeightPx: number = 190;
  dragoons: Dragoon[] = [];
  intervalSubscription: Subscription | null = null;

  constructor(private randomizerService: DragoonRandomizerService) { }

  public ngAfterViewInit(): void {
    // First plane delay
    timer(this.getRandomDelay(0, 5000)).subscribe(() => {
      this.addDragoon();

      // Delay between planes
      this.intervalSubscription = of(null).pipe(switchMap(() => timer(this.getRandomDelay(7000, 10000))), repeat()).subscribe(() => this.addDragoon());
    });

  }

  public ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }

  public addDragoon(): void {
    const randomDragoon = this.randomizerService.getRandomDragoon();
    if (!randomDragoon) {
      return;
    }

    this.dragoons = [...this.dragoons, randomDragoon];
  }

  public removeDragoon(removedDragoon: Dragoon): void {
    this.dragoons = [...this.dragoons.filter(dragoon => dragoon !== removedDragoon)];
  }

  private getRandomDelay(minMs: number, maxMs: number): number {
    return Math.random() * (maxMs - minMs) + minMs;
  }
}
