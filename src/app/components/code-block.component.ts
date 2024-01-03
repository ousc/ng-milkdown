import {AfterViewInit, Component} from '@angular/core';
import {NgMilkdownNodeComp} from "../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-node.directive";

@Component({
  selector: 'code-block',
  template: `
      <div class="not-prose my-4 rounded bg-gray-200 p-5 shadow dark:bg-gray-800"
           [class]="[selected ? 'ProseMirror-selectednode': '']">
          <div contentEditable="false" class="mb-2 flex justify-between">
              <select class="!focus:shadow-none cursor-pointer rounded !border-0 bg-white shadow-sm focus:ring-2 focus:ring-offset-2 dark:bg-black"
                      [value]="language"
                      (change)="onChange($event)"
              >
                  @for (lang of langs;track lang) {
                      <option value="{{ lang }}">{{ lang }}</option>
                  }
              </select>

              <button class="inline-flex items-center justify-center rounded border border-gray-200 px-4 py-2 text-base font-medium leading-6 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 dark:bg-black"
                      [class]="copiedSuccessfully ? ['bg-green-400', 'hover:bg-green-400', 'text-white'] : ['bg-white']"
                      [disabled]="copiedSuccessfully"
                      (click)="copyToClipboard($event)"
              >
                  {{ copiedSuccessfully ? 'Copied!' : 'Copy' }}
              </button>
          </div>
          <pre spellCheck="false" class="flex !m-0 !mb-4">
                <code class="code-block-ref"></code>
          </pre>
      </div>
  `,
  styles: [
    `
      .code-block-ref {
        min-width: 1px;
      }
    `
  ],
  standalone: true
})
export class CodeBlock extends NgMilkdownNodeComp implements AfterViewInit {
  language: string = 'text';

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.language = this.node.attrs?.language;
    });
  }

  langs = [
    'text',
    'javascript',
    'typescript',
    'css',
    'html',
    'bash',
    'json',
    'markdown',
    'python',
    'java',
    'c',
    'cpp',
    'ruby',
    'go',
    'rust',
    'php',
    'sql',
    'yaml',
  ];

  async copyToClipboard(e: Event) {
    e.preventDefault();
    await navigator.clipboard.writeText(this.node.textContent);
    this.copiedSuccessfully = true;
    setTimeout(() => {
      this.copiedSuccessfully = false;
    }, 2000);
  }

  override get container() {
    return this.el.nativeElement.querySelector('.code-block-ref') as HTMLElement;
  }

  onChange(e: Event) {
    const {value} = e.target as HTMLSelectElement;
    this.setAttrs({language: value});
    this.contentRef(this.container)
  }

  copiedSuccessfully = false;
}
