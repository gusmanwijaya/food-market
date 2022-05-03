import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FoodDummy6, IcBackWhite} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Counter, Number, Rating} from '../../components';
import {getData} from '../../utils';

const FoodDetail = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const [totalItem, setTotalItem] = useState(1);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData('userProfile').then(result => {
        setUser(result);
      });
    });
    return unsubscribe;
  }, [navigation]);

  const handleValueChange = value => {
    setTotalItem(value);
  };

  const handleOrder = () => {
    const totalPrice = totalItem * params?.price;
    const driver = 50000;
    const tax = (10 / 100) * totalPrice;
    const total = totalPrice + driver + tax;

    const data = {
      item: {
        id: params?.id,
        name: params?.name,
        price: params?.price,
        picturePath: params?.picturePath,
      },
      transaction: {
        totalItem,
        totalPrice,
        driver,
        tax,
        total,
      },
      user,
    };

    navigation.navigate('OrderSumary', data);
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={params?.picturePath ? {uri: params?.picturePath} : FoodDummy6}
        style={styles.cover}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <IcBackWhite />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.productContainer}>
            <View>
              <Text style={styles.title}>{params?.name}</Text>
              <Rating number={params?.rate} />
            </View>
            <Counter onValueChange={handleValueChange} />
          </View>
          <Text style={styles.desc}>{params?.description}</Text>
          <Text style={styles.label}>Ingredients:</Text>
          <Text style={styles.desc}>{params?.ingredients}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.labelTotal}>Total Price:</Text>
            <Number
              number={totalItem * params?.price}
              style={styles.priceTotal}
            />
          </View>
          <View style={styles.button}>
            <Button text="Order Now" onPress={handleOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cover: {
    height: 330,
    paddingTop: 26,
    paddingLeft: 22,
  },
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  button: {
    width: 163,
  },
  labelTotal: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  priceTotal: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
});
