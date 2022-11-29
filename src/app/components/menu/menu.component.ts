import { Component, OnInit } from '@angular/core';
import { DragoonViewerService } from 'src/app/services/dragoon-viewer.service';
import { DragoonsService } from 'src/app/services/dragoons.service';
import dragoonJson from 'src/assets/planes.json';
import { Dragoon } from 'src/models/dragoon';
import { MenuItem } from 'src/models/menu-item';

const dragoons: Dragoon[] = dragoonJson as Dragoon[];

@Component({
  selector: 'fd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Squadron',
      link: '/',
      iconPath: 'assets/icons/flight.svg',
      position: 'start'
    },
    {
      label: 'Hangar',
      link: '/hangar',
      iconPath: 'assets/icons/home.svg',
      position: 'start'
    },
    {
      label: 'Credits',
      link: '/credits',
      iconPath: 'assets/icons/groups.svg',
      position: 'start'
    },
    {
      label: 'Daemons Are Real',
      link: '/dar',
      iconPath: 'assets/icons/dar.png',
      position: 'end'
    },
  ]

  constructor(private dragoonsService: DragoonsService, public viewerService: DragoonViewerService) { }

  ngOnInit(): void {
    this.dragoonsService.loadDragoons(dragoons);
  }
}
