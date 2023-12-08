import {AfterViewInit, Directive, Input} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {NgMilkdown} from '../../public-api';
import mermaid from "mermaid";
import {NgProsemirrorNode} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-node.component";

@Directive({
  selector: 'ng-milkdown-diagram',
  standalone: true
})
export class NgMilkdownDiagram extends NgProsemirrorNode implements AfterViewInit {

  @Input() ctx: Ctx;

  action: <T>(action: (ctx: Ctx) => T) => T = (command) => {
    return (this.provider.editor as NgMilkdown).editor.action(command);
  }

  rendering = true;

  override ngAfterViewInit(): void {
    const renderMermaid = async () => {
      const code = this.node.attrs['value'];
      const id = this.node.attrs['identity'];
      if (code.length === 0) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
      });

      const {svg, bindFunctions} = await mermaid.render(id, code);
      bindFunctions?.(this.el.nativeElement);
      this.container.innerHTML = svg;
    }
    requestAnimationFrame(async () => {
      await renderMermaid();
    });
    this.rendering = false;
    super.ngAfterViewInit();
  }

}
