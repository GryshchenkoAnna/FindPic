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
  }

  initApp () {
    this.view.mainMarkup();
    // if (getLocalStorage === null) return;
    // this.view.init(this.model.init(getLocalStorage('favoritePictures')));
  }

  addToFavorite (id) {
    this.view.setActiveFavBtnInModal(this.model.addToFavorite(id));
  }

  checkIdHaveInFavorite (id) {
    this.view.resultCheckIdInFavorite(this.model.checkIdInFavorite(id));
  }

  openModal (id) {
    console.log(id);
    this.view.modalPhoto(this.model.modalData(id));
  }

  openFavorite () {
    this.view.openFavorite(this.model.init());
  }

  viewPictures (value) {
    pexels.getByName(value)
      .then(data => this.model.viewFetchedPictures(data, value))
      .then(resolve => this.view.viewFetchedPictures(resolve));
  }

  getOnePictures (id) {
    pexels.getPhoto(id)
      .then(data => this.model.getOnePictures(data))
      .then(resolve => this.view.modalPicture(resolve));
  }

  removePicture (id) {
    this.model.removeFavoritePicture(id, setLocalStorage);
    this.view.removeFavoritePicture(id);
  }
}
