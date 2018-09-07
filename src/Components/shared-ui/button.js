const Button = ({
  className,
  children,
  type,
  name,
  dataSet
}) => {
  const button = document.createElement('button');

  button.type = type;
  button.name = name;
  button.classList.add(`${className}`);
  button.insertAdjacentHTML('afterbegin', children);

  if (dataSet) {
    button.dataset.action = dataSet;
  }

  return button;
};

export default Button;
