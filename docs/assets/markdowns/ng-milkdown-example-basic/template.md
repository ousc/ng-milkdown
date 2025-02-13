```angular-html
<div class="flex">
  <code-editor class="flex-1" [(ngModel)]="value"/>
  <ng-milkdown-provider class="flex-1">
      <ng-milkdown
         [(ngModel)]="value"
         (ngModelChange)="onChange($event)"
         [spinner]="spinner"
         [(loading)]="loading"
      />
      <ng-template #spinner>
         <spinner/>
      </ng-template>
  </ng-milkdown>
</div>
```
