const PictureItem = (item, isActiveCloseBtn, button) => {
  return (`<li class="list__item" data-id="${item.id}">
      <div class="card">
        ${isActiveCloseBtn ? button : null}
        <img src="${item.src.tiny}" alt="${item.photographer}" class="card__image">
      </div>
    </li>`);
};

export default PictureItem;
