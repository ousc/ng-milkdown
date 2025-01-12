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
import {AppService} from "../../../../app.service";
import {imageInlineComponent} from "@milkdown/kit/component/image-inline";
import {sizePlugin} from "../../../../components/size.component";

@Component({
  selector: 'work-ground-crepe-plugin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, TopBarComponent, NgMilkdownProvider, Spinner, SegmentedComponent],
  template: `
      <article class="prose lg:prose-xl"></article>
      <div class="relative h-full">
          <segmented class="fixed top-0 left-0 w-full z-10 opacity-90" [(ngModel)]="selected"
                     [options]="['demo', 'example.component.html', 'example.component.ts', 'size.component.ts']"
                     [icons]="['preview', 'html', 'code', 'code']"
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
                          [plugins]="plugins"
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
export class CrepeExamplePluginComponent implements OnInit {
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
      this.http.get('assets/markdowns/crepe-example-plugin/template.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'example.component.ts') {
      this.http.get('assets/markdowns/crepe-example-plugin/typescript.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'size.component.ts') {
      this.http.get('assets/markdowns/crepe-example-plugin/typescript2.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else {
      this.http.get(`assets/markdowns/${this.appService.language}/overview.md`, {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    }
    console.log(this.value);
  }

  plugins = [imageInlineComponent, sizePlugin];
}
