import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import colors from '../../themes/colors';
import DoublePressable from '../DoublePressable';

interface ICarousel {
  images: string[];
  onDoublePress: () => void;
}

const Carousel = ({images, onDoublePress}: ICarousel) => {
  const [activeImageIndex, setActiveImageIndex] = useState(1);

  const {width} = useWindowDimensions();

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
  );

  return (
    <View>
      <FlatList
        data={images}
        style={styles.container}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image source={{uri: item}} style={[styles.image, {width}]} />
          </DoublePressable>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeImageIndex === index ? colors.primary : colors.while,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    aspectRatio: 1,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',

    position: 'absolute',
    bottom: 0,

    width: '100%',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 3,
    margin: 10,
  },
});

export default Carousel;
