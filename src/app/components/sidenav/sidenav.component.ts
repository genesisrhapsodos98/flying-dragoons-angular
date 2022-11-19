import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/models/menu-item';

@Component({
  selector: 'fd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() menuItems: MenuItem[] = [];
}
