const picturesDB = {
  pictures: [461198, 54455, 5938, 5317],
  getPictures: () => this.pictures,
};

export const add = (value) => {
  const {
    pictures
  } = picturesDB;
  const prevStatePictures = picturesDB.pictures;
  pictures(...value, ...prevStatePictures);
};

export const get = () => {
  picturesDB.pictures
};

export const removePic = (id) => {
  const {
    pictures
  } = picturesDB;

  pictures.filter(picture => picture.id !== id);
}
