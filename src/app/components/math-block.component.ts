import {AfterViewInit, Component} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {katexOptionsCtx} from '@milkdown/plugin-math';
import katex from 'katex';
import {NgMilkdownNodeComp} from "../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-node.directive";

@Component({
  selector: 'math-block',
  template: `
      <mat-tab-group contenteditable="false" [animationDuration]="150" [(selectedIndex)]="selectedIndex"
                     preserveContent>
          <mat-tab label="Preview">
              <div [style.min-height.px]="100" #contentRef
                   class="cursor-pointer border-2 border-gray-300 rounded-md p-2 flex justify-center items-center hover:bg-gray-100">
                  @if (!code || !rendering) {
                      <span class="text-gray-300">Katex math block support</span>
                  }
              </div>
          </mat-tab>
          <mat-tab label="Source">
                <textarea [(ngModel)]="code"
                          class="block h-48 w-full bg-slate-800 font-mono text-gray-50"
                ></textarea>
              <button (click)="demo()"
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
export class MathBlock extends NgMilkdownNodeComp implements AfterViewInit {
  selectedIndex = 0;
  rendering = true;
  code: string = null;

  demo() {
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
            this.contentRef.nativeElement,
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

  ngAfterViewInit(): void {
    this.render();
  }
}
