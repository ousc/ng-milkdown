import {AfterViewInit, Component} from '@angular/core';
import {NgMilkdownNodeComp} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-node.directive";

@Component({
  selector: 'code-block',
  template: `
    <div class="my-4 rounded p-2 shadow bg-slate-800 relative"
         [class]="[selected ? 'ProseMirror-selectednode': '']">
      <div contenteditable="false" class="p-12 not-prose doc-section-code-buttons scalein animation-duration-300">
        <button title="Copy" class="border-round" (click)="copyToClipboard($event)"
        >@if(copiedSuccessfully){
          <span class="material-symbols-outlined text-sm !text-white cursor-pointer select-none">CHECK_CIRCLE</span>
        } @else {
          <span class="material-symbols-outlined text-sm !text-white cursor-pointer select-none">CONTENT_COPY</span>
        }</button>
      </div>
      <div contenteditable="false" class="not-prose absolute top-4 right-16">
        <select class="!pl-2 !pr-8 !focus:shadow-none cursor-pointer !bg-transparent !border-0 text-blue-600 outline-none"
                [value]="language"
                (change)="onChange($event)">
        >
          @for (lang of langs;track lang) {
            <option value="{{ lang }}">{{ lang }}</option>
          }
        </select>
      </div>
      <pre spellCheck="false" class="flex !m-0 !bg-slate-800">
                <code #contentRef></code>
      </pre>
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
        transition: background-color .2s,box-shadow .2s;
        border: 0 none;
        color: var(--surface-300);
        cursor: pointer;
      }

      .doc-section-code-buttons button:hover {
        background-color: rgba(255, 255, 255, .05);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, .05);
      }
    `
  ],
  standalone: true
})
export class CodeBlock extends NgMilkdownNodeComp implements AfterViewInit {
  language: string = 'text';

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.language = this.node.attrs?.language;
    });
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
    if(this.copiedSuccessfully) return;
    e.preventDefault();
    await navigator.clipboard.writeText(this.node.textContent);
    this.copiedSuccessfully = true;
    setTimeout(() => {
      this.copiedSuccessfully = false;
    }, 2000);
  }

  onChange(e: Event) {
    const language = (e.target as HTMLSelectElement).value;
    this.setAttrs({language});
  }

  copiedSuccessfully = false;
}
