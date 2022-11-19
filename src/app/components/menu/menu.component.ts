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

  constructor(private dragoonsService: DragoonsService) { }

  ngOnInit(): void {
    this.dragoonsService.loadDragoons(dragoons);
  }
}
