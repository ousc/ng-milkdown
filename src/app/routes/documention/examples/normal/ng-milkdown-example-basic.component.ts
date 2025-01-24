import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {
  NgMilkdownProvider
} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {SegmentedComponent} from "../../../../components/documentation/segmented.component";
import {AppService} from "../../../../app.service";
import {NgMilkdown} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";

@Component({
  selector: 'ng-milkdown-example-basic',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMilkdown, NgMilkdownProvider, Spinner, SegmentedComponent],
  template: `
      <article class="prose lg:prose-xl"></article>
      <div class="relative h-full">
          <segmented class="fixed top-0 left-0 w-full z-10 opacity-90" [(ngModel)]="selected"
                     [options]="['demo', 'example.component.html', 'example.component.ts']"
                     [icons]="['preview', 'html', 'code']"
                     (ngModelChange)="handleSegmentedChange()"
          />
          <div id="size" class="fixed bottom-4 left-4 h-10 leading-10 pointer-events-none"></div>
          <div [class.p-24]="selected === 'demo'"
               class="h-full overflow-auto overscroll-none ctn flex flex-col mt-10">
              @if (selected === 'demo') {
                  <textarea contenteditable="false"  class="w-full p-8 outline-1" [(ngModel)]="value"></textarea>
              }
              <ng-milkdown-provider>
                  <ng-milkdown
                          [(ngModel)]="value"
                          [(loading)]="loading"
                          (ngModelChange)="onChange($event)"
                          [spinner]="spinner"
                  />
                  <ng-template #spinner>
                      <spinner/>
                  </ng-template>
              </ng-milkdown-provider>
          </div>
      </div>
  `,
  styles:
  `
  ::ng-deep .milkdown .ProseMirror {
      padding: 0!important;
  }
  `
})
export class NgMilkdownExampleBasicComponent implements OnInit {
  constructor(private http: HttpClient, private appService: AppService) {
  }

  selected = 'demo';
  value: string;
  loading = true;

  async ngOnInit(): Promise<void> {
    this.handleSegmentedChange();
  }

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }

  handleSegmentedChange() {
    if (this.selected === 'example.component.html') {
      this.http.get('assets/markdowns/crepe-example-basic/template.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'example.component.ts') {
      this.http.get('assets/markdowns/crepe-example-basic/typescript.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else {
      this.value = '# hello, ng-milkdown!';
    }
    console.log(this.value);
  }
}
