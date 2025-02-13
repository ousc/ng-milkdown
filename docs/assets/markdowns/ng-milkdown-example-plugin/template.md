```angular-html
<div id="size"></div>
<ng-milkdown-provider>
    <ng-milkdown
       [(ngModel)]="value"
       (ngModelChange)="onChange($event)"
       [spinner]="spinner"
       [(loading)]="loading"
       [plugins]="plugins"
    />
    <ng-template #spinner>
       <spinner/>
    </ng-template>
</ng-milkdown-provider>
```
