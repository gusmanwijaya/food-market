import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileTabSection} from '../../components';
import {getData, showMessage, storeData} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {API_HOST} from '../../configs';
import axios from 'axios';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  const updateUserProfile = () => {
    getData('userProfile').then(res => {
      setUser(res);
    });
  };

  const uploadPhoto = async () => {
    await launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          showMessage('Anda tidak memilih photo');
        } else {
          const dataImage = {
            uri: response?.assets[response?.assets.length - 1]?.uri,
            type: response?.assets[response?.assets.length - 1]?.type,
            name: response?.assets[response?.assets.length - 1]?.fileName,
          };
          let photoForUpload = new FormData();
          photoForUpload.append('file', dataImage);
          getData('token').then(resToken => {
            axios
              .post(`${API_HOST.url}/user/photo`, photoForUpload, {
                headers: {
                  Authorization: resToken,
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(result => {
                getData('userProfile').then(resUser => {
                  showMessage('Update photo berhasil', 'success');
                  resUser.profile_photo_url = `${API_HOST.storage}/${result.data.data[0]}`;
                  storeData('userProfile', resUser).then(() => {
                    updateUserProfile();
                  });
                });
              })
              .catch(error => {
                showMessage(
                  `${error?.response?.data?.message} on Update Photo API` ||
                    'Terjadi kesalahan di API Update Photo',
                );
              });
          });
        }
      },
    );
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateUserProfile();
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <TouchableOpacity activeOpacity={0.7} onPress={uploadPhoto}>
            <View style={styles.borderPhoto}>
              <Image
                source={{uri: user?.profile_photo_url}}
                style={styles.photoContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {flex: 1},
  content: {flex: 1, marginTop: 24},
  profileDetail: {backgroundColor: 'white', paddingBottom: 26},
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    textAlign: 'center',
  },
  email: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photo: {alignItems: 'center', marginTop: 26, marginBottom: 16},
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
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
});
