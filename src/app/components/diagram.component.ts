import {AfterViewInit, Component, Input} from '@angular/core';
import {
  NgProsemirrorNode
} from "../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-node.component";
import {Ctx} from "@milkdown/ctx";
import mermaid from "mermaid";
import {actionFactory} from "../../../projects/ng-milkdown/src/lib/actionFactory";

@Component({
  selector: 'diagram',
  template: `
      <div class="border-2 border-gray-300 rounded-md p-2 flex justify-center items-center hover:bg-gray-100"></div>
  `,
  styles:[`

  `],
  standalone: true
})
export class Diagram extends NgProsemirrorNode implements AfterViewInit {

  @Input() ctx: Ctx;

  get action() {
    return actionFactory(this.provider.editor)
  };

  override get container(): any {
    return super.container.children[0];
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
