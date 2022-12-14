import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { filter, of, repeat, Subscription, switchMap, timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import Utils from 'src/app/utils/utils';
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
  subscriptions: Subscription[] = [];

  constructor(private randomizerService: DragoonRandomizerService) { }

  public ngAfterViewInit(): void {
    // First plane delay
    const initTimer = timer(Utils.getRandomDelay(0, 5000)).subscribe(() => {
      this.addDragoon();

      // Delay between planes
      const intervalSubscription = of(null)
        .pipe(switchMap(() => timer(Utils.getRandomDelay(7000, 10000))), repeat(), filter(() => !document.hidden))
        .subscribe(() => this.addDragoon());

      this.subscriptions.push(intervalSubscription);
    });

    this.subscriptions.push(initTimer);
  }

  public ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
}
