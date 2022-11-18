import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dragoon } from 'src/models/Dragoon';

@Injectable({
  providedIn: 'root'
})
export class DragoonRandomizerService {
  dragoons: Dragoon[] = [];
  started: boolean = false;

  @Output() finished: EventEmitter<void> = new EventEmitter<void>();

  currentWave$: BehaviorSubject<Dragoon[]> = new BehaviorSubject<Dragoon[]>([]);
  get currentWave(): Dragoon[] {
    return this.currentWave$.value;
  }
  set currentWave(wave: Dragoon[]) {
    this.currentWave$.next(wave);
  }

  constructor() { }

  public loadDragoons(dragoons: Dragoon[]): void {
    this.dragoons = dragoons;
    this.started = true;
  }

  public getDragoons(amount: number): void {
    if (this.started && this.dragoons.length <= 0) {
      this.finished.emit();
      this.started = false;
    }

    this.currentWave = this.dragoons.splice(0, amount);
  }
}
