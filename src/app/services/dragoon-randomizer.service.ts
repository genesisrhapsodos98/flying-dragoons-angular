import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, concatMap, delay, of } from 'rxjs';
import { Dragoon } from 'src/models/Dragoon';

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

  constructor() { }

  public loadDragoons(dragoons: Dragoon[]): void {
    this.dragoons = [...dragoons];
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
