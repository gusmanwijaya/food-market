import axios from 'axios';
import {API_HOST} from '../../../configs';
import {showMessage, storeData} from '../../../utils';
import {setLoading} from '../global';

export const signUpAction =
  (dataSignUp, photoReducer, navigation) => dispatch => {
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/register`, dataSignUp)
      .then(response => {
        const token = `${response.data.data.token_type} ${response.data.data.access_token}`;
        let profile = response.data.data.user;

        storeData('token', token);

        if (photoReducer.isUploadPhoto) {
          let photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);

          axios
            .post(`${API_HOST.url}/user/photo`, photoForUpload, {
              headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(resUpload => {
              profile.profile_photo_url = `${API_HOST.storage}/${resUpload.data.data[0]}`;
              storeData('userProfile', profile);
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            })
            .catch(error => {
              showMessage(
                error?.response?.message || 'Uplaod photo tidak berhasil',
                'danger',
              );
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            });
        } else {
          storeData('userProfile', profile);
          navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
        }
        dispatch(setLoading(false));
        showMessage('Selamat Anda berhasil sign up', 'success');
      })
      .catch(error => {
        dispatch(setLoading(false));
        showMessage(error?.response?.data?.data?.message, 'danger');
      });
  };

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/login`, form)
    .then(response => {
      const token = `${response.data.data.token_type} ${response.data.data.access_token}`;
      const profile = response.data.data.user;
      dispatch(setLoading(false));
      storeData('token', token);
      storeData('userProfile', profile);
      navigation.replace('MainApp', {
        screen: 'Home',
      });
      showMessage('Selamat, Anda berhasil sign in', 'success');
    })
    .catch(error => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.data?.message, 'danger');
    });
};
