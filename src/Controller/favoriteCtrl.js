class FavCtrl {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    view.on('add');
  }

  addPicture (value) {

  }

  removePicture (id) {
    this.model.removePicture(id);
    this.view.removePicture(id);
  }
};

export default FavCtrl;
