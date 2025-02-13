import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NgMilkdownNodeComp} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-node.directive";
import katex from "katex";
import {debounce} from "../../shared/debounce_throttle";

@Component({
  selector: 'code-block',
  template: `
    <div class="my-4 rounded p-2 shadow bg-slate-800 relative"
         [class]="[selected ? 'ProseMirror-selectednode': '']">
      <div contenteditable="false" class="p-12 not-prose doc-section-code-buttons scalein animation-duration-300">
        <button title="Copy" class="border-round" (click)="copyToClipboard($event)"
        >@if (copiedSuccessfully) {
          <span class="material-symbols-outlined text-sm !text-white cursor-pointer select-none">CHECK_CIRCLE</span>
        } @else {
          <span class="material-symbols-outlined text-sm !text-white cursor-pointer select-none">CONTENT_COPY</span>
        }</button>
      </div>
      <div contenteditable="false" class="not-prose absolute top-4 right-16">
        <select
          class="!pl-2 !pr-8 !focus:shadow-none cursor-pointer !bg-transparent !border-0 text-blue-600 outline-none"
          [value]="language"
          (change)="onChange($event)">
          >
          @for (lang of langs; track lang) {
            <option value="{{ lang }}">{{ lang }}</option>
          }
        </select>
      </div>
      <pre [hidden]="fullscreen" spellCheck="false" class="flex !m-1 !bg-slate-800">
        <code #contentRef class="!min-w-10"></code>
      </pre>
      @if (language === 'latex') {
        <button class="doc-section-code-buttons bottom-3 !top-auto" (click)="fullscreen = !fullscreen">
          @if (fullscreen) {
            <i class="material-symbols-outlined">FULLSCREEN_EXIT</i>
          } @else {
            <i class="material-symbols-outlined">FULLSCREEN</i>
          }
        </button>
        <div title="数学公式块"
             class="relative rounded-sm bg-nord6  not-prose cursor-pointer justify-center items-center overflow-hidden">
          <div [hidden]="!code" #katexRef></div>
          @if (!code) {
            <div [style.min-height.px]="160"></div>
            <div class="katex-bg"></div>
            <img draggable="false" class="katex-logo" src="./assets/katex-logo.svg" alt="katex"/>
          }
        </div>
      }
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
        padding: 0.2rem 0.5rem;
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, .1);
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
        color: var(--surface-300);
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
        background-image: linear-gradient(-45deg, #3d34fe 50%, #3670ff 50%);
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
    `
  ],
  standalone: true
})
export class CodeBlock extends NgMilkdownNodeComp implements AfterViewInit {
  language: string = 'text';

  code = "";
  fullscreen = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.language = this.node.attrs?.language;
      this.onUpdate();
    }, 200);
  }

  langs = [
    'angular-html',
    'bash',
    'c',
    'cpp',
    'css',
    'go',
    'html',
    'java',
    'javascript',
    'json',
    'latex',
    'markdown',
    'kotlin',
    'php',
    'python',
    'ruby',
    'rust',
    'sql',
    'swift',
    'text',
    'typescript',
    'yaml'
  ];

  async copyToClipboard(e: Event) {
    if (this.copiedSuccessfully) return;
    e.preventDefault();
    await navigator.clipboard.writeText(this.node.textContent);
    this.copiedSuccessfully = true;
    setTimeout(() => {
      this.copiedSuccessfully = false;
    }, 2000);
  }

  @ViewChild("katexRef", {static: false}) katexRef: ElementRef;

  onChange(e: Event) {
    const language = (e.target as HTMLSelectElement).value;
    this.setAttrs({language});
    this.language = language;
  }

  copiedSuccessfully = false;

  override onUpdate() {
    setTimeout(() => {
      this.code = this.node.textContent;
      console.log(this.code);
      debounce(() => {
        if (this.language === 'latex' && this.code) {
          const renderKatex = async () => {
            this.action(ctx => {
              if (this.code.length === 0) {
                return;
              }
              try {
                katex.render(
                  this.code,
                  this.katexRef.nativeElement,
                  {displayMode: true, throwOnError: false}
                );
              } catch (err) {
                console.error(err);
              }
            })
          }
          requestAnimationFrame(async () => {
            await renderKatex();
          });
        }
      });
    }, 200);
  }
}
