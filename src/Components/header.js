import Button from './shared-ui/button';

// {
//   /* <header class="header">
//       <a href="#" class="header__logo--link logo">
//         <h1 class="logo__title">
//           <img src="../img/logo.png" class="logo__image" alt="logo">
//         </h1>
//       </a>
//       <form class="header__form search js-search-form">
//         <input type="text" class="search__input" placeholder="Enter search query">
//       </form>
//     </header> */
// }

export default class Header {
  constructor () {
    this.searchValue = null;
    this.header = document.createElement('header');
    this.form = document.createElement('form');
  }

  createMarkup () {
    // Header adding style
    this.header.classList.add('header');
    // Create Logo
    const logoLink = document.createElement('a');
    logoLink.href = 'index.html';
    logoLink.classList.add('header__logo--link', 'logo');
    // Create Header logo title
    const logoTitle = document.createElement('h1');
    logoTitle.classList.add('logo__title');
    // Create Header logo image
    const logoImage = document.createElement('img');
    logoImage.src = '../img/logo.png';
    logoImage.classList.add('logo__image');
    logoImage.alt = 'FindPic Logo';

    // Create Form to start search some pictures
    this.form.classList.add('search', 'header__form');

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('search__input');
    input.placeholder = 'Enter search query';

    const button = Button('search__btn button-search', 'search', 'submit', 'search-submit');
    console.log(button);
  }

  getInputValue () {
    return this.searchValue;
  }
}
