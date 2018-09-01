import EventEmitter from '../services/event-emitter';
import Button from '../Components/shared-ui/button';

export default class View extends EventEmitter {
  constructor () {
    super();

    this.root = document.querySelector('#root');
    this.searchValue = null;
    this.header = document.createElement('header');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.pictures = document.createElement('div');
    this.picturesList = document.createElement('ul');

    this.form.addEventListener('submit', evt => this.handleAdd(evt));

    this.init = this.init.bind(this);
  }

  viewFetchedPictures (pictures) {
    console.log(pictures);
    if (pictures.total_results === 0) {
      this.root.insertAdjacentElement('beforeend', this.notFound());
    }

    this.picturesListMarkup();

    this.form.reset();

    pictures.photos.map(picture =>
      this.picturesList.insertAdjacentElement('beforeend',
        this.createPicturesListItem(picture)));

    // this.picturesList.appendChild(markupPictures);
    // this.root.insertAdjacentHTML('beforeend', this.picturesList);
  }
  notFound () {
    const text = document.createElement('h2');
    text.classList.add('not-found');
    text.textContent = 'Sorry, we are not found image by this query';
    return text;
  }

  headerMarkup () {
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

    this.input.type = 'text';
    this.input.classList.add('search__input');
    this.input.placeholder = 'Enter search query';

    const searchButton = Button({
      className: 'search__btn button-search',
      children: 'search',
      type: 'submit',
      name: 'search-submit',
      dataSet: null
    });

    // Create button go to favorite
    const favoriteButton = Button({
      className: 'button-favorits',
      children: 'Favorite',
      type: 'button',
      name: 'open-favorite',
      dataSet: null
    });

    // Insert elements in element
    logoTitle.insertAdjacentElement('afterbegin', logoImage);
    logoLink.insertAdjacentElement('afterbegin', logoTitle);

    this.form.insertAdjacentElement('afterbegin', this.input);
    this.form.insertAdjacentHTML('beforeend', searchButton);

    this.header.insertAdjacentElement('afterbegin', logoLink);
    this.header.insertAdjacentElement('beforeend', this.form);
    this.header.insertAdjacentHTML('beforeend', favoriteButton);

    return this.header;
  }

  picturesListMarkup () {
    this.pictures.classList.add('pictures');
    this.picturesList.classList.add('pictures__list');
    this.pictures.insertAdjacentElement('afterbegin', this.picturesList);
    this.root.insertAdjacentElement('beforeend', this.pictures);
  }

  createPicturesListItem (data) {
    const item = document.createElement('li');
    item.classList.add('list__item');
    item.dataset.id = data.id;

    const card = document.createElement('div');
    card.classList.add('card');

    if (this.isActiveCloseBtn) {
      const removeBtn = Button({
        className: 'card__btn btn-close',
        children: 'X',
        type: 'button',
        name: 'remove-image',
        dataSet: 'remove'
      });

      card.insertAdjacentHTML('afterbegin', removeBtn);
    }

    const image = document.createElement('img');
    image.src = data.src.tiny;
    image.alt = data.photographer;
    image.classList.add('card__image');

    card.insertAdjacentElement('beforeend', image);
    item.insertAdjacentElement('afterbegin', card);

    if (this.isActiveCloseBtn) {
      this.appendEventListners(item);
    }
    return item;
  };

  appendEventListners (item) {
    const removeBtn = item.querySelector('[data-action="remove"]');
    removeBtn.addEventListener('click', this.handleRemove.bind(this));
  }

  handleAdd (evt) {
    evt.preventDefault();
    console.log('search submit: ', evt);
    const {
      value
    } = this.input;
    console.log('input value: ', value);
    if (value === '') return;
    this.isActiveCloseBtn = false;
    this.picturesListMarkup();
    this.emit('add', value);
  }

  handleOpenFavorite (evt) {
    evt.preventDefault();
    console.log('open favorite');

    this.isActiveCloseBtn = true;
  }

  resetPicturesList () {
    this.picturesList.removeChild();
  }

  handleRemove ({
    target
  }) {
    const parent = target.closest('.list__item');
    this.emit('remove', parent.dataset.id);
  }

  removeFavoritePicture (id) {
    const item = this.picturesList.querySelector(`[data-id="${id}"]`);
    this.pictiresList.removeChild(item);
  }

  init (favoritePictures) {
    this.root.append(this.headerMarkup());
    // const elements = bookmarks.map(bookmark => this.createBookmark(bookmark));

    // this.bookmarksList.append(...elements);
  }
}
