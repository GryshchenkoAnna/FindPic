import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, className, handleOnClick, label }) => {
  // eslint-disable-next-line
  console.log(type);
  console.log(label);
  return (
    <button type="button" onClick={handleOnClick} className={className}>
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
