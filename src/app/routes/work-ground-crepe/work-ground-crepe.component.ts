import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {TopBarComponent} from "../../components/top-bar.component";
import {NgMilkdownProvider} from "../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../components/spinner.component";
import {NgMilkdownCrepe} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {Crepe, CrepeFeature} from "@milkdown/crepe";
import {insert} from '@milkdown/kit/utils';
import {editorViewCtx} from "@milkdown/core";
import {TextSelection} from "prosemirror-state";
import {sizePlugin} from "../../components/size.component";
import {$provide} from "../../../../projects/ng-milkdown/src/lib/actionFactory";
import {CrepeFeatureConfig} from "@milkdown/crepe/lib/types/feature";

@Component({
  selector: 'work-ground-crepe',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, TopBarComponent, NgMilkdownProvider, Spinner],
  templateUrl: './work-ground-crepe.component.html',
  styleUrl: './work-ground-crepe.component.scss',
})
export class WorkGroundCrepComponent implements OnInit {
  @ViewChild(NgMilkdownProvider, {static: true}) provider: NgMilkdownProvider;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/markdown.md', {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
  }

  features: Record<CrepeFeature, boolean> = {
    [CrepeFeature.Cursor]: true,
    [CrepeFeature.ListItem]: true,
    [CrepeFeature.LinkTooltip]: true,
    [CrepeFeature.ImageBlock]: true,
    [CrepeFeature.BlockEdit]: true,
    [CrepeFeature.Placeholder]: true,
    [CrepeFeature.Toolbar]: true,
    [CrepeFeature.CodeMirror]: true,
    [CrepeFeature.Table]: true,
  }

  featureConfigs: CrepeFeatureConfig = {
    [Crepe.Feature.BlockEdit]: {
      slashMenuTextGroupLabel: '文本',
      slashMenuListGroupLabel: '列表',
      slashMenuAdvancedGroupLabel: '高级',
      // Text Group
      slashMenuTextLabel: '文本',
      slashMenuH1Label: '一级标题',
      slashMenuH2Label: '二级标题',
      slashMenuH3Label: '三级标题',
      slashMenuH4Label: '四级标题',
      slashMenuH5Label: '五级标题',
      slashMenuH6Label: '六级标题',
      slashMenuQuoteLabel: '引用',
      slashMenuDividerLabel: '分割线',
      // List Group
      slashMenuOrderedListLabel: '有序列表',
      slashMenuBulletListLabel: '无序列表',
      slashMenuTaskListLabel: '任务列表',
      // Advanced Group
      slashMenuCodeBlockLabel: '代码块',
      slashMenuTableLabel: '表格',
      slashMenuImageLabel: '图片',
    }
  }

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
    crepe.editor.action(insert("# Welcome to use `NgMilkdown` with crepe!"));
  }

  plugins = [
    $provide(sizePlugin)
  ]
}
