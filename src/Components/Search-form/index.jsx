import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../shared-ui/Button';

const StyledButton = styled(Button)`
  border-radius: 20px;
  padding: 8px 20px;
  text-transform: uppercase;
  background-color: rgb(148, 179, 63);
  color: #fff;

  &:hover {
    background-color: rgb(32, 145, 88);
    box-shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
  }
`;

const Form = styled.form`
  min-width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  background-color: rgb(252, 252, 252);
  border-radius: 20px;
  border: 2px solid #928989;
  padding: 5px 20px;
  margin-right: 20px;
  width: 100%;
  outline: none;

  &:focus {
    background-color: #ace7b4;
  }
`;

const SearchForm = ({ value, onChange, onClick }) => (
  <Form action="">
    <Input
      type="text"
      name="search"
      placeholder="Enter search query"
      onChange={onChange}
      value={value}
    />
    <StyledButton type="submit" onClick={onClick} label="Search" />
  </Form>
);

SearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchForm;
