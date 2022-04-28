import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {FoodDummy1} from '../../assets';

const OrderDetail = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title="Order Detail"
        subTitle="You deserve better meal"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood
          type="order-summary"
          name="Soup Bumil"
          price={20000}
          items={5}
          image={FoodDummy1}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue label="Soup Bumil" value={20000} type="currency" />
        <ItemValue label="Driver" value={5000} type="currency" />
        <ItemValue label="Tax 10%" value={(10 / 100) * 20000} type="currency" />
        <ItemValue
          label="Total Price"
          value={27000}
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value="Gusman Wijaya" />
        <ItemValue label="Phone No." value="+6281312397308" />
        <ItemValue label="Address" value="Unib Belakang" />
        <ItemValue label="House No." value="14" />
        <ItemValue label="City" value="Bengkulu" />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Order Status:</Text>
        <ItemValue
          label={'#adwasdwaq'}
          value="ON DELIVERY"
          //   valueColor={order.status === 'CANCELLED' ? '#D9435E' : '#1ABC9C'}
        />
      </View>
      <View style={styles.button}>
        <Button text="Cancel My Order" color="#D9435E" textColor="white" />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderDetail;

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
    marginBottom: 8,
  },
  button: {paddingHorizontal: 24, marginTop: 24},
});
