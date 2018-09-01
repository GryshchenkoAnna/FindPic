const Button = ({
  className,
  children,
  type,
  name,
  dataSet
}) => (`
  <button type="${type}" class="${className}" name="${name}" ${dataSet ? `data-action="remove"` : ''}>
    ${children}
  </button>
`);

export default Button;
