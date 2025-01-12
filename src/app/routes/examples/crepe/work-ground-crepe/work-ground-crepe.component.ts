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
import {Crepe} from "@milkdown/crepe";
import {insert} from '@milkdown/kit/utils';
import {editorViewCtx} from "@milkdown/core";
import {TextSelection} from "prosemirror-state";
import {sizePlugin} from "../../../../components/size.component";
import {$provide} from "../../../../../../projects/ng-milkdown/src/lib/actionFactory";
import {CrepeFeatureConfig} from "@milkdown/crepe/lib/types/feature";
import {TranslocoService} from "@jsverse/transloco";
import {BlockEditFeatureConfig} from "@milkdown/crepe/lib/types/feature/block-edit";

@Component({
  selector: 'work-ground-crepe',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, TopBarComponent, NgMilkdownProvider, Spinner],
  templateUrl: './work-ground-crepe.component.html',
  styleUrl: './work-ground-crepe.component.scss',
})
export class WorkGroundCrepComponent implements OnInit {
  @ViewChild(NgMilkdownProvider, {static: true}) provider: NgMilkdownProvider;

  constructor(private http: HttpClient, private translocoService: TranslocoService) {
  }

  async ngOnInit(): Promise<void> {
    this.http.get('assets/markdown.md', {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
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

  async translateFeatureConfig<T>(keys: (keyof T)[]): Promise<T> {
    return new Promise(resolve => {
        let translatedKeys = [];
        this.translocoService.selectTranslate(keys as string[])
          .subscribe((res) => {
            translatedKeys = res;
            const result: any = {};

            for (let i = 0; i < keys.length; i++) {
              result[keys[i]] = translatedKeys[i];
            }

            resolve(result as T);
          });
      }
    )
  }

  featureConfigs: CrepeFeatureConfig = null;

  value: string;
  loading = true;

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }

  beforeReady(crepe: Crepe) {
    // crepe.setReadonly(true);
    // crepe.editor.use(somePlugin);
  }

  onReady(crepe: Crepe) {
    crepe.editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      ctx.get(editorViewCtx).state.selection = new TextSelection(view.state.doc.resolve(0));
    })
    crepe.editor.action(insert("# Welcome to ~~NgMilkdown~~ NgMilkdownCrepe!"));
  }

  // import custom plugins
  plugins = [
    $provide(sizePlugin),
  ]
}
