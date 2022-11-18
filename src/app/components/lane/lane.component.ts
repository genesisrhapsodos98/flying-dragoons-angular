import { Component, Input } from '@angular/core';
import { Dragoon } from 'src/models/Dragoon';

@Component({
  selector: 'fd-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent {
  @Input() dragoon: Dragoon | null = null;
}
