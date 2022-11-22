import { Injectable } from '@angular/core';
import { Dragoon } from 'src/models/dragoon';

@Injectable({
  providedIn: 'root'
})
export class DragoonViewerService {
  showModal: boolean = false;
  dragoon: Dragoon | null = null;

  openViewer(dragoon: Dragoon): void {
    this.dragoon = dragoon;
    this.showModal = true;
  }

  closeViewer(): void {
    this.showModal = false;
  }
}
