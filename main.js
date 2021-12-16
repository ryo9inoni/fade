/***
 * @param {String}  type フェードの種類[in, out]
 * @param {Element} element 要素[dom]
 * @param {Number}  duration 変化の時間 [css transition-duration: 0000ms]
 * @param {String}  easing 変化の速度 [css transition-timing-function: easing]
 * 
 * *** example ***
 * const html = document.querySelector('html');
 * FADE('in', html, 300, 'ease-out');
***/


お

const FADE = (type = '', element = null, duration = 0, easing = '') => {
  
  // propertyValue
  const valueFirst = type == 'in' ? 'block' : '0';
  const valueLast = type == 'in' ? '1' : 'none';
  const property = type == 'in' ? 'display' : 'opacity';
  
  // transitionStyle
  const transition = () => {
    element.style.transitionDuration = duration+'ms';
    element.style.transitionTimingFunction = easing;
  }

  // styleFirst
  switch (type) {
    case 'in':
      element.style.display = valueFirst;
      break;
    case 'out':
      transition();
      element.style.opacity = valueFirst;
      break;
  }

  //　styleを監視
  const tick = () => { 
    
    // style, propertyValueを取得
    const style = window.getComputedStyle(element);
    const value = style.getPropertyValue(property);
    
    // styleLast
    switch (type) {
      case 'in':
        if (valueFirst == value) {
          transition();
          element.style.opacity = valueLast;
        }
        break;
      case 'out':
        if (valueFirst == value) {
          element.style.display = valueLast;
        }
        break;
    }

    // valueFirstとvalueが同じ値になるまで間、styleを監視
    if (valueFirst !== value) {
      window.requestAnimationFrame(tick);
    }
    
  };
  tick();

}

export default FADE;