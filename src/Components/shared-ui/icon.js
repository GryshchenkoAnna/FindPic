import svgSprite from './symbol-defs.svg';

const Icon = (name, className) => (
  `<svg class="icon ${className}">
    <use xlink:href="${svgSprite}#icon-${name}">
    </use>
  </svg>`
);

export default Icon;
