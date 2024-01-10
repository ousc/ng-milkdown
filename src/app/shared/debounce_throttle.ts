export function debounce(fn: Function, delay = 800, ...args: any[]) {
  // @ts-ignore
  let context = this;
  if (timer !== null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    fn.apply(context, args);
    timer = null
  }, delay)
}


let timer: number = null;
let startTime = Date.now();

export function throttle(fn: Function, wait = 800, ...args: any[]) {
  let curTime = Date.now();
  let remaining = wait - (curTime - startTime);
  // @ts-ignore
  let context = this;

  clearTimeout(timer);

  if (remaining <= 0) {
    fn.apply(context, args);
    startTime = Date.now();
  } else {
    timer = setTimeout(()=>{
      fn.apply(context, args);
    }, remaining);  // 如果小于wait 保证在差值时间后执行
  }
}
