import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'table-tooltip-button',
  template: `
      <button
              class="inline-flex items-center justify-center rounded border border-gray-200 bg-white px-4 py-2 text-base font-medium leading-6 shadow-sm dark:bg-black hover:bg-gray-100"
      (click)="onClick.emit($event)"
      >
        <span class="material-symbols-outlined !text-base" [style]="iconStyle">{{icon}}</span>
      </button>
  `,
  styles:[],
  standalone: true
})
export class TableButton {
  @Input() icon: string;
  @Input() title: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Input('icon-style') iconStyle: {
    [key: string]: any;
  }
}
