export const showModalPhoto = (imageUrl) => {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'

    const modal = document.createElement('div');
    modal.id = 'modal-photo';
    modal.classList.add('modal');

    const modalClose = document.createElement('img');
    modalClose.src = './src/assets/icon_close.svg';
    modalClose.classList.add('close');
    modalClose.width = 26;
    modalClose.height = 26;
    modalClose.alt = 'close';

    const modalImage = document.createElement('img');
    modalImage.src = imageUrl;
    modalImage.classList.add('modal-content');
    modalImage.id = 'modal__image';
    modalImage.width = 600;
    modalImage.height = 600;
    modalImage.alt = '#';

    modal.appendChild(modalClose);
    modal.appendChild(modalImage);

    document.body.appendChild(modal);

    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = null
        document.body.style.height = null
    };

    modal.style.display = 'flex';
    modalClose.addEventListener('click', closeModal);
};