```Angular&#x20;Template
<textarea [(ngModel)]="value"></textarea>
<ng-milkdown-provider>
    <ng-milkdown-crepe
       [(ngModel)]="value"
       (ngModelChange)="onChange($event)"
       [spinner]="spinner"
       [(loading)]="loading"
    />
    <ng-template #spinner>
       <spinner/>
    </ng-template>
</ng-milkdown-provider>
```
