import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {TopBarComponent} from "../../../../components/top-bar.component";
import {
  NgMilkdownProvider
} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {NgMilkdownCrepe} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {SegmentedComponent} from "../../../../components/segmented.component";
import {NgMilkdownCrepeEditor} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {editorViewCtx} from "@milkdown/core";
import {insert} from "@milkdown/kit/utils";
import {TextSelection} from "prosemirror-state";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'work-ground-crepe-outputs',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, TopBarComponent, NgMilkdownProvider, Spinner, SegmentedComponent],
  template: `
      <article class="prose lg:prose-xl"></article>
      <div class="relative h-full">
          <segmented class="fixed top-0 left-0 w-full z-10 opacity-90" [(ngModel)]="selected"
                     [options]="['demo', 'example.component.html', 'example.component.ts']"
                     [icons]="['preview', 'html', 'code']"
                     (ngModelChange)="handleSegmentedChange()"
          />
          <div id="size" class="fixed bottom-4 left-4 h-10 leading-10 pointer-events-none"></div>
          <div [class.px-24]="selected === 'demo'"
               class="h-full overflow-auto overscroll-none ctn flex flex-col mt-4">
              <ng-milkdown-provider>
                  <ng-milkdown-crepe
                          [(ngModel)]="value"
                          [(loading)]="loading"
                          (ngModelChange)="onChange($event)"
                          [spinner]="spinner"
                          (beforeReady)="beforeReady($event)"
                          (onReady)="onReady($event)"
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
export class CrepeExampleOutputsComponent implements OnInit {
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
      this.http.get('assets/markdowns/crepe-example-outputs/template.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'example.component.ts') {
      this.http.get('assets/markdowns/crepe-example-outputs/typescript.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else {
      this.http.get(`assets/markdowns/${this.appService.language}/overview.md`, {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    }
    console.log(this.value);
  }

  beforeReady({crepe, provider}: NgMilkdownCrepeEditor) {
    console.log('crepe ready!', {crepe, provider})
  }

  onReady({crepe, provider}: NgMilkdownCrepeEditor) {
    if(this.selected === 'demo') {
      crepe.editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        ctx.get(editorViewCtx).state.selection = new TextSelection(view.state.doc.resolve(0));
      })
      crepe.editor.action(insert("# Welcome to ~~NgMilkdown~~ NgMilkdownCrepe!"));
      crepe.setReadonly(true);
    }
  }
}
