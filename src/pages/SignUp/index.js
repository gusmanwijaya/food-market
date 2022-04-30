import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Header, TextInput, Button, Gap} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {showMessage, useForm} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState('');
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = () => {
    if (
      form.name !== '' &&
      form.email !== '' &&
      form.password !== '' &&
      form.password_confirmation !== ''
    ) {
      const pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!pattern.test(form.email)) {
        showMessage('Email yang Anda masukkan tidak valid', 'danger');
      } else {
        if (form.password !== form.password_confirmation) {
          showMessage(
            'Password dan Confirmation Password tidak sama',
            'danger',
          );
        } else {
          dispatch({
            type: 'SET_SIGNUP',
            value: form,
          });
          navigation.navigate('SignUpAddress');
        }
      }
    } else {
      showMessage('Tolong isi semua field yang disediakan', 'danger');
    }
  };

  const handleAddPhoto = async () => {
    await launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo', 'danger');
        } else {
          const source = {
            uri: response?.assets[response?.assets.length - 1]?.uri,
          };

          const dataImage = {
            uri: response?.assets[response?.assets.length - 1]?.uri,
            type: response?.assets[response?.assets.length - 1]?.type,
            name: response?.assets[response?.assets.length - 1]?.fileName,
          };

          setPhoto(source);
          dispatch({
            type: 'SET_PHOTO',
            value: dataImage,
          });
          dispatch({
            type: 'SET_UPLOAD_STATUS',
            value: true,
          });
        }
      },
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}>
      <Header
        title="Sign Up"
        subTitle="Register and eat"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.photo}>
          <Pressable onPress={handleAddPhoto}>
            <View style={styles.borderPhoto}>
              {photo ? (
                <Image source={photo} style={styles.photoContainer} />
              ) : (
                <View style={styles.photoContainer}>
                  <Text style={styles.addPhoto}>Add Photo</Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>
        <TextInput
          label="Full Name"
          placeholder="Type your full name"
          name="name"
          value={form.name}
          onChangeText={value => setForm('name', value)}
        />
        <Gap height={16} />
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
          secureTextEntry
          name="password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Confirmation Password"
          placeholder="Type your confirmation password"
          secureTextEntry
          name="password_confirmation"
          value={form.password_confirmation}
          onChangeText={value => setForm('password_confirmation', value)}
        />
        <Gap height={24} />
        <Button text="Continue" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
  addPhoto: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    padding: 24,
    backgroundColor: '#F0F0F0',
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
});
