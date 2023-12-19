import {Component} from '@angular/core';
import {
  NgProsemirrorNode
} from "../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-node.component";

@Component({
  selector: 'list-item',
  template: `
      <li [class]="['flex-column', 'flex', 'items-start', 'gap-2', selected ? 'ProseMirror-selectednode' : '']">
          <span class="flex h-6 items-center">
              @if (isBullet && checked != null) {
                  <input class="form-checkbox rounded" (change)="setAttrs({ checked: !checked })" type="checkbox"
                         checked="checked"/>
              } @else if (isBullet) {
                  <span class="h-2 w-2 rounded-full bg-nord8 dark:bg-nord9"></span>
              } @else {
                  <span class="text-nord8">{{ label }}</span>
              }
          </span>
          <div class="min-w-0 list-item-ref"></div>
      </li>
  `,
  styles: [],
  standalone: true
})
export class ListItem extends NgProsemirrorNode {
  get checked() {
    return this.node.attrs?.checked;
  }

  get isBullet() {
    return this.node.attrs?.listType === "bullet";
  }

  get label() {
    return this.node.attrs?.label;
  }

  override get container() {
    return this.el.nativeElement.querySelector('.list-item-ref') as HTMLElement;
  }
}
