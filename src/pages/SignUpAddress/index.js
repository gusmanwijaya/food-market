import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Header, TextInput, Button, Gap, SelectInput} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {showMessage, useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {signUpAction} from '../../redux/actions';

const SignUpAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {signUpReducer, photoReducer} = useSelector(state => state);

  const [form, setForm] = useForm({
    phoneNumber: '',
    address: '',
    houseNumber: '',
    city: '',
  });

  const handleSubmit = () => {
    if (
      form.phoneNumber !== '' &&
      form.address !== '' &&
      form.houseNumber !== '' &&
      form.city !== ''
    ) {
      const payload = {
        ...signUpReducer,
        ...form,
      };
      dispatch(signUpAction(payload, photoReducer, navigation));
    } else {
      showMessage('Tolong isi semua field yang disediakan', 'danger');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}>
      <Header
        title="Address"
        subTitle="Make sure it's valid"
        onBack={() => navigation.pop()}
      />
      <View style={styles.container}>
        <TextInput
          label="Phone No"
          placeholder="Type your phone number"
          keyboardType="phone-pad"
          name="phoneNumber"
          onChangeText={value => setForm('phoneNumber', value)}
          value={form.phoneNumber}
        />
        <Gap height={16} />
        <TextInput
          label="Address"
          placeholder="Type your address"
          name="address"
          onChangeText={value => setForm('address', value)}
          value={form.address}
        />
        <Gap height={16} />
        <TextInput
          label="House No"
          placeholder="Type your house number"
          keyboardType="number-pad"
          name="houseNumber"
          onChangeText={value => setForm('houseNumber', value)}
          value={form.houseNumber}
        />
        <Gap height={16} />
        <SelectInput
          label="City"
          placeholder="Select your city"
          data={['Seluma', 'Manna', 'Kaur']}
          name="city"
          setValueChange={value => setForm('city', value)}
          value={form.city}
        />
        <Gap height={24} />
        <Button text="Sign Up Now" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
  },
});
