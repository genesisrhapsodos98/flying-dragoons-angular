import { Component, HostListener } from '@angular/core';
import { DragoonViewerService } from 'src/app/services/dragoon-viewer.service';

@Component({
  selector: 'fd-dragoon-viewer',
  templateUrl: './dragoon-viewer.component.html',
  styleUrls: ['./dragoon-viewer.component.scss']
})
export class DragoonViewerComponent {
  opened: boolean = true;

  @HostListener('document:keydown.escape', ['$event'])
  handleEsc(event: KeyboardEvent) {
    this.closeViewer();
  }

  constructor(public viewerService: DragoonViewerService) { }

  public closeViewer(): void {
    this.viewerService.closeViewer();
  }
}
