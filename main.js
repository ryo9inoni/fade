/***
 * @param {String}  type フェードの種類[in, out]
 * @param {Element} element 要素[dom]
 * @param {Number}  duration 変化の時間[transition]
 * @param {String}  easing 変化の速度[transition]
***/

/*** example ***
 * const html = document.querySelector('html');
 * Fade('in', html, 300, 'ease-out');
***/

const Fade = (type = '', element = null, duration = 0, easing = '') => {
  
  let flag = true;
  const result = type == 'in' ? 'block' : '0';

  switch (type) {
    case 'in':
      element.style.display = result;
      break;
    case 'out':
      element.style.transition = duration + 'ms ' + easing;
      element.style.opacity = result;
      break;
  }

  const tick = () => {
    
    const property = type == 'in' ? 'display' : 'opacity';
    const style = window.getComputedStyle(element);
    const value = style.getPropertyValue(property);

    switch (type) {
      case 'in':
        if (result == value) {
          element.style.transition = duration + 'ms ' + easing;
          element.style.opacity = '1';
          flag = false;
        }
        break;
      case 'out':
        if (result == value) {
          element.style.display = 'none';
          flag = false;
        }
        break;
    }

    if (flag) window.requestAnimationFrame(tick);
    
  };
  tick();

}