import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fd-selen-lane',
  templateUrl: './selen-lane.component.html',
  styleUrls: ['./selen-lane.component.scss'],
  animations: [
    trigger('flying', [
      state('standby', style({ transform: 'translateX(0)' })),
      state('flight', style({ transform: 'translateX(-190vw)' })),
      transition('* => flight', [
        animate("10s")
      ])
    ]),
    trigger('slowFlying', [
      state('standby', style({ transform: 'translateX(0)' })),
      state('flight', style({ transform: 'translateX(-190vw)' })),
      transition('* => flight', [
        animate("20s 1s")
      ])
    ])
  ]
})
export class SelenLaneComponent {
  @Input() laneHeightPx: number = 190;
  @Input() inFlight: boolean = false;
  @Output() flightCompleted: EventEmitter<void> = new EventEmitter<void>();
}
