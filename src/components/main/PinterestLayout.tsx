import React, { useCallback, useEffect, useRef } from 'react';
import { RenderItem } from './Pin';
import { View } from 'react-native';
import { FlashList, FlashListRef, ListRenderItemInfo } from '@shopify/flash-list';
import { Loading } from '../loader';
import { globalStyles } from '../../styles';
import { FilterItem } from '../filter';
import { useSearchContext } from '../../contexts/SearchContextProvider';
import { getPinHeight } from '../../utils/masonry';

export const PinterestLayout: React.FC = () => {
  const { setCurrentPage, images, userSearchQuery, isLoadingMore, isLoading } =
    useSearchContext();
  const listRef = useRef<FlashListRef<any>>(null);

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [userSearchQuery]);

  const loadingMoreItem = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);
  }, [setCurrentPage]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <RenderItem item={{ item }} renderHeight={getPinHeight(item)} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  if (isLoading && images.length === 0) {
    return (
      <View style={globalStyles.pinterestLayout_container}>
        <FilterItem />
        <Loading />
      </View>
    );
  }

  return (
    <View style={globalStyles.pinterestLayout_container}>
      <FilterItem />
      <FlashList
        ref={listRef}
        style={globalStyles.pinterestLayout}
        contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 24 }}
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        masonry
        optimizeItemArrangement
        onEndReached={isLoadingMore ? undefined : loadingMoreItem}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore ? Loading : undefined}
      />
    </View>
  );
};
