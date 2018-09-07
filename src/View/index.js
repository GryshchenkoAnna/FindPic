import EventEmitter from '../services/event-emitter';
import Button from '../Components/shared-ui/button';
import Icon from '../Components/shared-ui/icon';
import logo from '../Components/image/logo.png';

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
    this.isActiveRemoveBtn = false;

    this.form.addEventListener('submit', evt => this.handleQuerySearch(evt));
  }

  viewFetchedPictures (pictures) {
    this.header.classList.add('active');

    if (this.content.contains(this.favWrap)) {
      this.content.removeChild(this.favWrap);
    }

    this.pictures.classList.add('pictures');
    this.picturesList.classList.add('pictures__list');
    this.pictures.insertAdjacentElement('afterbegin', this.picturesList);

    this.content.insertAdjacentElement('beforeend', this.pictures);

    if (pictures.total_results === 0) {
      this.resetPictures();

      this.picturesList.insertAdjacentElement('beforeend', this.notFound());
      this.pictures.classList.add('pictures');
      this.picturesList.classList.add('pictures__list');
      this.pictures.insertAdjacentElement('afterbegin', this.picturesList);

      this.content.insertAdjacentElement('beforeend', this.pictures);
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

      loadMore.addEventListener('click', evt => this.handleLoadMore(evt));
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
    logoImage.src = logo;
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

  loadMorePictures (data) {
    data.forEach(picture =>
      this.picturesList.insertAdjacentElement(
        'beforeend',
        this.createPicturesListItem(picture)
      )
    );
  }

  createPicturesListItem (data) {
    const item = document.createElement('li');
    item.classList.add('list__item');
    item.dataset.id = data.id;

    const card = document.createElement('div');
    card.classList.add('card');

    if (this.isActiveRemoveBtn) {
      const removeBtn = Button({
        className: 'card__btn',
        children: 'X',
        type: 'button',
        name: 'remove-image',
        dataSet: 'remove'
      });

      removeBtn.addEventListener('click', evt =>
        this.handleRemove(evt)
      );

      card.insertAdjacentElement('afterbegin', removeBtn);
    }

    const image = document.createElement('img');
    image.src = data.src.tiny;
    image.alt = data.photographer;
    image.classList.add('card__image');

    card.insertAdjacentElement('beforeend', image);
    item.insertAdjacentElement('afterbegin', card);

    return item;
  }

  openFavorite (data) {
    this.header.classList.add('active');

    if (this.content.hasChildNodes(this.pictures)) {
      this.content.removeChild(this.pictures);
    }

    this.favList.innerHTML = '';
    this.favWrap.innerHTML = '';
    const havePicture = data.length === 0;

    this.favoriteMarkup(havePicture, data);
  }

  favoriteMarkup (checkData, data) {
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
    if (!checkData) {
      data.forEach(picture =>
        this.favList.insertAdjacentElement(
          'afterbegin',
          this.createPicturesListItem(picture)
        )
      );
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

    const control = this.createControllModal(data.id);

    pictureDetails.append(image, control);

    this.modal.insertAdjacentElement('afterbegin', pictureDetails);

    this.content.insertAdjacentElement('afterbegin', this.modal);
  }

  createControllModal (id) {
    const control = document.createElement('div');
    control.classList.add('modal__control');

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

    if (this.haveIdInFavorite) {
      btnAddToFavorite.firstChild.classList.add('active-fav');
    }

    btnCloseModal.addEventListener('click', evt =>
      this.handleCloseModal(evt)
    );
    btnAddToFavorite.addEventListener('click', evt =>
      this.handleAddToFavorite(evt)
    );
    btnPreviousPicture.addEventListener('click', evt =>
      this.handleOpenPrevPicture(evt)
    );
    btnNextPicture.addEventListener('click', evt =>
      this.handleOpenNextPicture(evt)
    );

    control.append(
      btnPreviousPicture,
      btnNextPicture,
      btnAddToFavorite,
      btnCloseModal
    );

    return control;
  }

  openNextPicture (data) {
    const selectPictureDetailsNode = this.modal.firstChild;
    const selectPictureNode = this.modal.firstChild.firstChild;

    selectPictureDetailsNode.removeChild(selectPictureNode);

    selectPictureDetailsNode.dataset.id = data.id;

    const image = document.createElement('img');
    image.classList.add('picture__image');
    image.src = data.src.large;
    image.alt = data.photographer;

    selectPictureDetailsNode.insertAdjacentElement('afterbegin', image);
  }

  openPrevPicture (data) {
    const selectPictureDetailsNode = this.modal.firstChild;
    const selectPictureNode = this.modal.firstChild.firstChild;

    selectPictureDetailsNode.removeChild(selectPictureNode);

    selectPictureDetailsNode.dataset.id = data.id;

    const image = document.createElement('img');
    image.classList.add('picture__image');
    image.src = data.src.large;
    image.alt = data.photographer;

    selectPictureDetailsNode.insertAdjacentElement('afterbegin', image);
  }

  resultCheckIdInFavorite (result) {
    this.haveIdInFavorite = result;
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
    this.resetPictures();
    this.resetPicturesList();
    this.isActiveCloseBtn = false;
    this.isActiveRemoveBtn = false;

    this.emit('querySearch', value);
  }

  handleClickOnPicture ({
    target
  }) {
    const imageId = target.closest('.list__item');
    this.emit('openModal', imageId.dataset.id);
  }

  handleOpenFavorite (evt) {
    evt.preventDefault();

    if (this.content.firstChild === this.favWrap) return;

    this.resetFavoriteView();
    this.resetPicturesList();

    this.isActiveRemoveBtn = true;

    this.emit('openFavorite');
  }

  handleCloseModal (evt) {
    evt.preventDefault();

    this.content.removeChild(this.modal);
    this.modal.innerHTML = '';
  }

  handleAddToFavorite (evt) {
    evt.preventDefault();

    evt.target.parentElement.classList.add('active-fav');

    const id = evt.target.closest('.modal__wrap');

    this.emit('addToFavorite', id.dataset.id);
  }

  handleLoadMore (evt) {
    evt.preventDefault(evt);

    this.emit('loadMore');
  }

  handleOpenPrevPicture (evt) {
    evt.preventDefault();

    const id = evt.target.closest('.modal__wrap');

    this.emit('openPrevPicture', id.dataset.id);
  }

  handleOpenNextPicture (evt) {
    evt.preventDefault();

    const id = evt.target.closest('.modal__wrap');

    this.emit('openNextPicture', id.dataset.id);
  }

  resetPictures () {
    this.pictures.innerHTML = '';
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
    this.emit('removeFromFavorite', parent.dataset.id);
  }

  removePictureFromFavorite (id) {
    const item = this.favList.querySelector(`[data-id="${id}"]`);

    this.favList.removeChild(item);
  }
}
