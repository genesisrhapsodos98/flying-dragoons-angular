import { Component, OnInit } from '@angular/core';
import { DragoonsService } from 'src/app/services/dragoons.service';
import dragoonJson from 'src/assets/planes.json';
import { Dragoon } from 'src/models/dragoon';
import { MenuItem } from 'src/models/menu-item';

const dragoons: Dragoon[] = dragoonJson as Dragoon[];

@Component({
  selector: 'fd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Squadron',
      link: '/',
      iconPath: 'assets/icons/flight.svg'
    },
    {
      label: 'Hangar',
      link: '/hangar',
      iconPath: 'assets/icons/home.svg'
    },
    {
      label: 'Credits',
      link: '/credits',
      iconPath: 'assets/icons/groups.svg'
    },
  ]

  constructor(private dragoonsService: DragoonsService) { }

  ngOnInit(): void {
    this.dragoonsService.loadDragoons(dragoons);
  }
}
