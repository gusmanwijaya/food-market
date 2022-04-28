import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {FoodDummy6} from '../../assets';

const OrderSumary = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Header
        title="Order Summary"
        subTitle="You deserve better meal"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood
          type="order-summary"
          name="Cherry Healty"
          price={50000}
          items={5}
          image={FoodDummy6}
          rating={4.5}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue label="Cherry Healty" value={50000} type="currency" />
        <ItemValue label="Driver" value={15000} type="currency" />
        <ItemValue label="Tax 10%" value={5000} type="currency" />
        <ItemValue
          label="Total Price"
          value={70000}
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value="Gusman Wijaya" />
        <ItemValue label="Phone No." value={'+6281312397308'} />
        <ItemValue label="Address" value="Unib Belakang" />
        <ItemValue label="House No." value={10} />
        <ItemValue label="City" value="Bengkulu" />
      </View>
      <View style={styles.button}>
        <Button
          text="Checkout Now"
          onPress={() => {
            navigation.popToTop();
            navigation.replace('SuccessOrder');
          }}
        />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderSumary;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
