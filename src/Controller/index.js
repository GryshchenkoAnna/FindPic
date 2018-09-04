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

    view.on('add', value => this.viewPictures(value));
    view.on('remove', id => this.removeFavoritePicture(id));
  }

  initApp () {
    if (getLocalStorage === null) return;
    this.view.init(this.model.init(getLocalStorage('favoritePictures')));
  }

  viewPictures (value) {
    // const itUrlHave = this.model.isHaveInBookmarks(value);

    // if (itUrlHave) {
    //   this.view.formReset();
    //   return;
    // }

    pexels.getByName(value)
      .then(data => this.model.viewFetchedPictures(data))
      .then(resolve => this.view.viewFetchedPictures(resolve));
  }

  removePicture (id) {
    this.model.removeFavoritePicture(id, setLocalStorage);
    this.view.removeFavoritePicture(id);
  }
}
