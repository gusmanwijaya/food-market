import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Header, SelectInput, TextInput} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {getData, showMessage, storeData} from '../../utils';
import axios from 'axios';
import {API_HOST} from '../../configs';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    houseNumber: '',
    phoneNumber: '',
    city: '',
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData('userProfile').then(result => {
        setForm({
          ...form,
          name: result?.name,
          email: result?.email,
          address: result?.address,
          houseNumber: result?.houseNumber,
          phoneNumber: result?.phoneNumber,
          city: result?.city,
        });
      });
    });
    return unsubscribe;
  }, [form, navigation]);

  const handleSubmit = () => {
    dispatch(setLoading(true));
    getData('token').then(async resToken => {
      const response = await axios.post(`${API_HOST.url}/user`, form, {
        headers: {
          Authorization: resToken,
        },
      });
      storeData('userProfile', response?.data?.data);
      dispatch(setLoading(false));
      navigation.goBack();
      showMessage(response?.data?.meta?.message, 'success');
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Edit Profile"
          subTitle="Update your profile"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            name="name"
            value={form.name}
            onChangeText={value => setForm({...form, name: value})}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            type="email-address"
            name="email"
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            name="address"
            value={form.address}
            onChangeText={value => setForm({...form, address: value})}
          />
          <Gap height={16} />
          <TextInput
            label="House Number"
            placeholder="Type your house number"
            type="number-pad"
            name="houseNumber"
            value={form.houseNumber}
            onChangeText={value => setForm({...form, houseNumber: value})}
          />
          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            type="phone-pad"
            name="phoneNumber"
            value={form.phoneNumber}
            onChangeText={value => setForm({...form, phoneNumber: value})}
          />
          <Gap height={16} />
          <SelectInput
            label="City"
            placeholder="Select your city"
            data={['Seluma', 'Manna', 'Kaur']}
            value={form.city}
            setValueChange={value => setForm({...form, city: value})}
          />
          <Gap height={24} />
          <Button text="Update" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
