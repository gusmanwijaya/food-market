import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, TextInput, Button, Gap} from '../../components';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Find your best ever meal" />
      <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          type="email-address"
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          secure={true}
        />
        <Gap height={24} />
        <Button text="Sign In" onPress={() => navigation.replace('MainApp')} />
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
