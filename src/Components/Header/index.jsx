import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../shared-ui/Button';
import SearchForm from '../Search-form';
// TODO:
// isActive ${props => (props.isActiveApp ? 'box-shadow: 0px 0px 10px 0px #000;' : 'null')}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${props => (props.isActiveApp ? '30px' : '405px')};
  z-index: 50;
  background-color: #fff;
  background-size: 100% 100%;
  padding-top: ${props => (props.isActiveApp ? '30px' : '220px')};
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Link = styled.a`
  display: block;
  text-decoration: none;
  margin: auto;
  width: 302px;
  margin-bottom: 46px;
`;

const LogoTitle = styled.h1`
  margin: 0;
  padding: 0;
`;

const FavoriteBtn = styled(Button)`
  position: fixed;
  top: 4%;
  right: 12%;
  font-size: 16px;
  font-family: 'Roboto';
  color: rgb(103, 58, 183);
  line-height: 1.688;
  text-align: right;

  &:hover {
    color: rgb(148, 179, 63);
  }

  &::before {
    content: '\\2605';
    font-size: 20px;
    margin-right: 4px;
  }
`;

const Header = ({ onChangeForm, handleOnSubmit, isActiveApp }) => {
  console.log(isActiveApp);
  return (
    <StyledHeader isActive={isActiveApp}>
      <Link href="index.html">
        <LogoTitle>
          <img src="./assets/image/logo.png" alt="FindPic Logo" />
        </LogoTitle>
      </Link>
      <SearchForm onChange={onChangeForm} onClick={handleOnSubmit} />
      <FavoriteBtn label="Favorite" />
    </StyledHeader>
  );
};

Header.propTypes = {
  isActiveApp: PropTypes.bool.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

export default Header;
