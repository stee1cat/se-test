import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail',
  template: `
    <div class="modal detail">
      <img class="detail__image" [src]="url" />
    </div>
  `,
  styleUrls: [
    './detail.component.css'
  ]
})
export class DetailComponent {
  @Input() public url;
}
