import { Component, Input } from '@angular/core';
import { Observable, Subscription, takeUntil, tap, timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import { Dragoon } from 'src/models/Dragoon';

@Component({
  selector: 'fd-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [DragoonRandomizerService]
})
export class SceneComponent {
  public readonly laneCount: number = 4;
  public readonly laneHeightPx: number = 215;

  // TODO: Add code to load data from json file
  // Note: Might need to use async/await to make sure the file is read before running this.randomizerService.loadDragoons
  dragoons: Dragoon[] = [
    {
      id: 1,
      message: "Test message 1",
      name: "PussyDestroyer69",
      imagePath: '/assets/img/plane1.png'
    },
    {
      id: 2,
      message: "Test message 2",
      name: "CockMaster420",
      imagePath: '/assets/img/plane2.png'
    },
    {
      id: 3,
      message: "Test message 3",
      name: "GiganticPinkDildo",
      imagePath: '/assets/img/plane3.png'
    },
    {
      id: 4,
      message: "Test message 4",
      name: "MotherCopulator",
      imagePath: '/assets/img/plane4.png'
    },
    {
      id: 5,
      message: "Test message 5",
      name: "SelenHerself",
      imagePath: '/assets/img/plane4.png'
    },
  ];

  waveTimer: Observable<number> = timer(0, 25000).pipe(tap((val) => this.nextWave()), takeUntil(this.randomizerService.finished));
  subscriptions: Subscription[] = [];

  constructor(private randomizerService: DragoonRandomizerService) { }

  ngOnInit(): void {
    this.randomizerService.loadDragoons(this.dragoons);
    const subscription = this.waveTimer.subscribe();
    this.subscriptions.push(subscription);
  }

  public nextWave(): void {
    this.randomizerService.getDragoons(this.laneCount);
  }

  public get lanes(): any[] {
    const lanes: any[] = [];
    for (let i = 0; i < this.laneCount; i++) {
      lanes.push({ id: i + 1, dragoon: this.randomizerService.currentWave[i] ?? null });
    }
    return lanes;
  }

  public ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
