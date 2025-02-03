```typescript
import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownProvider, NgMilkdownCrepe} from "ng-milkdown";
import {Spinner} from "./spinner.component";
import {sizePlugin} from "./size.component";

@Component({
  selector: 'crepe-example-plugin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdownCrepe, NgMilkdownProvider, Spinner],
  templateUrl: './crepe-example-basic.component.html',
})
export class CrepeExamplePluginComponent implements OnInit {
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

  plugins = [imageInlineComponent, sizePlugin]
}
```
