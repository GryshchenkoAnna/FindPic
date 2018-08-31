const PictureItem = (item, isActiveCloseBtn, button) => {
  return (`<li class="list__item" data-id="${item.id}">
      <div class="card">
        <img src="${item.src.tiny}" alt="${item.photographer}" class="card__image">
        ${isActiveCloseBtn ? button : null}
      </div>
    </li>`);
};

export default PictureItem;
