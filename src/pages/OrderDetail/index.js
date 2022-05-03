import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FoodDummy1} from '../../assets';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions';
import axios from 'axios';
import {API_HOST} from '../../configs';
import {getData, showMessage} from '../../utils';

const OrderDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {params} = useRoute();

  const handleCancel = () => {
    dispatch(setLoading(true));
    getData('token').then(resToken => {
      axios
        .post(
          `${API_HOST.url}/transaction/${params?.id}`,
          {
            status: 'CANCELLED',
          },
          {
            headers: {
              Authorization: resToken,
            },
          },
        )
        .then(() => {
          dispatch(setLoading(false));
          navigation.popToTop();
          navigation.replace('MainApp', {screen: 'Order'});
        })
        .catch(error => {
          dispatch(setLoading(false));
          showMessage(
            `${error?.response?.data?.message} on Transaction Update API` ||
              'Terjadi Kesalahan di API Transaction Update',
            'danger',
          );
        });
    });
  };

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
          name={params?.food?.name}
          price={params?.food?.price}
          items={params?.quantity}
          image={
            params?.food?.picturePath
              ? {uri: params?.food?.picturePath}
              : FoodDummy1
          }
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue
          label={params?.food?.name}
          value={params?.food?.price}
          type="currency"
        />
        <ItemValue label="Driver" value={50000} type="currency" />
        <ItemValue
          label="Tax 10%"
          value={(10 / 100) * params?.food?.price}
          type="currency"
        />
        <ItemValue
          label="Total Price"
          value={params?.total}
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value={params?.user?.name} />
        <ItemValue label="Phone No." value={params?.user?.phoneNumber} />
        <ItemValue label="Address" value={params?.user?.address} />
        <ItemValue label="House No." value={params?.user?.houseNumber} />
        <ItemValue label="City" value={params?.user?.city} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Order Status:</Text>
        <ItemValue
          label={`#${params?.id}`}
          value={params?.status}
          valueColor={
            params?.status === 'CANCELLED'
              ? '#D9435E'
              : params?.status === 'PENDING'
              ? '#FFC700'
              : '#1ABC9C'
          }
        />
      </View>
      {params?.status === 'PENDING' && (
        <View style={styles.button}>
          <Button
            text="Cancel My Order"
            color="#D9435E"
            textColor="white"
            onPress={handleCancel}
          />
        </View>
      )}
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
