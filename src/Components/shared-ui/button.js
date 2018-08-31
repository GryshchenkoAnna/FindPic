const Button = (className, children, type, name) => (`
  <button type="${type}" class="${className}" name="${name}" >
    ${children}
  </button>
`);

export default Button;
