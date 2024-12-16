import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, ViewToken, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import SliderItem from './SliderItem';
import { NewsDataType } from '@/types'; // Replace with your actual type
import { Colors } from '@/constants/Colors';
import Pagination from '@/components/Pagination';

type Props = {
  newsList: Array<NewsDataType>;
};

const { width } = Dimensions.get('screen');

const BreakingNews = ({ newsList }: Props) => {
  // SharedValue for scroll position
  const [data, setData]= useState(newsList);
  const [paginationIndex, setPaginationIndex]=useState(0);
  const scrollX = useSharedValue(0);
  const ref= useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay]=useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const {width} = useWindowDimensions();

  const onViewableItemsChanged =({
      viewableItems,
    }:{
      viewableItems: ViewToken[];
    }) => {
      if (
        viewableItems[0].index !== undefined &&
        viewableItems[0].index !== null
      ){
        setPaginationIndex(viewableItems[0].index % newsList.length);
      }
    };
    const viewabilityConfig ={
      itemVisiblePercentThreshold:50,
    };
    const viewabilityConfigCallbackPairs=useRef([
      {viewabilityConfig, onViewableItemsChanged}
    ])


  // Animated scroll handler
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x; // Updates scroll position
    },
  });

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Breaking News</Text>

      {/* Animated FlatList for horizontal scrolling */}
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item_${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16} // Ensures smooth animations
          onEndReachedThreshold={0.5}
          onEndReached={()=>setData([...data, ...newsList])}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
        {/* <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex}/> */}
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    width: width,
    
  },
});
