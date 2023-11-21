import { fetchImages } from 'api';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Container } from './Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function dataProcessing() {
      try {
        setLoading(true);
        setLoadMore(false);
        const additionalParams = {
          q: query.split('/').pop().trim(),
          page: page,
          per_page: 12,
        };
        const initialImages = await fetchImages(additionalParams);
        if (additionalParams.q === '' || initialImages.total === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        } else {
          setImages(prevItems => [...prevItems, ...initialImages.hits]);
          setLoadMore(true);
        }
      } catch (error) {
        toast.error('Please try reloading this page');
      } finally {
        setLoading(false);
      }
    }
    dataProcessing();
  }, [page, query]);

  const addQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery.query}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevItems => prevItems + 1);
  };

  return (
    <Container>
      <Searchbar addQuery={addQuery} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {loadMore && <Button loadMore={handleLoadMore} />}
      <Toaster position="top-right" />
    </Container>
  );
};