import {Component} from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
      <div class="flex h-full w-full items-center justify-center">
            <span class="spinner">
                <span class="spinner-before"></span>
                <span class="spinner-after"></span>
            </span>
      </div>`,
  styles:[
    `
      .spinner {
        display: inherit;
        position: relative;
        width: 50px;
        height: 50px;
        transform: rotate(165deg);
      }

      .spinner span {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
      }

      .spinner-before {
        animation: 2s ease 0s infinite normal none running spinners-HashLoader-before;
      }

      .spinner-after {
        animation: 2s ease 0s infinite normal none running spinners-HashLoader-after;
      }

      @keyframes spinners-HashLoader-before {
        0% {
          width: 10px;
          box-shadow: rgb(129, 161, 193, 0.75) 20px -10px, rgb(129,161,193, 0.75) -20px 10px;
        }
        35% {
          width: 50px;
          box-shadow: rgb(129, 161, 193, 0.75) 0px -10px, rgb(129, 161, 193, 0.75) 0px 10px;
        }
        70% {
          width: 10px;
          box-shadow: rgb(129,161,193, 0.75) -20px -10px, rgb(129, 161, 193, 0.75) 20px 10px;
        }
        100% {
          box-shadow: rgb(129, 161, 193, 0.75) 20px -10px, rgb(129,161,193, 0.75) -20px 10px;
        }
      }

      @keyframes spinners-HashLoader-after {
        0% {
          height: 10px;
          box-shadow: rgb(129, 161, 193) 10px 20px, rgb(129,161,193) -10px -20px;
        }
        35% {
          height: 50px;
          box-shadow: rgb(129, 161, 193) 10px 0px, rgb(129,161,193) -10px 0px;
        }
        70% {
          height: 10px;
          box-shadow: rgb(129, 161, 193) 10px -20px, rgb(129,161,193) -10px 20px;
        }
        100% {
          box-shadow: rgb(129, 161, 193) 10px 20px, rgb(129,161,193) -10px -20px;
        }
      }
    `
  ],
  standalone: true
})
export class Spinner {
}
