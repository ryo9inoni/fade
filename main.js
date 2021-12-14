/***
 * @param {String}  type フェードの種類[in, out]
 * @param {Element} element 要素[dom]
 * @param {Number}  duration 変化の時間 [css transition-duration: 0000ms]
 * @param {String}  easing 変化の速度 [css transition-timing-function: easing]
***/

/*** example ***
 * const html = document.querySelector('html');
 * FADE('in', html, 300, 'ease-out');
***/

const FADE = (type= '', element= null, duration= 0, easing= '') => {
  
  let flag = true;
  const valueFirst = type == 'in' ? 'block' : '0';
  const valueLast = type == 'in' ? '1' : 'none';
  const transition = () => {
    element.style.transitionDuration = duration+'ms';
    element.style.transitionTimingFunction = easing;  
  }

  switch (type) {
    case 'in':
      element.style.display = valueFirst;
      break;
    case 'out':
      transition();
      element.style.opacity = valueFirst;
      break;
  }

  const tick = () => {
    const property = type == 'in' ? 'display' : 'opacity';
    const style = window.getComputedStyle(element);
    const value = style.getPropertyValue(property);

    switch (type) {
      case 'in':
        if (valueFirst == value) {
          transition();
          element.style.opacity = valueLast;
          flag = false;
        }
        break;
      case 'out':
        if (valueFirst == value) {
          element.style.display = valueLast;
          flag = false;
        }
        break;
    }

    if (flag) window.requestAnimationFrame(tick);
    
  };
  tick();

}

export default FADE;