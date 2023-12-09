import {Component} from '@angular/core';
import {
  NgProsemirrorNode
} from "../../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-node.component";

@Component({
  selector: 'footnote',
  template: `
      <sup>
          <a [attr.id]="'footnote-' + label + 'ref'" class="text-nord8" [href]="'#footnote-' + label + 'def'"
      >
        {{ label }}
      </a>
    </sup>
  `,
  styles: [],
  standalone: true
})
export class FootnoteRef extends NgProsemirrorNode {

  get label() {
    return this.node.attrs?.['label'];
  }
}
