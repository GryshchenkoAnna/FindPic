import './pictures-items.scss';

const PicturesItems = (data, isActiveCloseBtn, button) => {
  // TODO:
  // This function must returned markup of Pictures List whith getting data
  // - [x] create items list;
  // - [-] variable to store created markup;
  // - [+] this variable return;
  return data.map(item => (
    `<li class="list__item" data-id="${item.id}">
      <div class="card">
        <img src="${item.src.tiny}" alt="${item.photographer}" class="card__image">
        ${isActiveCloseBtn ? button : null}
      </div>
    </li>`
  ));
};

export default PicturesItems;
