import { nodes } from './nodes.js';
import {
    renderAlbumPhotos,
    renderUserAlbumsList,
    renderUsersList,
    renderFavoritesPhotos
} from './render-functions.js';
import { navMenu, toggleChecked } from './helpers.js';
import { requestsAPI } from './api.js';
import { showModalPhoto } from './modal.js';
import { Tooltip } from './tooltip.js';
import { state } from './state.js';
import { Loader } from './loader.js';


export const renderCatalog = async () => {
    navMenu.makeActive('catalog')

    if (!nodes.content.querySelectorAll('.user').length) {
        nodes.content.replaceChildren();

        Loader.show()
        await renderUsersList()
        setupUserListeners()
        Loader.hide()
    }
}


// Слушатель кнопки "Избранное"
export const renderFavorites = async () => {
    navMenu.makeActive('favorites')

    if (nodes.content.children.length) {
        nodes.content.replaceChildren();

        await renderFavoritesPhotos()
        await setupFavPhotoListeners()
    }


}


// Обработка нажатия по пользователю
const handleUserClick = async (event, user, userId) => {
    const checkbox = user.querySelector('input[type=\'checkbox\']');
    toggleChecked(checkbox)

    const albumsPoint = user.querySelector('.albums')


    if (!albumsPoint) {
        user.insertAdjacentHTML('beforeend', '<div class="albums hidden"></div>')
    }

    const albums = user.querySelector('.albums')
    const albumIsClosed = albums.classList.contains('hidden')
    albums.classList.toggle('hidden')


    if (albumIsClosed) {
        Loader.show()
        await renderUserAlbumsList(userId)
        setupAlbumListeners()
        Loader.hide()
    }
}


// Добавление слушателей на нажатие по пользователю
export const setupUserListeners = () => {
    const users = document.querySelector('.users').children

    for (let user of users) {
        const userId = user.getAttribute('data-user-id');
        const button = user.querySelector('.user__button')
        button.addEventListener('click', (event) => {
            handleUserClick(event, user, userId)
        })
    }
}


// Обработка нажатия на альбом
export const handleOpenAlbumClick = async (event, albumElement, albumId) => {
    const checkbox = albumElement.querySelector('input[type=\'checkbox\']');
    toggleChecked(checkbox)

    const isOpened = checkbox.checked;

    if(isOpened) {
        Loader.show()
        const photos = await requestsAPI.getAlbumPhotosList(albumId)
        const photosPoint = albumElement.querySelector('.photos');

        if (!photosPoint) {
            albumElement.insertAdjacentHTML('beforeend', '<div class="photos hidden"></div>')
            renderAlbumPhotos(photos)
            setupPhotoListeners(albumId, photos)
        }
        Loader.hide()
    }
    albumElement.querySelector('.photos').classList.toggle('hidden')

}


// Добавление слушателей на нажатие по альбому
export const setupAlbumListeners = () => {
    const albums = document.querySelectorAll('.album')

    for (let album of albums) {
        const albumId = album.getAttribute('data-album-id')
        const button = album.querySelector('.album__button')

        if (!album.dataset.clickOpenListenerAdded) {
            button.addEventListener('click', (event) => {
                handleOpenAlbumClick(event, album, albumId)
            })
            album.dataset.clickOpenListenerAdded = 'true'
        }
    }
}


export const togglePhotoFavorite = (photo) => {
    const isFavorite = state.favorites.find((favPhoto) => favPhoto.id === photo.id);

    if (isFavorite) {
        state.favorites = state.favorites.filter((favorite) => favorite.id !== isFavorite.id);
    } else {
        state.favorites.push(photo);
    }

}

// Добавление слушателей на фотографию
export const setupPhotoListeners = (albumId, photos) => {
    const displayedPhotos = document.querySelector(`[data-album-id="${albumId}"]`).querySelector('.photos').children

    for (let photo of displayedPhotos) {
        const photoId = Number(photo.getAttribute('data-photo-id'))
        const photoIconAddToFavorites = photo.querySelector('.photo__icon')
        const currentPhotoData = photos.find(photo => photo.id === photoId);

        photoIconAddToFavorites.addEventListener('click', (event) => {
            event.stopPropagation()
            togglePhotoFavorite(currentPhotoData)
        })

        photo.addEventListener('click', async () => {
            showModalPhoto(currentPhotoData.url)
        })

        photo.addEventListener('mousemove', (event) => {
            Tooltip.changeContent(currentPhotoData.title);
            Tooltip.updatePosition(event.clientX, event.clientY)
        })

        photo.addEventListener('mouseleave', () => {
            Tooltip.hide()
        })

        photo.addEventListener('mouseenter', () => {
            Tooltip.show()
        })
    }
}

// Добавление слушателей на избранную фотографию
export const setupFavPhotoListeners = async () => {
    const displayedPhotos = document.querySelectorAll('[data-fav-photo-id]');


    for (let photo of displayedPhotos) {
        const photoId = Number(photo.getAttribute('data-fav-photo-id'))
        const photoIconAddToFavorites = photo.querySelector('.photo__icon')
        const currentPhotoData = state.favorites.find(photo => photo.id === photoId);

        photoIconAddToFavorites.addEventListener('click', async (event) => {
            event.stopPropagation()
            togglePhotoFavorite(currentPhotoData)
            await renderFavorites()
        })
        
        photo.addEventListener('click', () => {
            showModalPhoto(currentPhotoData.url)
        })
    }
}