import {Component, ElementRef, Signal, signal, WritableSignal} from '@angular/core';
import {callCommand} from "@milkdown/utils"
import {
  toggleEmphasisCommand,
  toggleInlineCodeCommand, toggleLinkCommand,
  toggleStrongCommand, updateLinkCommand,
  wrapInBlockquoteCommand
} from "@milkdown/preset-commonmark";
import {toggleStrikethroughCommand} from "@milkdown/preset-gfm";
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {CmdKey, commandsCtx, editorViewCtx} from "@milkdown/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  NgMilkdownTooltip
} from "../../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-tooltip.directive";
import {If, when} from "conditio";

interface Button {
  command?: CmdKey<any>,
  click?: (e: MouseEvent | TouchEvent) => void,
  selected?: WritableSignal<boolean>,
  disabled?: Signal<boolean>,

  [key: string]: any
}

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule]
})
export class Tooltip extends NgMilkdownTooltip {
  constructor(public override el: ElementRef, private fb: FormBuilder) {
    super(el);
  }

  isLink: WritableSignal<boolean> = signal(false);
  isStrong: WritableSignal<boolean> = signal(false);
  isItalic: WritableSignal<boolean> = signal(false);
  isStrikethrough: WritableSignal<boolean> = signal(false);
  isInlineCode: WritableSignal<boolean> = signal(false);
  isBlockquote: WritableSignal<boolean> = signal(false);

  buttons: Button[][] = [
    [
      {
        icon: 'format_bold',
        title: '加粗',
        command: toggleStrongCommand.key,
        selected: this.isStrong,
      },
      {
        icon: 'format_italic',
        title: '斜体',
        command: toggleEmphasisCommand.key,
        selected: this.isItalic,
      },
      {
        icon: 'format_strikethrough',
        title: '删除线',
        command: toggleStrikethroughCommand.key,
        selected: this.isStrikethrough,
      },
      {
        icon: 'code',
        title: '代码',
        command: toggleInlineCodeCommand.key,
        selected: this.isInlineCode,
      },
      {
        icon: 'format_quote',
        title: '引用',
        command: wrapInBlockquoteCommand.key,
        selected: this.isBlockquote,
        disabled: this.isBlockquote
      },
      {
        icon: 'link',
        title: '超链接',
        selected: this.isLink,
        click: (e: MouseEvent | TouchEvent) => {
          e.preventDefault();
          if (this.isLink()) {
            this.action(callCommand(toggleLinkCommand.key));
          } else {
            this.isLink.set(false);
            this.visible = true;
          }
        },
      },
    ],
  ]

  getClassList(button: Button) {
    return when(
      If(button.disabled && button.disabled(),['cursor-not-allowed', '!text-gray-300', '!bg-gray-200']),
      If(button.selected && button.selected(), ['bg-nord-10', 'text-white']),
      () => <string[]>[]
    );
  }

  mousedown(e: MouseEvent | TouchEvent, {command, click, disabled, selected}: Button) {
    e.preventDefault();
    if (disabled) {
      return;
    }
    if (click) {
      click(e);
      return;
    }
    this.action(callCommand(command));
  }

  confirm(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.visible = false;
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      this.action((ctx) => {
        const commands = ctx.get(commandsCtx);
        commands.call(updateLinkCommand.key, this.form.getRawValue());
      });
      return true;
    } else {
      return false;
    }
  }

  selectedText: string = null;
  form: FormGroup = this.fb.group({
    href: [null, [Validators.required]],
    title: null
  });

  override get pluginView() {
    return new TooltipProvider({
      debounce: 50,
      content: this.container,
      shouldShow: (view) => {
        const {from, to} = view.state.selection;
        const node = view.state.doc.nodeAt(view.state.selection.from);
        const linkMark = node?.marks.find((mark) => mark.type.name === "link");
        this.isStrong.set(!!node?.marks.find((mark) => mark.type.name === "strong"));
        this.isItalic.set(!!node?.marks.find((mark) => mark.type.name === "emphasis"));
        this.isStrikethrough.set(!!node?.marks.find((mark) => mark.type.name === "strike_through"));
        this.isInlineCode.set(!!node?.marks.find((mark) => mark.type.name === "inlineCode"));
        let isBlockquote = false;
        const start = view.state.selection.$from;
        let depth = start.depth;
        while (depth) {
          const node = start.node(depth);
          if (node.type.name === 'blockquote') {
            isBlockquote = true;
            break;
          }
          depth--;
        }
        this.isBlockquote.set(isBlockquote);
        this.isLink.set(!!linkMark);
        if (linkMark) {
          const {href, title} = linkMark.attrs;
          this.form.patchValue({href, title: title || node.text})
        } else {
          const slice = view.state.selection.content();
          this.selectedText = slice.content.textBetween(0, slice.content.size);
        }
        const visible = from !== to && view.state.doc.nodeAt(from)?.type.name === "text";
        this.hidden = !visible;
        return visible;
      }
    }) as any;
  }

  visible = false;

  createLink({href, title}: { href: string, title: string }) {
    this.visible = false;
    this.action((ctx) => {
      const commands = ctx.get(commandsCtx);
      commands.call(toggleLinkCommand.key, {href, title});
    });
  }

  hidden = true;
  protected readonly when = when;
  protected readonly If = If;
}
