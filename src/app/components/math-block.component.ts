import {AfterViewInit, Component, Input} from '@angular/core';
import {
  NgProsemirrorNode
} from "../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-node.component";
import {actionFactory} from "../../../projects/ng-milkdown/src/lib/actionFactory";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {katexOptionsCtx} from '@milkdown/plugin-math';
import katex from 'katex';

@Component({
  selector: 'math-block',
  template: `
      <mat-tab-group contenteditable="false" [animationDuration]="150" [(selectedIndex)]="selectedIndex" preserveContent>
          <mat-tab label="Preview">
              <div class="cursor-pointer border-2 border-gray-300 rounded-md p-2 flex justify-center items-center hover:bg-gray-100 math-block-ref"></div>
          </mat-tab>
          <mat-tab label="Source">
                <textarea [(ngModel)]="code"
                          class="block h-48 w-full bg-slate-800 font-mono text-gray-50"
                ></textarea>
              <button (click)="preview()"
                      class="absolute right-1 top-1 mb-1 inline-flex items-center justify-center rounded border border-gray-600 bg-nord8 px-6 py-2 text-base font-medium leading-6 text-gray-50 shadow-sm hover:bg-blue-200 focus:ring-2 focus:ring-offset-2 dark:bg-nord9"
              >OK
              </button>
          </mat-tab>
      </mat-tab-group>
  `,
  styles: [`

  `],
  imports: [
    MatTabsModule,
    FormsModule,
    MatButtonModule,
  ],
  standalone: true
})
export class MathBlock extends NgProsemirrorNode implements AfterViewInit {
  selectedIndex = 0;

  get action() {
    return actionFactory(this.provider.editor)
  };

  override get container(): any {
    return super.container.children[0];
  }

  rendering = true;
  code: string = null;

  preview() {
    this.setAttrs({value: this.code});
    this.render();
    this.selectedIndex = 0;
  }

  render() {
    const renderKatex = async () => {
      this.action(ctx => {
        this.code = this.node.attrs['value'];
        if (this.code.length === 0) return;
        try {
          katex.render(
            this.code,
            this.container.querySelector(".math-block-ref"),
            ctx.get(katexOptionsCtx.key)
          );
        } catch(err) {
          console.error(err);
        }
      })
    }
    requestAnimationFrame(async () => {
      await renderKatex();
    });
    this.rendering = false;
  }

  override ngAfterViewInit(): void {
    this.render();
    super.ngAfterViewInit();
  }
}
