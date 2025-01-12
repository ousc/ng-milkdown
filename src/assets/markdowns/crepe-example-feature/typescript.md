```typescript
import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownProvider, NgMilkdownCrepe} from "ng-milkdown";
import {Spinner} from "./spinner.component";
import {BlockEditFeatureConfig} from "@milkdown/crepe/lib/types/feature/block-edit";
import {CrepeFeatureConfig} from "@milkdown/crepe/lib/types/feature";
import {Crepe} from "@milkdown/crepe";

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

    features = {
        [Crepe.Feature.CodeMirror]: false
    }

    featureOptions = {
        [Crepe.Feature.BlockEdit]: {
            "slashMenuTextGroupLabel": "xxx_1",
            "slashMenuListGroupLabel": "xxx_1",
            "slashMenuAdvancedGroupLabel": "xxx_1",
            ...xxx
        }
    }
}
```
