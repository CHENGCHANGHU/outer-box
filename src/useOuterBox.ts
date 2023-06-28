import { gene } from '@golden-tiger/regexp-gene';
import { createElement } from '@golden-tiger/dom'

const DefaultOptions: UseOuterBoxOptions = {
  target: null,
  boxWidth: 2,
  boxStyle: 'dashed',
  boxColor: 'red',
};

/**
 * Create outer border box for given target html element.
 * @param options
 * options.target: wrapped html element.
 * options.boxWidth: wrapped box width (default value: 2).
 * options.boxStyle: wrapped box style (default value: 'dashed'. 'solid', 'dashed' and other border style css property).
 * options.boxColor: wrapped box color (default value: 'red').
 * @returns 
 */
export function useOuterBox(options?: UseOuterBoxOptions) {
  let { target, boxWidth, boxStyle, boxColor } = {
    ...DefaultOptions,
    ...options,
  };
  const uid = 'outer-box-' + Date.now() + '-' + gene(/[\w]{10}/);
  const outerBox = createElement({
    tag: 'div',
    attributes: {
      id: uid,
      style: `
        --clip-x: ${boxWidth}px;
        --clip-y: ${boxWidth}px;
        --clip-width: calc(100% - ${boxWidth * 2}px);
        --clip-height: calc(100% - ${boxWidth * 2}px);
        position: absolute;
        z-index: 9999;
        border: ${boxWidth}px ${boxStyle} ${boxColor};
        top: 0;
        left: 0;
        width: 0px;
        height: 0px;
        transform: translate(-${boxWidth}px, -${boxWidth}px);
        clip-path: polygon(
          0 0, 0 100%, var(--clip-x) 100%, var(--clip-x) 0, 0 0,
          var(--clip-x) 0, var(--clip-x) var(--clip-y), 100% var(--clip-y), 100% 0, 0 0,
          calc(var(--clip-x) + var(--clip-width)) 0, calc(var(--clip-x) + var(--clip-width)) 100%, 100% 100%, 100% 0, 0 0,
          var(--clip-x) 0, var(--clip-x) calc(var(--clip-y) + var(--clip-height)), var(--clip-x) 100%, calc(var(--clip-x) + var(--clip-width)) 100%, calc(var(--clip-x) + var(--clip-width)) calc(var(--clip-y) + var(--clip-height)), var(--clip-x) calc(var(--clip-y) + var(--clip-height)), var(--clip-x) 0, 0 0);
      `,
    },
  }) as HTMLElement;

  /**
   * Use new target as target.
   * @param newTarget new target.
   * @returns 
   */
  function setTarget(newTarget?: HTMLElement) {
    if (!newTarget) {
      const _outerBox = document.querySelector(`#${uid}`) as HTMLElement;
      if (_outerBox) {
        _outerBox.remove();
      }
      return;
    }
    target = newTarget;
    update();
  }

  /**
   * Update outer box's top, left, width and height.
   */
  function update() {
    const { left, top, width, height } = target.getBoundingClientRect();

    const _outerBox = document.querySelector(`#${uid}`) as HTMLElement;
    if (!_outerBox) {
      outerBox.style.left = left + 'px';
      outerBox.style.top = top + 'px';
      outerBox.style.width = width + 'px';
      outerBox.style.height = height + 'px';
      document.body.append(outerBox);
    } else {
      _outerBox.style.left = left + 'px';
      _outerBox.style.top = top + 'px';
      _outerBox.style.width = width + 'px';
      _outerBox.style.height = height + 'px';
    }
  }

  if (target) {
    update();
  }

  return {
    outerBox,
    update,
    setTarget,
  };
}

export interface UseOuterBoxOptions {
  target?: HTMLElement,
  boxWidth?: number,
  boxStyle?: string,
  boxColor?: string,
}
