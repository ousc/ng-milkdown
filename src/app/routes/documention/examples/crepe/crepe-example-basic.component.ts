import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {
  NgMilkdownProvider
} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {NgMilkdownCrepe} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {SegmentedComponent} from "../../../../components/documentation/segmented.component";
import {AppService} from "../../../../app.service";
import {CodemirrorComponent} from "../../../../components/documentation/codemirror.component";
import {styleUrls} from "../../../../shared/style-urls";

@Component({
  selector: 'crepe-example-basic',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMilkdownCrepe, NgMilkdownProvider, Spinner, SegmentedComponent, CodemirrorComponent],
  template: `
    <article class="prose lg:prose-xl"></article>
    <div class="relative h-full">
      <segmented class="fixed top-0 left-0 w-full z-10 opacity-90" [(ngModel)]="selected"
                 [options]="['demo', 'example.component.html', 'example.component.ts']"
                 [icons]="['preview', 'html', 'code']"
                 (ngModelChange)="handleSegmentedChange()"
      />
      <div class="h-full overflow-auto overscroll-none ctn flex flex-row mt-10">
        @if (selected === 'demo') {
          <codemirror [class]="['w-full', 'flex-1']" [classList]="['h-full']" [(ngModel)]="value"></codemirror>
        }
        <div
          [class]="['flex-1', 'overflow-y-auto']">
          <ng-milkdown-provider [class]="selected === 'demo' ? ['p-16'] : []">
            <ng-milkdown-crepe
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
    </div>
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls,
  styles:
    `
      ::ng-deep .milkdown .ProseMirror {
        padding: 0 !important;
      }
    `
})
export class CrepeExampleBasicComponent implements OnInit {
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
  }
}
