import {AfterViewInit, Component, EventEmitter, Input, Output} from "@angular/core";
import {nanoid} from "@milkdown/utils";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalComponent} from "../../documentation/modal.component";

@Component(
  {
    selector: 'link-create-dialog',
    template: `
      <modal [(visible)]="visible" [header]="header" (visibleChange)="closeDialog()">
        <div class="m-0">
          <div class="w-full text-center mb-4">
            正在为 <span class="bg-blue-500 text-white">{{ selectedText }}</span> 创建超链接
          </div>
          <div class="p-8">
            <div class="w-full h-full flex items-center justify-center flex-col">
              <svg viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                <path
                  d="M927.3 301.9v678.3c0 24.1-19.5 43.6-43.6 43.6H667.9c-24.1 0-43.6-19.5-43.6-43.6V301.9c0-24.1 19.5-43.6 43.6-43.6h215.7c24.1-0.1 43.7 19.5 43.7 43.6z"
                  fill="#E3E3E3"></path>
                <path
                  d="M831.8 115v798.3c0 61-49.5 110.5-110.5 110.5h-508c-61 0-110.5-49.5-110.5-110.5V115c0-61 49.5-110.5 110.5-110.5h508c61 0 110.5 49.5 110.5 110.5z"
                  fill="#E3E3E3"></path>
                <path
                  d="M728.4 387.6H391.6c-15 0-27.3-12.3-27.3-27.3s12.3-27.3 27.3-27.3h336.8c15 0 27.3 12.3 27.3 27.3s-12.3 27.3-27.3 27.3zM728.4 521.4H391.6c-15 0-27.3-12.3-27.3-27.3s12.3-27.3 27.3-27.3h336.8c15 0 27.3 12.3 27.3 27.3s-12.3 27.3-27.3 27.3zM728.4 655.2H391.6c-15 0-27.3-12.3-27.3-27.3s12.3-27.3 27.3-27.3h336.8c15 0 27.3 12.3 27.3 27.3s-12.3 27.3-27.3 27.3zM728.4 789H391.6c-15 0-27.3-12.3-27.3-27.3s12.3-27.3 27.3-27.3h336.8c15 0 27.3 12.3 27.3 27.3S743.4 789 728.4 789z"
                  fill="#B0B0B0"></path>
                <path
                  d="M883.1 1023.9h-8.3c-23.7 0-43-19.3-43-43V258.2h52.8c22.9 0 41.5 18.6 41.5 41.5v681.1c0 23.8-19.2 43.1-43 43.1z"
                  fill="#CDCDCD"></path>
                <path
                  d="M563.3 125.4H226.5c-15 0-27.3-12.3-27.3-27.3s12.3-27.3 27.3-27.3h336.8c15 0 27.3 12.3 27.3 27.3-0.1 15-12.3 27.3-27.3 27.3zM563.3 209.7H226.5c-15 0-27.3-12.3-27.3-27.3s12.3-27.3 27.3-27.3h336.8c15 0 27.3 12.3 27.3 27.3-0.1 15.1-12.3 27.3-27.3 27.3z"
                  fill="#B0B0B0"></path>
              </svg>
              <div class="mt-4">您可以将文章拖拽到此处</div>
            </div>
          </div>
          <div class="mt-4 flex flex-column gap-2">
            <label class="leading-8" [for]="id">链接</label>
            <input class="flex-1 p-inputtext-sm" [id]="id" aria-describedby="link-href-help"
                   [(ngModel)]="href"/>
          </div>
          <div class="mt-4 flex flex-column gap-2">
            <label class="leading-8" for="link-title">标题</label>
            <input class="flex-1" id="link-title" aria-describedby="link-title-help"
                   [(ngModel)]="title"/>
          </div>
          <div class="mt-4 flex align-items-center gap-2">
            <button size="small" (click)="confirm()"
                      class="w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10">确认</button>
            <button size="small" (click)="closeDialog()"
                      class="w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10">取消</button>
          </div>
        </div>
      </modal>
    `,
    styles:[
      `
        :host {
          display: contents;
        }
      `
    ],
    standalone: true,
    imports: [ReactiveFormsModule, ModalComponent, FormsModule],
  }
)

export class LinkCreateDialogComponent implements AfterViewInit {
  href: string = "http://";
  title: string = null;
  @Input() selectedText: string = null;
  ngAfterViewInit(): void {
    setTimeout(() => {
      (document.querySelector(`#${this.id}`) as HTMLInputElement).focus();
    });
  }

  id = nanoid();
  @Input() visible = true;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() header = '';

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  @Output() onConfirm = new EventEmitter<{ href: string, title: string }>();

  confirm() {
    const {href, title} = this;
    if(!href) {
      // this.msg.add({ severity: 'error', summary: '错误', detail: '请输入链接' });
      return;
    }
    if(!href.startsWith('http')) {
      // this.msg.add({ severity: 'error', summary: '错误', detail: '请输入合法的链接' });
      return;
    }
    this.onConfirm.emit({href, title});
  }
}
