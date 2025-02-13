```Angular&#x20;Template
<ng-milkdown-provider>
    <ng-milkdown-crepe
       [(ngModel)]="value"
       (ngModelChange)="onChange($event)"
       [spinner]="spinner"
       [(loading)]="loading"
       (beforeReady)="beforeReady($event)"
       (onReady)="onReady($event)"
    />
    <ng-template #spinner>
       <spinner/>
    </ng-template>
</ng-milkdown-provider>
```
