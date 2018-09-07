import * as pexels from '../services/api';
import {
  getLocalStorage,
  setLocalStorage
} from '../services/localStorage';

export default class Controller {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    this.init = this.initApp.bind(this);

    view.on('querySearch', value => this.viewPictures(value));
    view.on('removeFromFavorite', id => this.removeFavoritePicture(id));
    view.on('openFavorite', this.openFavorite.bind(this));
    view.on('openModal', id => this.openModal(id));
    view.on('addToFavorite', id => this.addToFavorite(id));
    view.on('checkIdHaveInFavorite', id => this.checkIdHaveInFavorite(id));
    view.on('loadMore', this.loadMorePictures.bind(this));
    view.on('openPrevPicture', id => this.openPrevPicture(id));
    view.on('openNextPicture', id => this.openNextPicture(id));
  }

  initApp () {
    this.model.init(getLocalStorage('favorite'));
    this.view.mainMarkup();
    // if (getLocalStorage === null) return;
    // this.view.init(this.model.init(getLocalStorage('favoritePictures')));
  }

  openNextPicture (id) {
    this.view.openNextPicture(this.model.openNextPicture(id));
  }

  openPrevPicture (id) {
    this.view.openPrevPicture(this.model.openPrevPicture(id));
  }

  addToFavorite (id) {
    this.model.checkIdInFavorite(getLocalStorage('favorite'));
    const result = this.model.addToFavorite(id);
    if (result) {
      setLocalStorage('favorite', result);
    }
  }

  checkIdHaveInFavorite (id) {
    this.view.resultCheckIdInFavorite(
      this.model.checkIdInFavorite(id)
    );
  }

  openModal (id) {
    this.view.modalPhoto(this.model.modalData(id));
  }

  openFavorite () {
    this.view.openFavorite(
      this.model.openFavorite(getLocalStorage('favorite'))
    );
  }

  viewPictures (value) {
    pexels.getByName(value)
      .then(data => this.model.viewFetchedPictures(data, value))
      .then(resolve => this.view.viewFetchedPictures(resolve));
  }

  loadMorePictures () {
    const url = this.model.getNextPage();

    pexels.nextPage(url)
      .then(data => this.model.loadMorePictures(data))
      .then(resolve => this.view.loadMorePictures(resolve));
  }

  getOnePictures (id) {
    pexels.getPhoto(id)
      .then(data => this.model.getOnePictures(data))
      .then(resolve => this.view.modalPicture(resolve));
  }

  removeFavoritePicture (id) {
    setLocalStorage('favorite', this.model.removeFavoritePicture(id));

    this.view.removePictureFromFavorite(id);
  }
}
