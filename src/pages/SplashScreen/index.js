/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets';
import {Gap} from '../../components';
import {getData} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      getData('token').then(response => {
        if (response) {
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#FFC700',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Logo />
      <Gap height={38} />
      <Text
        style={{fontSize: 32, color: '#020202', fontFamily: 'Poppins-Medium'}}>
        FoodMarket
      </Text>
    </View>
  );
};

export default SplashScreen;
