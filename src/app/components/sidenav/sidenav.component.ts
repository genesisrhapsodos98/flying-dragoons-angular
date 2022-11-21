import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/models/menu-item';

@Component({
  selector: 'fd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('slide', [
      state('closed', style({ width: '95px' })),
      state('open', style({ width: '12vw' })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidenavComponent {
  @Input() menuItems: MenuItem[] = [];
  showLabels: boolean = false;

  setShowLabels(value: boolean): void {
    this.showLabels = value;
  }
}
