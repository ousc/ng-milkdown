import {AfterViewInit, Component} from '@angular/core';
import mermaid from "mermaid";
import {SharedModule} from "../shared.module";
import {NgMilkdownNodeComp} from "ng-milkdown";

@Component({
  selector: 'diagram',
  template: `
      <div contenteditable="false" class="my-4 rounded shadow bg-nord-6 relative overflow-hidden"
           [class]="[selected ? 'ProseMirror-selectednode': '']">
          <div [class]="activeIndex === 0 ? ['dark-buttons']: []" class="not-prose doc-section-code-buttons scalein animation-duration-300">
              @switch (activeIndex){
                  @case (0) {
                      <button pTooltip="代码编辑" tooltipPosition="bottom" class="py-0 px-2 border-round h-2rem"
                              (click)="activeIndex = 1"
                      ><i class="pi pi-file-edit"></i></button>
                  }
                  @case (1) {
                      <button pTooltip="预览图" tooltipPosition="bottom" class="py-0 px-2 border-round h-2rem"
                              (click)="activeIndex = 0"
                      ><i class="pi pi-eye"></i></button>
                  }
              }
          </div>
          <div [style.display]="activeIndex === 0 ? 'flex': 'none'" [style.min-height.px]="160" #contentRef pTooltip="流程图块" tooltipPosition="left"
               class="relative cursor-pointer justify-center items-center">
              @if (!code || !rendering) {
                  <div class="mermaid-bg"></div>
                  <img draggable="false" class="mermaid-logo" src="./assets/mermaid-logo.svg" alt="mermaid"/>
                  <div class="mermaid-text">mermaid</div>
              }
          </div>
          <textarea [style.display]="activeIndex === 1 ? 'block': 'none'" [hidden]="activeIndex === 0" [(ngModel)]="code" placeholder="graph TD;"
                    (blur)="preview()"
                    class="h-48 w-full bg-slate-800 font-mono text-gray-50 rounded-md shadow"
          ></textarea>
      </div>
  `,
  styles: [
    `

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

      .mermaid-bg {
        width: 140px;
        height: 140px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        background-image: linear-gradient(-45deg, #bd34fe 50%, #ff3670 50%);;
        filter: blur(24px);
        transform: translate(-50%, -50%);
        animation: bloom linear 20s infinite;
      }

      .mermaid-logo {
        max-width: 140px;
        max-height: 140px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
      }

      .mermaid-text {
        position: absolute;
        bottom: 20px;
        color: #FFF;
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
    SharedModule,
  ],
  standalone: true
})
export class Diagram extends NgMilkdownNodeComp implements AfterViewInit {
  activeIndex= 0;

  rendering = true;
  code: string = null;

  preview(){
    this.setAttrs({value: this.code});
    this.render();
    this.activeIndex = 0;
  }

  render(){
    const renderMermaid = async () => {
      this.code = this.node.attrs['value'];
      const id = this.node.attrs['identity'];
      if (this.code.length === 0) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
      });

      const {svg, bindFunctions} = await mermaid.render(id, this.code);
      this.container.innerHTML = svg;
      bindFunctions?.(this.container);
    }
    requestAnimationFrame(async () => {
      await renderMermaid();
    });
    this.rendering = false;
  }

  ngAfterViewInit(): void {
    this.render();
  }
}
