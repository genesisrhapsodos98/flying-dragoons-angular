import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dragoon } from 'src/models/dragoon';

@Component({
  selector: 'fd-dragoon',
  templateUrl: './dragoon.component.html',
  styleUrls: ['./dragoon.component.scss'],
  animations: [
    trigger('flying', [
      state('standby', style({ transform: 'translateX(0)' })),
      state('flight', style({ transform: 'translateX(-190vw)' })),
      transition('* => flight', [
        animate("20s")
      ])
    ])
  ]
})
export class DragoonComponent implements OnInit {
  @Input() dragoon: Dragoon | null = null;
  @Input() planeHeightPx: number = 190;
  @Input() inHangar: boolean = false;
  @Output() flightCompleted: EventEmitter<Dragoon> = new EventEmitter<Dragoon>();

  inFlight: boolean = false;
  showName: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.inHangar) {
      this.inFlight = true;
    }
  }

  public displayName(): void {
    this.showName = true;
  }

  public hideName(): void {
    this.showName = false;
  }

  public completeFlight(event: AnimationEvent): void {
    if (!this.dragoon) {
      return;
    }

    this.cd.detectChanges();
    this.flightCompleted.emit(this.dragoon);
  }
}
