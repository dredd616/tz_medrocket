export const BASE_API_URL = 'https://json.medrocket.ru' // Базовый URL нашего API

export const requestsAPI = {
    // Запрос на получение списка пользователей
    getUsersList: async () => {
        const response = await fetch(`${BASE_API_URL}/users`);
        return response.json()
    },
    // Запрос на получение списка альбомов пользователя
    getUserAlbumsList: async (userId) => {
        const response = await fetch(`${BASE_API_URL}/albums?userId=${userId}`)
        return response.json()
    },
    // Запрос на получение списка фотографий альбома
    getAlbumPhotosList: async (albumId) => {
        const response = await fetch(`${BASE_API_URL}/photos?albumId=${albumId}`);
        return response.json()
    },
}