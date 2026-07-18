import React, { useMemo, useEffect, useRef } from 'react';
import { RenderItem } from './Pin';
import {
  ScrollView,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Loading } from '../loader';
import { globalStyles } from '../../styles';
import { FilterItem } from '../filter';
import { useSearchContext } from '../../contexts/SearchContextProvider';
import { distributeMasonry, MASONRY_COLUMN_WIDTH } from '../../utils/masonry';

export const PinterestLayout: React.FC = () => {
  const { setCurrentPage, images, userSearchQuery, isLoadingMore } = useSearchContext();
  const scrollRef = useRef<ScrollView>(null);

  const [leftColumn, rightColumn] = useMemo(
    () => distributeMasonry(images ?? []),
    [images],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [userSearchQuery]);

  const loadingMoreItem = () => {
    setCurrentPage((currentPage) => (currentPage = currentPage + 1));
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoadingMore) return;
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - 200
    ) {
      loadingMoreItem();
    }
  };

  return (
    <View style={globalStyles.pinterestLayout_container}>
      <FilterItem />
      <ScrollView
        ref={scrollRef}
        style={globalStyles.pinterestLayout}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        <View style={globalStyles.masonryRow}>
          <View
            style={[
              globalStyles.masonryColumn,
              { width: MASONRY_COLUMN_WIDTH },
            ]}
          >
            {leftColumn.map(({ item, height }) => (
              <RenderItem key={item.id} item={{ item }} renderHeight={height} />
            ))}
          </View>
          <View
            style={[
              globalStyles.masonryColumn,
              { width: MASONRY_COLUMN_WIDTH },
            ]}
          >
            {rightColumn.map(({ item, height }) => (
              <RenderItem key={item.id} item={{ item }} renderHeight={height} />
            ))}
          </View>
        </View>
        <Loading />
      </ScrollView>
    </View>
  );
};
