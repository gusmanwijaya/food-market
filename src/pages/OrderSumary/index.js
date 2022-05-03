/* eslint-disable radix */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Gap,
  Header,
  ItemListFood,
  ItemValue,
  Loading,
} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {getData, showMessage} from '../../utils';
import axios from 'axios';
import {API_HOST} from '../../configs';

const OrderSumary = () => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentURL, setPaymentURL] = useState('https://google.com');

  const onNavChange = state => {
    const stateUrl = state?.url.split('/')[state?.url.split('/').length - 1];
    if (parseInt(stateUrl) === 406) {
      navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
    }
  };

  if (isPaymentOpen) {
    return (
      <>
        <Header
          title="Payment"
          subTitle="You deserve better meal"
          onBack={() => setIsPaymentOpen(false)}
        />
        <WebView
          source={{uri: paymentURL}}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          onNavigationStateChange={onNavChange}
        />
      </>
    );
  }

  const handleCheckout = () => {
    const data = {
      food_id: params?.item?.id,
      user_id: params?.user?.id,
      quantity: params?.transaction?.totalItem,
      total: params?.transaction?.total,
      status: 'PENDING',
    };
    getData('token').then(resToken => {
      axios
        .post(`${API_HOST.url}/checkout`, data, {
          headers: {
            Authorization: resToken,
          },
        })
        .then(res => {
          setIsPaymentOpen(true);
          setPaymentURL(res?.data?.data?.payment_url);
        })
        .catch(error => {
          showMessage(
            `${error?.response?.data?.message} on Checkout API` ||
              'Terjadi Kesalahan di API Checkout',
          );
        });
    });
  };

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
          name={params?.item?.name}
          price={params?.item?.price}
          items={params?.transaction?.totalItem}
          image={{uri: params?.item?.picturePath}}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue
          label={params?.item?.name}
          value={params?.item?.price}
          type="currency"
        />
        <ItemValue
          label="Driver"
          value={params?.transaction?.driver}
          type="currency"
        />
        <ItemValue
          label="Tax 10%"
          value={params?.transaction?.tax}
          type="currency"
        />
        <ItemValue
          label="Total Price"
          value={params?.transaction?.total}
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
      <View style={styles.button}>
        <Button text="Checkout Now" onPress={handleCheckout} />
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
