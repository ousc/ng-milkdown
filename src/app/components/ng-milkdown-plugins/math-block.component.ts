import {AfterViewInit, Component} from '@angular/core';
import {katexOptionsCtx} from '@milkdown/plugin-math';
import katex from 'katex';
import {SharedModule} from "../shared.module";
import {NgMilkdownNodeComp} from "ng-milkdown";

@Component({
  selector: 'math-block',
  template: `
      <div contenteditable="false" class="my-4 rounded shadow bg-nord-6 relative py-2"
           [class]="[selected ? 'ProseMirror-selectednode': '']">
          <div [class]="activeIndex === 0 ? ['dark-buttons']: []" class="not-prose doc-section-code-buttons scalein animation-duration-300">
              @switch (activeIndex){
                  @case (0) {
                      <button pTooltip="代码编辑" tooltipPosition="bottom" class="py-0 px-2 border-round h-2rem"
                              (click)="activeIndex = 1"
                      ><i class="pi pi-file-edit"></i></button>
                  }
                  @case (1) {
                      <button pTooltip="预览公式" tooltipPosition="bottom" class="py-0 px-2 border-round h-2rem"
                              (click)="activeIndex = 0"
                      ><i class="pi pi-eye"></i></button>
                  }
              }
          </div>
          <div [style.display]="activeIndex === 0 ? 'flex': 'none'" #contentRef pTooltip="数学公式块" tooltipPosition="left"
               class="relative cursor-pointer justify-center items-center overflow-hidden">
              @if (!code || rendering) {
                  <div [style.min-height.px]="160"></div>
                  <div class="katex-bg"></div>
                  <img draggable="false" class="katex-logo" src="./assets/katex-logo.svg" alt="katex"/>
              }
          </div>
          <textarea [style.display]="activeIndex === 1 ? 'block': 'none'" [hidden]="activeIndex === 0" [(ngModel)]="code" placeholder="请输入数学公式"
                    (blur)="preview()"
                    class="h-48 w-full bg-slate-800 font-mono text-gray-50 rounded-md shadow"
          ></textarea>
      </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .doc-section-code-buttons {
      position: absolute;
      align-items: center;
      justify-content: end;
      z-index: 1;
      top: 0.75rem;
      right: 0.75rem;
      gap: 0.5rem;
      display: none;
      background: rgba(255, 255, 255, .05);
      border-radius: 10px;
      padding: 2px;
      -webkit-backdrop-filter: blur(6px);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, .1);
    }

    .doc-section-code-buttons.dark-buttons {
      background: rgba(0, 0, 0, .05);
      border: 1px solid rgba(0, 0, 0, .1);
    }

    :host:hover .doc-section-code-buttons {
      display: flex;
    }

    .doc-section-code-buttons button {
      outline: 0 none;
      border-radius: 8px;
      outline-offset: 0;
      background-color: transparent;
      transition: background-color .2s, box-shadow .2s;
      border: 0 none;
      color: var(--surface-500);
      cursor: pointer;
    }

    .doc-section-code-buttons button:hover {
      background-color: rgba(255, 255, 255, .05);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, .05);
    }

    .katex-bg {
      width: 140px;
      height: 140px;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background-image: linear-gradient(-45deg, #3d34fe 50%, #3670ff 50%);;
      filter: blur(24px);
      transform: translate(-50%, -50%);
      animation: bloom linear 20s infinite;
    }

    .katex-logo {
      width: 140px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: invert(1);
      user-select: none;
    }

    @keyframes bloom {
      0% {
        opacity: 1;
        transform: scale(1) translate(-50%, -50%);
      }
      12.5% {
        opacity: 0.6;
        transform: scale(0.5) translate(0, -75%);
      }
      37.5% {
        opacity: 0.8;
        transform: scale(1) translate(0, -25%);
      }
      62.5% {
        opacity: 0.6;
        transform: scale(0.5) translate(-100%, -25%);
      }
      87.5% {
        opacity: 0.8;
        transform: scale(0.75) translate(-100%, -75%);
      }
      100% {
        opacity: 1;
        transform: scale(1) translate(-50%, -50%);
      }
    }
  `],
  imports: [
    SharedModule
  ],
  standalone: true
})
export class MathBlock extends NgMilkdownNodeComp implements AfterViewInit {
  activeIndex = 0;

  rendering = true;
  code: string = null;

  preview() {
    this.rendering = true;
    this.setAttrs({value: this.code});
    setTimeout(() => {
      this.render();
    })
    this.activeIndex = 0;
  }

  render() {
    const renderKatex = async () => {
      this.action(ctx => {
        this.code = this.node.attrs['value'];
        if (this.code.length === 0) {
          return;
        }
        try {
          katex.render(
            this.code,
            this.container,
            ctx.get(katexOptionsCtx.key)
          );
        } catch (err) {
          console.error(err);
        }
      })
    }
    requestAnimationFrame(async () => {
      await renderKatex();
    });
    setTimeout(() => {
      this.rendering = false;
    })
  }

  ngAfterViewInit(): void {
    this.render();
  }
}
