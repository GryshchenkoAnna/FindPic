class FavModel {
  constructor(pictures = []) {
    this.pictures = pictures;
  }

  removePicture(id, localStorage) {
    this.pictures = this.pictures.filter(picture => picture.id !== id);
    localStorage('pictures', this.pictures);
  }
};

export default FavModel;
