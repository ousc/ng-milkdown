```typescript
import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownProvider, NgMilkdownCrepe, NgMilkdownCrepeEditor} from "ng-milkdown";
import {Spinner} from "./spinner.component";
import {editorViewCtx} from "@milkdown/core";
import {insert} from "@milkdown/kit/utils";

@Component({
  selector: 'crepe-example-basic',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, NgMilkdownProvider, Spinner],
  templateUrl: './crepe-example-basic.component.html',
})
export class CrepeExampleBasicComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  value: string;
  loading = true;

  ngOnInit(): void {
    this.http.get('assets/markdowns/overview.md', {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    })
  }

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }
  
  beforeReady({crepe, provider}: NgMilkdownCrepeEditor) {
    crepe.setReadonly(false);
    console.log('crepe ready!', {crepe, provider})
  }
  
  onReady({crepe, provider}: NgMilkdownCrepeEditor) {
    crepe.editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      ctx.get(editorViewCtx).state.selection = new TextSelection(view.state.doc.resolve(0));
    })
    crepe.editor.action(insert("# Welcome to ~~NgMilkdown~~ NgMilkdownCrepe!"));
    crepe.setReadonly(true);
  }
}
```
