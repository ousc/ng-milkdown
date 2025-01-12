import {Component} from "@angular/core";
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgTemplateOutlet} from "@angular/common";
import {AppService} from "../app.service";
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";

interface MenuItem {
  title: string;
  routerLink?: string;
  children?: MenuItem[]
  isLeaf: boolean;
}

@Component({
  selector: 'ng-milkdown-layout',
  template: `
      <div class="flex h-full">
          <div [class]="collapsed ? 'w-0' : 'w-full md:w-1/4'"
               class="h-full border-r border-nord4 dark:divide-gray-600 dark:border-gray-600 overflow-hidden">
              <div class="flex justify-end h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
                  <div class="flex items-center justify-center ml-4">
                      <img src="/assets/milkdownLogo.png" class="h-4" alt="ng-milkdown"/>
                  </div>
                  <div class="flex h-10 w-full cursor-pointer items-center justify-center border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
                      <span class="material-symbols-outlined !text-base cursor-pointer select-none">
                        TRANSLATE
                      </span>
                      <span (click)="language = 'en'" class="ml-2" [class.active]="language == 'en'">English</span>
                      @if (language == 'zh-CN') {
                          <span (click)="language = 'en'"
                                class="material-symbols-outlined !text-base cursor-pointer select-none">
                              SWAP_HORIZ
                          </span>
                      }
                      <span class="ml-2 w-1 h-6 border-l border-nord4 dark:divide-gray-600 dark:border-gray-600"></span>
                      <span (click)="language = 'zh-CN'" class="ml-2" [class.active]="language == 'zh-CN'">中文</span>
                      @if (language == 'en') {
                          <span (click)="language = 'zh-CN'"
                                class="material-symbols-outlined !text-base cursor-pointer select-none">
                              SWAP_HORIZ
                          </span>
                      }
                  </div>
                  <ng-container *ngTemplateOutlet="button"></ng-container>
              </div>
              @for (item of menus;track item) {
                  @if (item.isLeaf) {
                      <ng-container *ngTemplateOutlet="menu; context: { data: item }"></ng-container>
                  } @else {
                      <div class="flex h-10 w-full cursor-pointer items-center px-4 border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
                          <span class="material-symbols-outlined !text-base">FOLDER_OPEN</span>
                          <span class="ml-2 text-md">{{ item.title | transloco }}</span>
                      </div>
                      @for (data of item.children;track data) {
                          <ng-container *ngTemplateOutlet="menu; context: { data: data }"></ng-container>
                      }
                  }
              }
          </div>
          <div [class]="collapsed ? 'w-full' : 'w-0 md:w-3/4'" class="h-full">
              <router-outlet/>
          </div>
      </div>
      @if (collapsed && !embed) {
          <div class="fixed top-1/2 left-0 -translate-y-1/2 border border-nord4">
              <ng-container *ngTemplateOutlet="button"></ng-container>
          </div>
      }

      <ng-template #button>
          <div class="dark:divide-gray-600 dark:border-gray-600 w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-100"
               (click)="collapsed = !collapsed">
                <span class="material-symbols-outlined !text-base">
                      {{ collapsed ? 'menu' : 'menu_open' }}
                </span>
          </div>
      </ng-template>

      <ng-template #menu let-data="data">
          <div class="p-4 text-gray-600 text-sm">
              <a class="flex items-center cursor-pointer" routerLinkActive="active" [routerLink]="data.routerLink">
                  <span class="material-symbols-outlined !text-base">MARKDOWN</span>
                  <span class="ml-2">{{ data.title | transloco }}</span>
              </a>
          </div>
      </ng-template>
  `,
  styles: `
  .active {
    @apply text-indigo-800
  }

  .hidden {
    display: none;
  }
  `,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    NgTemplateOutlet,
    TranslocoPipe
  ],
  standalone: true
})
export class LayoutComponent {
  embed = false;
  constructor(
    public appService: AppService,
    private translocoService: TranslocoService,
    private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((params) => {
      if(params.embed) {
        this.collapsed = true;
        this.embed = true;
      }
    })
  }
  collapsed = false;

  menus: MenuItem [] = [
    {
      title: 'menu.overview',
      routerLink: '/overview',
      isLeaf: true
    },
    {
      title: 'menu.using_crepe',
      children: [
        {
          title: 'menu.ng_milkdown_crepe',
          routerLink: '/ng-milkdown-crepe',
          isLeaf: true
        },
      ],
      isLeaf: false
    },
    {
      title: "ng-milkdown",
      children: [
        {
          title: 'Work Ground',
          routerLink: '/work-ground',
          isLeaf: true
        }
      ],
      isLeaf: false
    },
    {
      title: "components",
      children: [
        {
          title: 'Work Ground',
          routerLink: '/work-ground',
          isLeaf: true
        }
      ],
      isLeaf: false
    },
  ];

  get language() {
    return this.appService.language;
  }

  set language(lang: string) {
    this.appService.language = lang;
    this.translocoService.setActiveLang(lang);
    window.location.reload();
  }
}
