import { Component, Input } from '@angular/core';
import { Dragoon } from 'src/models/Dragoon';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'fd-dragoon',
  templateUrl: './dragoon.component.html',
  styleUrls: ['./dragoon.component.scss'],
  animations: [
    trigger('flying', [
      transition(':enter', [
        animate("20s {{ delay }}ms", keyframes([
          style({ transform: 'translateX(0)' }),
          style({ transform: 'translateX(-190vw)' }),
        ]))
      ], { params: { delay: 0 } })
    ])
  ]
})
export class DragoonComponent {
  @Input() dragoon: Dragoon | null = null;
  delay: number = 0;
  showName: boolean = false;

  constructor() {
    this.delay = Math.random() * 5000;
  }

  public displayName(): void {
    this.showName = true;
  }

  public hideName(): void {
    this.showName = false;
  }
}
