import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HintService {
  showHint: boolean = true;

  constructor() { }

  closeHint(): void {
    this.showHint = false;
  }
}
