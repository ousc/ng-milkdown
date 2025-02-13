import {Component, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  StringTemplateOutletDirective
} from "../../../../projects/ng-milkdown/src/lib/directive/string-template-outlet.directive";

@Component({
  selector: 'modal',
  standalone: true,
  imports: [CommonModule, StringTemplateOutletDirective],
  template: `
    <div *ngIf="visible" (click)="close()">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="header">
          <h3>
            <ng-container *stringTemplateOutlet="header">{{ header }}</ng-container>
          </h3>
          <button class="close-btn" (click)="close()">&times;</button>
        </div>
        <div class="content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .modal {
        background: white;
        border-radius: 4px;
        min-width: 300px;
        max-width: 90%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        padding: 16px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 0 8px;
        color: #666;
        &:hover {
          color: #333;
        }
      }

      .content {
        padding: 16px;
      }
    `
  ]
})
export class ModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() header: string| TemplateRef<any> = '';

  close() {
    this.visibleChange.emit(false);
  }
}
