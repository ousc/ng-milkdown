import {Component} from '@angular/core';
import {NgMilkdownTooltip} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-tooltip.directive";
import {FormsModule} from "@angular/forms";
import {commandsCtx} from "@milkdown/core";
import {updateImageCommand} from "@milkdown/preset-commonmark";
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {NodeSelection} from "prosemirror-state";

@Component({
  selector: 'image-tooltip',
  templateUrl: './image-tooltip.component.html',
  styleUrl: './image-tooltip.component.scss',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class ImageTooltip extends NgMilkdownTooltip {

  src: string = '';
  alt: string = '';
  title: string = '';

  temp = '';

  onChange(key: string, e: FocusEvent) {
    if (this.temp !== (this as any)[key]) {
      this.action((ctx) => {
        const commands = ctx.get(commandsCtx);
        commands.call(updateImageCommand.key, {
          [key]: (this as any)[key],
        });
      });
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  override get pluginView(): any {
    return new TooltipProvider({
      content: this.container,
      tippyOptions: {
        zIndex: 9999,
        appendTo: document.body,
      },
      shouldShow: (view) => {
        const {selection} = view.state;
        const {empty, from} = selection;

        const imageNode = view.state.doc.nodeAt(selection.from);

        const {src, alt, title} = imageNode?.attrs ?? {};
        this.src = src;
        this.alt = alt;
        this.title = title;

        const isTooltipChildren = this.container.contains(
          document.activeElement
        );

        const notHasFocus = !view.hasFocus() && !isTooltipChildren;

        const isReadonly = !view.editable;

        if (notHasFocus || empty || isReadonly) {
          return false;
        }

        return (
          selection instanceof NodeSelection &&
          view.state.doc.nodeAt(from)?.type.name === "image"
        );
      },
    });
  }
}
