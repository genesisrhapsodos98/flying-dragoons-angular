import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dragoon } from 'src/models/Dragoon';

@Injectable({
  providedIn: 'root'
})
export class DragoonRandomizerService {
  dragoons: Dragoon[] = [];
  loaded: boolean = false;

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
    this.loaded = true;
  }

  public getDragoons(amount: number): void {
    if (this.loaded && this.dragoons.length <= 0) {
      this.finished.emit();
      this.loaded = false;
      this.currentWave = [];
      return;
    }

    // TODO: Add code to take random entries instead of first 4
    this.currentWave = this.dragoons.splice(0, amount);
  }
}
