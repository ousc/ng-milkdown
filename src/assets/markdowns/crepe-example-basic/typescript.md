```typescript
import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownProvider, NgMilkdownCrepe} from "ng-milkdown";
import {Spinner} from "./spinner.component";

@Component({
  selector: 'crepe-example-basic',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, NgMilkdownProvider, Spinner],
  templateUrl: './crepe-example-basic.component.html',
})
export class CrepeExampleBasicComponent {
  constructor(private http: HttpClient) {
  }

  value: string = 'hello, ng-milkdown!';
  loading = true;

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }
}
```
