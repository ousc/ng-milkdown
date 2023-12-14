import {Component} from '@angular/core';
import {
  NgProsemirrorWidget
} from "../../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-widget.component";
import {Ctx} from "@milkdown/ctx";
import {NgMilkdown} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {commandsCtx} from "@milkdown/core";
import {updateLinkCommand} from "@milkdown/preset-commonmark";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'link-widget-before',
  template: `[`,
  styles: [],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class LinkWidgetBefore extends NgProsemirrorWidget {}
