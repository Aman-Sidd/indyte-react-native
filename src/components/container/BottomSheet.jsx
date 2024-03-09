import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {useMemo} from 'react';
import ReactNative, {StyleSheet, Dimensions} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const {height} = Dimensions.get('window');
const maxTranslateY = -height;
const BottomSheet = React.forwardRef(
  ({children, extraRequiredHeight, heightFraction}, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);
    const maxScroll = useMemo(() => {
      return maxTranslateY - extraRequiredHeight;
    });
    const minScroll = useMemo(() => {
      return -height / heightFraction;
    }, [heightFraction]);
    const scrollTo = useCallback(destination => {
      'worklet';
      active.value = destination === 0 ? false : true;
      translateY.value = withSpring(destination, {damping: 50});
    }, []);

    useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, maxScroll);
        translateY.value = Math.min(translateY.value, minScroll);
      })
      .onEnd(() => {
        if (translateY.value > -height / 1.5) scrollTo(minScroll);
        else if (
          translateY.value < -height / 2.5 &&
          translateY.value > maxTranslateY
        )
          scrollTo(maxTranslateY);
        else scrollTo(translateY.value);
      });

    const isActive = useCallback(() => {
      return active.value;
    });

    useEffect(() => {
      scrollTo(minScroll);
    }, []);

    const bottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [maxTranslateY + 50, maxTranslateY],
        [25, 5],
        Extrapolate.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, bottomSheetStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);
const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    position: 'absolute',
    top: height,
    borderRadius: 25,
    overflow: 'hidden',
    // marginBottom: "80%"
  },
});
export default BottomSheet;
