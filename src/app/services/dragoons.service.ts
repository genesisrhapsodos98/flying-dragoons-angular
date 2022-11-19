import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dragoon } from 'src/models/dragoon';

@Injectable({
  providedIn: 'root'
})
export class DragoonsService {
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
  }
}
