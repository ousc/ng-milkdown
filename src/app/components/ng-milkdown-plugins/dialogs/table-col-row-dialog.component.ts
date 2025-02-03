// import {AfterViewInit, Component, EventEmitter, Input, Output} from "@angular/core";
// import {SharedModule} from "../../shared.module";
// import {DividerModule} from "primeng/divider";
// import {Else, If, when} from "conditio";
// import {AutoFocusModule} from "primeng/autofocus";
// import {nanoid} from "@milkdown/utils";
//
// @Component(
//   {
//     selector: 'table-col-row-dialog',
//     template: `
//         <p-dialog [(visible)]="visible" [header]="header" appendTo="body" (visibleChange)="closeDialog()">
//             <div class="m-0">
//                 <div class="text-center text-sm mb-2">
//                     {{ previewRow || row }} x {{ previewCol || col }}
//                 </div>
//                 <div class="flex text-center justify-center items-center flex-col"
//                      (mouseleave)="previewRow = 0;previewCol = 0">
//                     @for (i of rowOptions;track i) {
//                         <div class="flex gap-1 mt-1">
//                             @for (j of colOptions;track j) {
//                                 <div class="w-8 h-4 border border-gray-400 cursor-pointer hover:bg-indigo-300"
//                                      (mouseover)="previewRow = i;previewCol = j"
//                                      (click)="row = i;col = j;confirm()"
//                                      [class]="when(
//                                         If(previewRow >= i && previewCol >= j && i == 1, ['bg-gray-400']),
//                                         If(previewRow >= i && previewCol >= j, ['bg-indigo-300']),
//                                         If(row >= i && col >= j && i == 1, ['bg-gray-300']),
//                                         If(row >= i && col >= j, ['bg-gray-200']),
//                                         Else(['bg-white'])
//                                      )"
//                                 ></div>
//                             }
//                             <div class="w-2 h-4">
//                                 @if (col > 6 && i == 5) {
//                                     <span>…</span>
//                                 }
//                             </div>
//                         </div>
//                     }
//                     @if (row > 10) {
//                         <div class="mt-1">…</div>
//                     }
//                 </div>
//                 <p-divider/>
//                 <div class="flex-auto gap-2">
//                     <p-inputNumber [size]="6" [inputId]="id" id="row" [(ngModel)]="row" [showButtons]="true" [min]="1" [max]="100"
//                                    class="p-inputtext-sm bg-white-alpha-20 border-none p-3 text-primary-50"/>
//                     ×
//                     <p-inputNumber [size]="6" id="col" [(ngModel)]="col" [showButtons]="true" [min]="1" [max]="20"
//                                    class="p-inputtext-sm bg-white-alpha-20 border-none p-3 text-primary-50"/>
//                 </div>
//                 <div class="mt-4 flex align-items-center gap-2">
//                     <p-button size="small" label="确认" (click)="confirm()"
//                               styleClass="w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
//                               class="w-full"></p-button>
//                     <p-button size="small" label="取消" (click)="closeDialog()" [text]="true"
//                               styleClass="w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
//                               class="w-full"></p-button>
//                 </div>
//             </div>
//         </p-dialog>
//     `,
//     standalone: true,
//     imports: [SharedModule, DividerModule, AutoFocusModule]
//   }
// )
//
// export class TableColRowDialogComponent implements AfterViewInit {
//   constructor() {
//   }
//   ngAfterViewInit(): void {
//     setTimeout(() => {
//       (document.querySelector(`#${this.id}`) as HTMLInputElement).focus();
//     });
//   }
//
//   id = nanoid();
//   @Input() visible = true;
//   @Output() visibleChange = new EventEmitter<boolean>();
//
//   @Input() header = '';
//
//   closeDialog() {
//     this.visible = false;
//     this.visibleChange.emit(this.visible);
//   }
//
//   rowOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   colOptions = [1, 2, 3, 4, 5, 6];
//   previewRow = 0;
//   previewCol = 0;
//
//   @Input() row = 3;
//   @Input() col = 3;
//
//   @Output() onConfirm = new EventEmitter<{ row: number, col: number }>();
//
//   confirm() {
//     const {row, col} = this;
//     this.onConfirm.emit({row, col});
//   }
//
//   protected readonly when = when;
//   protected readonly If = If;
//   protected readonly Else = Else;
// }
