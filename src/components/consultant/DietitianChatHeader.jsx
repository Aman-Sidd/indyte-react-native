import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';

function DietitianChatHeader({
  icon1,
  icon2,
  icon3,
  name,
  headerContainerStyle,
  imgPath
}) {
  const navigation = useNavigation();
  const handleBackNavigation = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Can't navigate back");
      // Handle the case where there is no previous screen
    }
  };
  return (
    <View style={[styles.header, headerContainerStyle]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        {icon1 && (
          <>
            <TouchableOpacity
              onPress={() => {
                console.log('ehe');
                handleBackNavigation()
              }}>
              {icon1}
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image source={imgPath} />
              <Text style={styles.headingText}>{name}</Text>
            </View>
          </>
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>

        {icon2 && (
          <TouchableOpacity>
            {icon2}
          </TouchableOpacity>
        )}
        {icon3 && (
          <TouchableOpacity>
            {icon3}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 10
  },
  headingText: {
    color: 'black',
    fontFamily: FONTS.FONT_POPPINS_BOLD,
    fontSize: 18
  },
});
export default DietitianChatHeader;