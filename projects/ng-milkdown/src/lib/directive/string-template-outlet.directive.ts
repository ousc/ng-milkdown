/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[stringTemplateOutlet]',
  exportAs: 'stringTemplateOutlet',
  standalone: true,
})
export class StringTemplateOutletDirective<_T = unknown> implements OnChanges {
  private embeddedViewRef: EmbeddedViewRef<any> | null = null;
  private context = new StringTemplateOutletContext();
  @Input() stringTemplateOutletContext: any | null = null;
  @Input() stringTemplateOutlet: any | TemplateRef<any> = null;

  static ngTemplateContextGuard<T>(
    _dir: StringTemplateOutletDirective<T>,
    _ctx: any
  ): _ctx is StringTemplateOutletContext {
    return true;
  }

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.stringTemplateOutlet instanceof TemplateRef;
    const templateRef = (isTemplateRef ? this.stringTemplateOutlet : this.templateRef) as any;
    this.embeddedViewRef = this.viewContainer.createEmbeddedView(
      templateRef,
      isTemplateRef ? this.stringTemplateOutletContext : this.context
    );
  }

  private updateContext(): void {
    const isTemplateRef = this.stringTemplateOutlet instanceof TemplateRef;
    const newCtx = isTemplateRef ? this.stringTemplateOutletContext : this.context;
    const oldCtx = this.embeddedViewRef!.context as any;
    if (newCtx) {
      for (const propName of Object.keys(newCtx)) {
        oldCtx[propName] = newCtx[propName];
      }
    }
  }

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {stringTemplateOutletContext, stringTemplateOutlet} = changes;
    const shouldRecreateView = (): boolean => {
      let shouldOutletRecreate = false;
      if (stringTemplateOutlet) {
        if (stringTemplateOutlet.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutletTemplate = stringTemplateOutlet.previousValue instanceof TemplateRef;
          const isCurrentOutletTemplate = stringTemplateOutlet.currentValue instanceof TemplateRef;
          shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
        }
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate =
        stringTemplateOutletContext && hasContextShapeChanged(stringTemplateOutletContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };

    if (stringTemplateOutlet) {
      this.context.$implicit = stringTemplateOutlet.currentValue;
    }

    const recreateView = shouldRecreateView();
    if (recreateView) {
      /** recreate view when context shape or outlet change **/
      this.recreateView();
    } else {
      /** update context **/
      this.updateContext();
    }
  }
}

export class StringTemplateOutletContext {
  public $implicit: any;
}
