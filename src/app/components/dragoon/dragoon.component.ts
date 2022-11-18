import { Component, Input } from '@angular/core';
import { Dragoon } from 'src/models/Dragoon';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'fd-dragoon',
  templateUrl: './dragoon.component.html',
  styleUrls: ['./dragoon.component.scss'],
  animations: [
    trigger('flying', [
      transition(':enter', [
        animate('25s', keyframes([
          style({ transform: 'translateX(0px)' }),
          style({ transform: 'translateX(-190vw)' }),
        ]))
      ])
    ])
  ]
})
export class DragoonComponent {
  @Input() dragoon: Dragoon | null = null;
}
