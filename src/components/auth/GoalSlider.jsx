import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import FirstCardImage from '../../../assets/images/goalCardImage1.svg';
import SecondCardImage from '../../../assets/images/SecondCardImage.svg';
import ThirdImage from '../../../assets/images/thirdImage.svg';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width - 80;
const CARD_SPACING = 13;

const GoalSlider = ({activeIndex, setActiveIndex}) => {
  const handleScroll = event => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_SPACING),
    );

    if (newIndex != activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const cardContent = [
    {
      id: 1,
      title: 'Improve Shape',

      subTitle:
        'I have a low amount of body fat and need / want to build more muscle',
      svgComponent: <FirstCardImage width={200} height={300} />,
    },
    {
      id: 2,
      title: 'Lean & Tone',
      subTitle:
        'I’m “skinny fat”. look thin but have no shape. I want to add learn muscle in the right way',
      svgComponent: <SecondCardImage width={200} height={300} />,
    },
    {
      id: 3,
      title: 'Lose a Fat',
      subTitle:
        'I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass',
      svgComponent: <ThirdImage width={200} height={300} />,
    },
  ];
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={cardContent}
        keyExtractor={item => item.id}
        horizontal
        decelerationRate={0.5}
        snapToInterval={width - 80}
        bounces={false}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        renderItem={({item, index}) => {
          return (
            <View
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <LinearGradient
                style={styles.slidingCard}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
                  COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
                ]}>
                <Animated.View style={styles.animatedView}>
                  {item.svgComponent}
                  <Text style={styles.title}>{item.title}</Text>
                  <View
                    style={{
                      width: 40,
                      height: 2,
                      backgroundColor: 'white',
                      marginTop: 5,
                    }}
                  />
                  <Text style={styles.subTitle}>{item.subTitle}</Text>
                </Animated.View>
              </LinearGradient>
              <View>
                <Text>{activeIndex}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height / 1.6,
  },
  slidingCard: {
    width: width - 80,
    marginHorizontal: 13,
    alignItems: 'center',
    borderRadius: 34,
    height: '100%',
    elevation: 10,
    shadowColor: 'rgba(197, 139, 242, 0.3)',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: 'white',
    textAlign: 'center',
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    width: '70%',
  },
  animatedView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
});
export default GoalSlider;
