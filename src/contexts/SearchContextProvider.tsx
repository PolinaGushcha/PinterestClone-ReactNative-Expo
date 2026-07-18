import { createContext, useContext, useState, useEffect } from 'react';
import { ISearchContextInterface, IContextProps } from '../types';
import { fetchData, fetchSearchQueryData } from '../services/api';

const SearchContext = createContext<ISearchContextInterface>(
  {} as ISearchContextInterface,
);

const dedupeById = (images: any[]) => {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.id)) return false;
    seen.add(image.id);
    return true;
  });
};

const SearchContextProvider = ({ children }: IContextProps) => {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    if (userSearchQuery == '') {
      fetchData().then((data) => setImages(dedupeById(data)));
    } else {
      fetchSearchQueryData(userSearchQuery, 1).then((data) =>
        setImages(dedupeById(data.results)),
      );
    }
  }, [userSearchQuery]);
  useEffect(() => {
    if (currentPage === 1) return;
    setIsLoadingMore(true);
    if (userSearchQuery === '') {
      fetchData()
        .then((data) => setImages((prev) => dedupeById([...prev, ...data])))
        .finally(() => setIsLoadingMore(false));
    } else if (userSearchQuery !== '') {
      fetchSearchQueryData(userSearchQuery, currentPage)
        .then((data) =>
          setImages((prev) => dedupeById([...prev, ...data.results])),
        )
        .finally(() => setIsLoadingMore(false));
    }
  }, [currentPage]);

  const contextValue: ISearchContextInterface = {
    userSearchQuery: userSearchQuery,
    setUserSearchQuery: setUserSearchQuery,
    images: images,
    setImages: setImages,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    isLoadingMore: isLoadingMore,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

export default SearchContextProvider;
