import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, Header, SelectInput, TextInput} from '../../components';
import {useNavigation} from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();

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
          <TextInput label="Full Name" placeholder="Type your full name" />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            type="email-address"
          />
          <Gap height={16} />
          <TextInput label="Address" placeholder="Type your address" />
          <Gap height={16} />
          <TextInput
            label="House Number"
            placeholder="Type your house number"
            type="number-pad"
          />
          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            type="phone-pad"
          />
          <Gap height={16} />
          <SelectInput
            label="City"
            placeholder="Select your city"
            data={['Bengkulu', 'Manna']}
          />
          <Gap height={24} />
          <Button text="Update" />
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
