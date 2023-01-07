import { nodes } from './nodes.js';
import { requestsAPI } from './api.js';
import { state } from './state.js';
import { createPhotoElement } from './helpers.js';



// Отображение пользователей
export const renderUsersList = async () => {
    const users = await requestsAPI.getUsersList()
    nodes.content.insertAdjacentHTML('beforeend', '<div class="users"></div>')
    const renderPoint = document.querySelector('.users')

    for (const user of users) {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.setAttribute('data-user-id', user.id);
        userElement.innerHTML = `
        <div class="user__button">
            <input type="checkbox"/>
            <label>${user.name}</label> 
        </div>
    `;
        renderPoint.appendChild(userElement);
    }
}


// Отображение альбомов пользователя
export const renderUserAlbumsList = async (userId) => {
    const userAlbums = await requestsAPI.getUserAlbumsList(userId)
    const renderPoint = document.querySelector(`[data-user-id="${userId}"]`).querySelector('.albums')
    const renderPointIsEmpty = renderPoint.children.length

    if (!renderPointIsEmpty) {
        for (const album of userAlbums) {
            const albumElement = document.createElement('div')
            albumElement.classList.add('album')
            albumElement.setAttribute('data-album-id', album.id)
            albumElement.innerHTML = `
                <div class="album__button">
                    <input type="checkbox"/>
                    <label>${album.title}</label>   
                </div>
            `
            renderPoint.appendChild(albumElement)
        }
    }

}


// Отображение фотографий альбома
export const renderAlbumPhotos = (photos) => {
    const renderPoint = document.querySelector(`[data-album-id="${photos[0].albumId}"]`).querySelector('.photos')
    const renderPointIsEmpty = renderPoint.children.length

    const favoritesIDs = new Set(state.favorites.map((fav) => fav.id))

    if (!renderPointIsEmpty) {
        photos.forEach((photo) => {
            const isFavorite = favoritesIDs.has(photo.id)

            const photoElement = createPhotoElement(photo, isFavorite,'photo');
            renderPoint.appendChild(photoElement);
        })
    }
}


// Создаём HTML страницы "Список избранного пуст"
export const createFavoritesEmptyPage = () => {
    const favoritesEmptyPage = document.createElement('div');
    favoritesEmptyPage.classList.add('favorites_empty');

    const img = document.createElement('img');
    img.src = './src/assets/empty.png';
    img.alt = 'empty';
    img.width = '264';
    img.height = '198';
    favoritesEmptyPage.appendChild(img);

    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = 'Список избранного пуст';
    favoritesEmptyPage.appendChild(title);

    const description = document.createElement('span');
    description.classList.add('description');
    description.textContent = 'Добавляйте изображения, нажимая на звездочки';
    favoritesEmptyPage.appendChild(description);

    return favoritesEmptyPage;
}

// Отображение избранных фотографий
export const renderFavoritesPhotos = async () => {
    const isFavoritesEmpty = !state.favorites.length;

    if (isFavoritesEmpty) {
        nodes.content.appendChild(createFavoritesEmptyPage())
    } else {
        const renderPoint = document.createElement('div')
        renderPoint.classList.add('fav-photos-list')

        const favoritesIDs = new Set(state.favorites.map((fav) => fav.id))

        state.favorites.forEach((photo) => {
            const isFavorite = favoritesIDs.has(photo.id)

            const photoElement = createPhotoElement(photo, isFavorite, 'fav-photo', true)
            renderPoint.appendChild(photoElement)
        })

        nodes.content.appendChild(renderPoint)
    }
}