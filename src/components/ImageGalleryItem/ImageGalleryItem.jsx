import { useState } from 'react';
import { ImageGalleryItemWrapper } from './ImageGalleryItem.styled';
import { ModalWindows } from '../Modal/ModalWindows';

export const ImageGalleryItem = image => {
 
  const {image: {webformatURL, largeImageURL, tags}} = image
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageGalleryItemWrapper>
      <img src={webformatURL} alt={tags} onClick={openModal} />
      <ModalWindows
        isOpen={isModalOpen}
        onClose={closeModal}
        image={largeImageURL}
        alt={tags}
      />
    </ImageGalleryItemWrapper>
  );
};
