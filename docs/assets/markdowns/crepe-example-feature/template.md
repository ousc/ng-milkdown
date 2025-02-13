```Angular&#x20;Template
<ng-milkdown-provider>
    <ng-milkdown-crepe
       [(ngModel)]="value"
       (ngModelChange)="onChange($event)"
       [spinner]="spinner"
       [(loading)]="loading"
       [features]="features"
       [featureOptions]="featureOptions"
    />
    <ng-template #spinner>
       <spinner/>
    </ng-template>
</ng-milkdown-provider>
```
