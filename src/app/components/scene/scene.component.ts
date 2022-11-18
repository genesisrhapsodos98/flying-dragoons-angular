import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, takeUntil, tap, timer } from 'rxjs';
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
export class SceneComponent implements OnInit, OnDestroy {
  public readonly laneCount: number = 4;
  public readonly laneHeightPx: number = 215;

  waveTimer: Observable<number> = timer(0, 25000).pipe(tap((val) => this.nextWave()), takeUntil(this.randomizerService.finished));
  subscriptions: Subscription[] = [];

  lanes: any[] = [];

  constructor(private randomizerService: DragoonRandomizerService) { }

  ngOnInit(): void {
    this.randomizerService.loadDragoons(dragoonData);
    const subscription = this.waveTimer.subscribe();
    this.subscriptions.push(subscription);
  }

  public nextWave(): void {
    this.randomizerService.getDragoons(this.laneCount);
    const lanes: any[] = [];
    for (let i = 0; i < this.laneCount; i++) {
      lanes.push({ id: i + 1, dragoon: this.randomizerService.currentWave[i] ?? null });
    }
    this.lanes = lanes;
  }

  public ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
