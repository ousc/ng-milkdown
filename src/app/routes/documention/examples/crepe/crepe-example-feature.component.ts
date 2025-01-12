import {Component, OnInit} from '@angular/core';
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
import {Crepe} from "@milkdown/crepe";
import {BlockEditFeatureConfig} from "@milkdown/crepe/lib/types/feature/block-edit";
import {CrepeFeatureConfig} from "@milkdown/crepe/lib/types/feature";
import {TranslocoService} from "@jsverse/transloco";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'work-ground-crepe-feature',
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
               class="h-full overflow-auto overscroll-none ctn flex flex-col">
              <ng-milkdown-provider>
                  <ng-milkdown-crepe
                          [(ngModel)]="value"
                          [(loading)]="loading"
                          (ngModelChange)="onChange($event)"
                          [featureConfigs]="featureConfigs"
                          [features]="features"
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
export class CrepeExampleFeatureComponent implements OnInit {
  constructor(private http: HttpClient, private translocoService: TranslocoService, private appService: AppService) {
  }

  selected = 'demo';
  value: string;
  loading = true;  async translateFeatureConfig<T>(keys: (keyof T)[]): Promise<T> {
    return new Promise(resolve => {
        let translatedKeys = [];
        this.translocoService.selectTranslate(keys as string[])
          .subscribe((res) => {
            translatedKeys = res;
            const result: any = {};

            for (let i = 0; i < keys.length; i++) {
              result[keys[i]] = translatedKeys[i] + '_1';
            }

            resolve(result as T);
          });
      }
    )
  }

  async ngOnInit(): Promise<void> {
    this.handleSegmentedChange();
    this.featureConfigs = {
      [Crepe.Feature.BlockEdit]: await this.translateFeatureConfig<BlockEditFeatureConfig>(
        [
          "slashMenuTextGroupLabel",
          "slashMenuListGroupLabel",
          "slashMenuAdvancedGroupLabel",
          // Text Group
          "slashMenuTextLabel",
          "slashMenuH1Label",
          "slashMenuH2Label",
          "slashMenuH3Label",
          "slashMenuH4Label",
          "slashMenuH5Label",
          "slashMenuH6Label",
          "slashMenuQuoteLabel",
          "slashMenuDividerLabel",
          // List Group
          "slashMenuOrderedListLabel",
          "slashMenuBulletListLabel",
          "slashMenuTaskListLabel",
          // Advanced Group
          "slashMenuCodeBlockLabel",
          "slashMenuTableLabel",
          "slashMenuImageLabel"
        ]
      )
    };
  }

  features = {
    [Crepe.Feature.CodeMirror]: false
  }
  featureConfigs: CrepeFeatureConfig = null;

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }

  handleSegmentedChange() {
    if (this.selected === 'example.component.html') {
      this.features = {[Crepe.Feature.CodeMirror]: true};
      this.http.get('assets/markdowns/crepe-example-feature/template.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'example.component.ts') {
      this.features = {[Crepe.Feature.CodeMirror]: true};
      this.http.get('assets/markdowns/crepe-example-feature/typescript.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else {
      this.features = {[Crepe.Feature.CodeMirror]: false};
      this.http.get(`assets/markdowns/${this.appService.language}/overview.md`, {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    }
  }
}
