import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Dragoon } from 'src/models/Dragoon';
import { animate, AnimationEvent, keyframes, state, style, transition, trigger } from '@angular/animations';
import { timer } from 'rxjs';

@Component({
  selector: 'fd-dragoon',
  templateUrl: './dragoon.component.html',
  styleUrls: ['./dragoon.component.scss'],
  animations: [
    trigger('flying', [
      state('standby', style({ transform: 'translateX(0)' })),
      state('flight', style({ transform: 'translateX(-190vw)' })),
      transition('* => flight', [
        animate("25s")
      ])
    ])
  ]
})
export class DragoonComponent implements OnChanges {
  @Input() dragoon: Dragoon | null = null;
  @Output() flightCompleted: EventEmitter<void> = new EventEmitter<void>();

  inFlight: boolean = false;
  showName: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dragoon'].currentValue !== null) {
      this.startFlight();
    }
  }

  public displayName(): void {
    this.showName = true;
  }

  public hideName(): void {
    this.showName = false;
  }

  public startFlight(): void {
    this.inFlight = true;
  }

  public completeFlight(event: AnimationEvent): void {
    if (event.toState === 'flight') {
      this.inFlight = false;
      this.cd.detectChanges();
      this.flightCompleted.emit();
    }
  }
}
