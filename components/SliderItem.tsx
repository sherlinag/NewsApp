import { Dimensions, StyleSheet, Image, Text, View } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  // Animated Style for Scaling and Translation
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.6, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]}>
      {/* Image or Placeholder */}
      {slideItem.urlToImage ? (
        <Image source={{ uri: slideItem.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.errorText}>Image Not Available</Text>
        </View>
      )}

      {/* Title */}
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {slideItem.title || 'No Title Available'}
      </Text>

      {/* Published Date */}
      <Text style={styles.publishedAt}>
        {slideItem.publishedAt
          ? `Published On: ${new Date(slideItem.publishedAt).toLocaleString()}`
          : 'Publication Date Unavailable'}
      </Text>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: width * 0.9,
    height: 300,
    marginHorizontal: width * 0.05,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  publishedAt: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});
