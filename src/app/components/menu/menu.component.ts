import { Component } from '@angular/core';
import { MenuItem } from 'src/models/menu-item';

@Component({
  selector: 'fd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Flight',
      link: '/'
    },
    {
      label: 'Planes',
      link: '/planes'
    },
    {
      label: 'Credits',
      link: '/credits'
    },
  ]
}
