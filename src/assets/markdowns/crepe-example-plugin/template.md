```Angular&#x20;Template
<div id="size"></div>
<ng-milkdown-provider>
    <ng-milkdown-crepe
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
