import EventEmitter from '../services/event-emitter';
import Button from '../Components/shared-ui/button';
import Icon from '../Components/shared-ui/icon.js';

export default class View extends EventEmitter {
  constructor () {
    super();

    this.root = document.querySelector('#root');
    this.searchValue = null;
    this.header = document.createElement('header');
    this.content = document.createElement('section');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.pictures = document.createElement('div');
    this.picturesList = document.createElement('ul');

    this.favWrap = document.createElement('div');
    this.favTitle = document.createElement('h2');
    this.favList = document.createElement('ul');

    this.modal = document.createElement('div');

    this.haveIdInFavorite = null;

    this.form.addEventListener('submit', evt => this.handleQuerySearch(evt));
  }

  viewFetchedPictures (pictures) {
    this.root.parentNode.classList.add('active');

    if (this.content.contains(this.favWrap)) {
      this.content.removeChild(this.favWrap);
    }
    // if (this.pictures.hasChildNodes(this.picturesList)) {
    //   this.picturesList.removeEventListener('click', evt => this.handleClickOnPicture(evt));
    // }

    this.resetPictures();
    this.resetPicturesList();

    this.picturesListMarkup();

    if (pictures.total_results === 0) {
      this.resetPictures();
      this.picturesListMarkup();
      this.picturesList.insertAdjacentElement('beforeend', this.notFound());
    }

    this.form.reset();

    pictures.photos.map(picture =>
      this.picturesList.insertAdjacentElement(
        'beforeend',
        this.createPicturesListItem(picture)
      )
    );

    // this.picturesList.dispatchEvent();
    // this.removeEventListenersFromPicturesList();

    if (this.picturesList.getAttribute('data-listener') !== 'true') {
      this.picturesList.dataset.listener = 'true';

      this.picturesList.addEventListener('click', evt =>
        this.handleClickOnPicture(evt)
      );
    }

    if (pictures.total_results > 12) {
      const loadMore = Button({
        className: 'button-load-more',
        children: 'Load More',
        type: 'button',
        name: 'load-more',
        dataSet: null
      });

      this.pictures.insertAdjacentElement('beforeend', loadMore);
    }
  }

  notFound () {
    const li = document.createElement('li');
    const text = document.createElement('h2');
    li.classList.add('not-found');
    text.textContent = 'Sorry, we are not found image by this query';

    li.insertAdjacentElement('afterbegin', text);
    return li;
  }

  mainMarkup () {
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
      className: 'button-search',
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
    this.form.insertAdjacentElement('beforeend', searchButton);

    this.header.insertAdjacentElement('afterbegin', logoLink);
    this.header.insertAdjacentElement('beforeend', this.form);
    this.header.insertAdjacentElement('beforeend', favoriteButton);

    const favoriteBtnListener = this.header.querySelector(
      '[name="open-favorite"]'
    );
    favoriteBtnListener.addEventListener('click', evt =>
      this.handleOpenFavorite(evt)
    );

    this.content.classList.add('content__section', 'content');

    this.root.insertAdjacentElement('afterbegin', this.header);
    this.root.insertAdjacentElement('beforeend', this.content);
  }

  picturesListMarkup () {
    this.pictures.classList.add('pictures');
    this.picturesList.classList.add('pictures__list');
    this.pictures.insertAdjacentElement('afterbegin', this.picturesList);

    this.content.insertAdjacentElement('beforeend', this.pictures);
  }

  createPicturesListItem (data) {
    const item = document.createElement('li');
    item.classList.add('list__item');
    item.dataset.id = data.id;

    const card = document.createElement('div');
    card.classList.add('card');

    if (this.isActiveCloseBtn) {
      const removeBtn = Button({
        className: 'card__btn',
        children: 'X',
        type: 'button',
        name: 'remove-image',
        dataSet: 'remove'
      });

      card.insertAdjacentElement('afterbegin', removeBtn);
    }

    const image = document.createElement('img');
    image.src = data.src.tiny;
    image.alt = data.photographer;
    image.classList.add('card__image');

    card.insertAdjacentElement('beforeend', image);
    item.insertAdjacentElement('afterbegin', card);

    if (this.isActiveCloseBtn) {
      this.appendEventListnersRemove(item);
    }
    return item;
  }

  openFavorite (data) {
    this.root.parentNode.classList.add('active');

    if (this.content.hasChildNodes(this.pictures)) {
      this.content.removeChild(this.pictures);
    }

    const havePicture = data.length === 0;

    this.favoriteMarkup(havePicture);
  }

  favoriteMarkup (checkData) {
    this.resetFavoriteView();
    this.resetPicturesList();

    this.favWrap.classList.add('favorite__wrapper', 'favorite');

    this.favTitle.textContent = 'Favorite';
    this.favTitle.classList.add('favorite__title');

    this.favWrap.insertAdjacentElement('afterbegin', this.favTitle);

    this.favList.classList.add('pictures__list');

    if (checkData) {
      const text = document.createElement('h3');
      text.textContent = 'You nothing added to favorite';
      this.favWrap.insertAdjacentElement('beforeend', text);
      this.content.insertAdjacentElement('beforeend', this.favWrap);
    }

    // this.createPicturesListItem(data);
    this.favWrap.insertAdjacentElement('beforeend', this.favList);
    this.content.insertAdjacentElement('beforeend', this.favWrap);
  }

  modalPhoto (data) {
    this.modal.classList.add('modal', 'modal__overlay');

    const pictureDetails = document.createElement('div');
    pictureDetails.classList.add('modal__wrap');
    pictureDetails.dataset.id = data.id;

    const image = document.createElement('img');
    image.classList.add('picture__image');
    image.src = data.src.large;
    image.alt = data.photographer;

    console.log(data);

    const control = this.createControllModal(data.id);

    pictureDetails.append(image, control);

    this.modal.insertAdjacentElement('afterbegin', pictureDetails);

    this.content.insertAdjacentElement('afterbegin', this.modal);
  }

  createControllModal (id) {
    const control = document.createElement('div');
    control.classList.add('modal__control');

    console.log(Icon);
    console.log(Icon('star'));
    const btnPreviousPicture = Button({
      className: 'control__btn--prev',
      children: Icon('navigate_before', 'btn-prev'),
      type: 'button',
      name: 'modal-prev',
      dataSet: null
    });

    const btnNextPicture = Button({
      className: 'control__btn--next',
      children: Icon('navigate_next', 'btn-next'),
      type: 'button',
      name: 'modal-next',
      dataSet: null
    });

    const btnAddToFavorite = Button({
      className: 'control__btn--fav',
      children: Icon('star', 'btn-fav'),
      type: 'modal-add-fav',
      name: 'search-submit',
      dataSet: null
    });

    const btnCloseModal = Button({
      className: 'control__btn--close',
      children: Icon('close', 'btn-close'),
      type: 'button',
      name: 'modal-close',
      dataSet: null
    });

    this.emit('checkIdHaveInFavorite', id);

    console.log('before check: ', btnAddToFavorite);

    if (this.haveIdInFavorite) {
      btnAddToFavorite.classList.add('active-fav');
      console.log('after check: ', btnAddToFavorite);
    }
    btnCloseModal.addEventListener('click', evt => this.handleCloseModal(evt));
    btnAddToFavorite.addEventListener('click', evt => this.handleAddToFavorite(evt));

    // Check if Photo have in favorite. If true add class to btn Active;
    // And remove eventListener

    control.append(btnPreviousPicture, btnNextPicture, btnAddToFavorite, btnCloseModal);

    return control;
  }

  resultCheckIdInFavorite (result) {
    this.haveIdInFavorite = result;
  }

  setActiveFavBtnInModal (result) {
    if (result) {
      console.log(this.modal.closest('.btn.close'));
      console.log('add succeful');
    }
  }

  appendEventListnersRemove (item) {
    const removeBtn = item.querySelector('[data-action="remove"]');
    removeBtn.addEventListener('click', this.handleRemove.bind(this));
  }

  handleQuerySearch (evt) {
    evt.preventDefault();

    const {
      value
    } = this.input;

    if (value === '') return;
    this.isActiveCloseBtn = false;
    this.picturesListMarkup();
    this.emit('querySearch', value);
  }

  handleClickOnPicture ({
    target
  }) {
    console.log(target);
    // target.closest('.pictures__list').setAttribute('listener ', 'true');
    const imageId = target.closest('.list__item');
    this.emit('openModal', imageId.dataset.id);
  }

  handleOpenFavorite (evt) {
    evt.preventDefault();
    console.log('open favorite');

    this.isActiveCloseBtn = true;
    this.emit('openFavorite');
  }

  handleCloseModal (evt) {
    evt.preventDefault();
    console.log('node modal after remove from parent: ', this.modalPhoto);
    this.content.removeChild(this.modal);
    this.modal.innerHTML = '';
  }

  handleAddToFavorite (evt) {
    evt.preventDefault();
    console.log(evt);
    evt.target.parentElement.classList.add('active-fav');
    const id = evt.target.closest('.modal__wrap');
    this.emit('addToFavorite', id.dataset.id);
  }

  resetPictures () {
    console.log('reset Pictures');
    // this.pictures.innerHTML = '';
    if (this.pictures.hasChildNodes(this.picturesList)) {
      console.log('if work');
      // this.picturesList.removeEventListener('click', this.handleClickOnPicture());
      // this.pictures.removeChild(this.picturesList);
    }
  }

  resetPicturesList () {
    this.picturesList.innerHTML = '';
  }

  resetFavoriteView () {
    this.favWrap.innerHTML = '';
  }

  handleRemove ({
    target
  }) {
    const parent = target.closest('.list__item');
    this.emit('remove', parent.dataset.id);
  }

  removeEventListenersFromPicturesList () {
    this.picturesList.removeEventListener('click');
  }
  removeFavoritePicture (id) {
    const item = this.picturesList.querySelector(`[data-id="${id}"]`);
    this.pictiresList.removeChild(item);
  }
}
