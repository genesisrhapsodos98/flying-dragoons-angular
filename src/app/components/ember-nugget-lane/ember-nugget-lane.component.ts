import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-ember-nugget-lane',
  templateUrl: './ember-nugget-lane.component.html',
  styleUrls: ['./ember-nugget-lane.component.scss'],
  animations: [
    trigger('flying', [
      state('standby', style({ transform: 'translateX(0)' })),
      state('flight', style({ transform: 'translateX(-190vw)' })),
      transition('* => flight', [
        animate("20s 1s")
      ])
    ])
  ]
})
export class EmberNuggetLaneComponent {
  @Input() laneHeightPx: number = 190;
  @Input() inFlight: boolean = false;
}
