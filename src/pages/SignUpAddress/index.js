import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Header, TextInput, Button, Gap, SelectInput} from '../../components';

const SignUpAddress = ({navigation}) => {
  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <Header
        title="Address"
        subTitle="Make sure it's valid"
        onBack={() => navigation.pop()}
      />
      <View style={styles.container}>
        <TextInput
          label="Phone No"
          placeholder="Type your phone number"
          type="phone-pad"
        />
        <Gap height={16} />
        <TextInput label="Address" placeholder="Type your address" />
        <Gap height={16} />
        <TextInput
          label="House No"
          placeholder="Type your house number"
          type="number-pad"
        />
        <Gap height={16} />
        <SelectInput
          label="City"
          placeholder="Select your city"
          data={['Bengkulu', 'Manna']}
        />
        <Gap height={24} />
        <Button
          text="Sign Up Now"
          onPress={() => {
            navigation.popToTop();
            navigation.replace('SuccessSignUp');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

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
