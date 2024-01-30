import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgProsemirrorAdapterProvider, NgProsemirrorAdapterService } from 'ng-prosemirror-adapter';

@Component({
  selector: 'ng-milkdown-provider',
  standalone: true,
  imports: [CommonModule],
  template: `
      <ng-content/>`,
  styles: `
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }
  `,
  providers: [NgProsemirrorAdapterService]
})
export class NgMilkdownProvider extends NgProsemirrorAdapterProvider {
}
