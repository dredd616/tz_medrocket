// Переключение активной кнопки меню
export const navMenu = {
    makeActive: (buttonName) => {
        const button = document.getElementById(`menu-button-${buttonName}`);
        button.classList.add('menu__item_active');

        const buttons = document.querySelectorAll('.menu__item');
        buttons.forEach((button) => {
            if (button.id !== `menu-button-${buttonName}`) {
                button.classList.remove('menu__item_active');
            }
        });
    }
}

// Переключение свойства 'checked'
export const toggleChecked = (element) => {
    element.checked = !element.checked
}


// Создаём фотографию
export const createPhotoElement = (photo, isFavorite, className, withTitle) => {
    const photoElement = document.createElement('div');
    photoElement.classList.add(className);
    photoElement.setAttribute(`data-${className}-id`, photo.id);
    photoElement.innerHTML = `
        <img src="${photo.thumbnailUrl}" width="150" height="150" alt="${photo.title}" />
        <input type="checkbox" class="photo__icon" ${isFavorite ? 'checked' : ''}>
        ${withTitle ? `<div class="${className}__title">${photo.title}</div>` : ''}
    `;
    return photoElement;
};