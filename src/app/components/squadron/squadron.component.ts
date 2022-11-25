import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, repeat, Subscription, switchMap, timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import Utils from 'src/app/utils/utils';
import { Prop } from 'src/models/prop';

@Component({
  selector: 'fd-squadron',
  templateUrl: './squadron.component.html',
  styleUrls: ['./squadron.component.scss'],
  providers: [DragoonRandomizerService],
  animations: [
    trigger('farBackgroundCloud', [
      transition(':enter', [
        style({ transform: 'translateX(0)' }),
        animate('120s', style({ transform: 'translateX(150vw)' }))
      ])
    ]),
    trigger('backgroundCloud', [
      transition(':enter', [
        style({ transform: 'translateX(0)' }),
        animate('60s', style({ transform: 'translateX(150vw)' }))
      ])
    ]),
    trigger('foregroundCloud', [
      transition(':enter', [
        style({ transform: 'translateX(0)' }),
        animate('5s', style({ transform: 'translateX(150vw)' }))
      ])
    ])
  ]
})
export class SquadronComponent implements OnInit, OnDestroy {
  public readonly laneCount: number = 4;
  public readonly laneHeightPx: number = 190;
  public selenInFlight: boolean = false;

  public farBackgroundClouds: Prop[] = [];
  public backgroundClouds: Prop[] = [];
  public foregroundClouds: Prop[] = [];

  private propGenerators: Subscription[] = [];

  lanes: any[] = [];

  constructor(public randomizerService: DragoonRandomizerService) { }

  public ngOnInit(): void {
    this.selenInFlight = true;

    timer(1000).subscribe(() => {
      for (let i = 0; i < this.laneCount; i++) {
        this.lanes.push({ id: i + 1 })
      }
    })

    // Initial far background clouds
    for (let i = 0; i < 25; i++) {
      this.farBackgroundClouds.push(this.getCloud(3, 5, Math.random() * 150 - 50));
    }

    const farBackgroundCloudGenerator = of(null)
      .pipe(switchMap(() => timer(Utils.getRandomDelay(5000, 10000))), repeat())
      .subscribe(() => this.farBackgroundClouds.push(this.getCloud(3, 5)));

    const backgroundCloudGenerator = of(null)
      .pipe(switchMap(() => timer(Utils.getRandomDelay(3000, 5000))), repeat())
      .subscribe(() => this.backgroundClouds.push(this.getCloud(10, 20)));

    const foregroundCloudGenerator = of(null)
      .pipe(switchMap(() => timer(Utils.getRandomDelay(1000, 10000))), repeat())
      .subscribe(() => this.foregroundClouds.push(this.getCloud(30, 40)));

    this.propGenerators.push(farBackgroundCloudGenerator, backgroundCloudGenerator, foregroundCloudGenerator);
  }

  public getCloud(minHeightVh: number, maxHeightVh: number, startLeftVw: number | null = null): Prop {
    const index: number = Math.floor(Math.random() * this.cloudImagePaths.length);
    const randomWidth: number = Math.random() * (maxHeightVh - minHeightVh) + minHeightVh;
    const randomCloud: Prop = {
      imagePath: this.cloudImagePaths[index],
      startLeftVw: startLeftVw ?? -randomWidth,
      startTopVh: Math.random() * 100,
      widthVw: randomWidth,
    }
    return randomCloud;
  }

  public removeFarBackgroundCloud(cloudToRemove: Prop): void {
    this.farBackgroundClouds = [...this.farBackgroundClouds.filter(cloud => cloud !== cloudToRemove)];
  }

  public removeBackgroundCloud(cloudToRemove: Prop): void {
    this.backgroundClouds = [...this.backgroundClouds.filter(cloud => cloud !== cloudToRemove)];
  }

  public removeForegroundCloud(cloudToRemove: Prop): void {
    console.log('removing');
    this.foregroundClouds = [...this.foregroundClouds.filter(cloud => cloud !== cloudToRemove)];
  }

  public ngOnDestroy(): void {
    for (let generator of this.propGenerators) {
      generator.unsubscribe();
    }
  }

  private readonly cloudImagePaths: string[] = [
    'assets/props/background/cloud1.png',
    'assets/props/background/cloud2.png',
    'assets/props/background/cloud3.png',
    'assets/props/background/cloud4.png',
    'assets/props/background/cloud5.png',
    'assets/props/background/cloud6.png',
  ];
}
