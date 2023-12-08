import {Component} from '@angular/core';
import {NgMilkdownBlock} from "../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-block.directive";
@Component({
  selector: 'block',
  template: `
      <div class="w-6 bg-slate-200 rounded hover:bg-slate-300 cursor-grab">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
      </div>
  `,
  styles:[],
  standalone: true
})
export class BlockComponent extends NgMilkdownBlock {}