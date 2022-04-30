import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, TextInput, Button, Gap} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {showMessage, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import {signInAction} from '../../redux/actions';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    if (form.email !== '' && form.password !== '') {
      dispatch(signInAction(form, navigation));
    } else {
      showMessage('Tolong isi email dan password Anda', 'danger');
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Find your best ever meal" />
      <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          keyboardType="email-address"
          name="email"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          secureTextEntry={true}
          name="password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
        />
        <Gap height={24} />
        <Button text="Sign In" onPress={handleSubmit} />
        <Gap height={12} />
        <Button
          text="Create New Account"
          color="#8D92A3"
          textColor="white"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
  },
});
