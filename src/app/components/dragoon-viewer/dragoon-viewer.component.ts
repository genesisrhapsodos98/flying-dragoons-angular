import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { DragoonViewerService } from 'src/app/services/dragoon-viewer.service';

@Component({
  selector: 'fd-dragoon-viewer',
  templateUrl: './dragoon-viewer.component.html',
  styleUrls: ['./dragoon-viewer.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DragoonViewerComponent {
  showHeader: boolean = false;

  @HostListener('document:keydown.escape', ['$event'])
  handleEsc(event: KeyboardEvent) {
    this.closeViewer();
  }

  constructor(public viewerService: DragoonViewerService) { }

  public closeViewer(): void {
    this.viewerService.closeViewer();
  }
}
