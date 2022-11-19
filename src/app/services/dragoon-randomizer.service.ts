import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dragoon } from 'src/models/dragoon';

import { DragoonsService } from './dragoons.service';

@Injectable()
export class DragoonRandomizerService {
  loaded: boolean = false;

  dragoons$: BehaviorSubject<Dragoon[]> = new BehaviorSubject<Dragoon[]>([]);
  get dragoons(): Dragoon[] {
    return this.dragoons$.value;
  }
  set dragoons(value: Dragoon[]) {
    this.dragoons$.next(value);
  }

  constructor(private dragoonsService: DragoonsService) {
    this.dragoons = this.dragoonsService.dragoons;
    this.loaded = true;
  }

  public getRandomDragoon(): Dragoon | null {
    if (this.dragoons.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * this.dragoons.length);
    const copyOfAllDragoons = this.dragoons;
    const selectedDragoon = copyOfAllDragoons.splice(index, 1)[0];
    this.dragoons = copyOfAllDragoons;
    return selectedDragoon;
  }
}
