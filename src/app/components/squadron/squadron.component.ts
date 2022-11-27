import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, repeat, Subscription, switchMap, timer } from 'rxjs';
import { DragoonRandomizerService } from 'src/app/services/dragoon-randomizer.service';
import { HintService } from 'src/app/services/hint.service';
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
    ]),
    trigger('mascot', [
      transition(':enter', [
        style({ transform: 'translate(0, 0)' }),
        animate('10s', style({ transform: 'translate({{ deviation }}vw, -150vh)' }))
      ], { params: { deviation: 30 } })
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
  public mascots: Prop[] = [];

  private propGenerators: Subscription[] = [];

  lanes: any[] = [];

  constructor(public randomizerService: DragoonRandomizerService, public hintService: HintService) { }

  public ngOnInit(): void {
    // this.start();

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

    const mascotGenerator = of(null)
      .pipe(switchMap(() => timer(Utils.getRandomDelay(10000, 15000))), repeat())
      .subscribe(() => this.mascots.push(this.getMascot(10, 15)));

    this.propGenerators.push(farBackgroundCloudGenerator, backgroundCloudGenerator, foregroundCloudGenerator, mascotGenerator);
  }

  public closeHint(): void {
    this.hintService.closeHint();
    this.start();
  }

  public start(): void {
    this.selenInFlight = true;

    timer(1000).subscribe(() => {
      for (let i = 0; i < this.laneCount; i++) {
        this.lanes.push({ id: i + 1 })
      }
    })
  }

  public getCloud(minWidthVw: number, maxWidthVw: number, startLeftVw: number | null = null): Prop {
    const index: number = Math.floor(Math.random() * this.cloudImagePaths.length);
    const randomWidth: number = Math.random() * (maxWidthVw - minWidthVw) + minWidthVw;
    const randomCloud: Prop = {
      imagePath: this.cloudImagePaths[index],
      startLeftVw: startLeftVw ?? -randomWidth,
      startTopVh: Math.random() * 100,
      widthVw: randomWidth,
      deviationVw: Math.random() * 20 + 10,
    }
    return randomCloud;
  }

  public getMascot(minHeightVh: number, maxHeightVh: number): Prop {
    const index: number = Math.floor(Math.random() * this.cloudImagePaths.length);
    const randomHeight: number = Math.random() * (maxHeightVh - minHeightVh) + minHeightVh;
    const randomCloud: Prop = {
      imagePath: this.mascotImagePaths[index],
      startLeftVw: Math.random() * 100,
      startTopVh: 100 + randomHeight,
      heightVh: randomHeight,
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
    this.foregroundClouds = [...this.foregroundClouds.filter(cloud => cloud !== cloudToRemove)];
  }

  public removeMascot(mascotToRemove: Prop): void {
    this.mascots = [...this.mascots.filter(mascot => mascot !== mascotToRemove)];
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

  private readonly mascotImagePaths: string[] = [
    'assets/props/kindred.png',
    'assets/props/lucub.png',
    'assets/props/pentomo.png',
    'assets/props/phantomo.png',
    'assets/props/pomudachi.png',
    'assets/props/quilldren.png',
    'assets/props/renvader.png',
    'assets/props/scarling.png',
    'assets/props/stargazer.png',
    'assets/props/weewa.png',
    'assets/props/yaminion.png'
  ];
}
