import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {NgForOf} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'segmented',
  standalone: true,
  template: `
      <div class="segmented-control">
          <button
                  [title]="option | transloco"
                  *ngFor="let option of options; let i = index"
                  [class.active]="option === value"
                  (click)="selectOption(option)"
                  class="segmented-button"
          >
              @if(icons[i]) {
                  <span class="material-symbols-outlined !text-base align-middle bg-blue-500 text-white w-6 h-6 rounded-md">{{ icons[i] }}</span>
              }
              <span class="ml-2">{{ option | transloco }}</span>
          </button>
      </div>
  `,
  styles: [`
    .segmented-control {
      display: flex;
      border: 1px solid #ccc;
      border-radius: 5px;
      overflow: hidden;
    }

    .segmented-button {
      flex: 1;
      padding: 10px;
      border: none;
      background: #FFF;
      cursor: pointer;
      transition: background 0.3s;
      max-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .segmented-button.active {
      background: #007bff;
      color: white;
    }

    .segmented-button:not(.active):hover {
      background: #f0f0f0;
    }
  `],
  imports: [
    NgForOf,
    TranslocoPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SegmentedComponent),
      multi: true
    }
  ]
})
export class SegmentedComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() icons: string[] = [];

  value!: string; // 当前选中的值

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  selectOption(option: string) {
    this.value = option;
    this.onChange(this.value);
    this.onTouched();
  }

  // ControlValueAccessor 接口实现
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // 可以在这里处理禁用状态
  }
}
