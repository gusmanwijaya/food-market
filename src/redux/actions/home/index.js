import {showMessage} from '../../../utils';
import {API_HOST} from '../../../configs';
import axios from 'axios';
import {setLoading} from '../global';

const setFood = value => {
  return {
    type: 'SET_FOOD',
    value,
  };
};

export const getFoodData = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/food`)
    .then(result => {
      dispatch(setLoading(false));
      dispatch(setFood(result?.data?.data?.data));
    })
    .catch(error => {
      dispatch(setLoading(false));
      showMessage(
        `${error?.response?.data?.message} on Food API` ||
          'Terjadi kesalahan di API Food',
        'danger',
      );
    });
};

const setNewTaste = value => {
  return {
    type: 'SET_NEW_TASTE',
    value,
  };
};

const setPopular = value => {
  return {
    type: 'SET_POPULAR',
    value,
  };
};

const setRecommended = value => {
  return {
    type: 'SET_RECOMMENDED',
    value,
  };
};

export const getFoodByTypes = types => dispatch => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/food?types=${types}`)
    .then(result => {
      dispatch(setLoading(false));
      if (types === 'new_food') {
        dispatch(setNewTaste(result?.data?.data?.data));
      }

      if (types === 'popular') {
        dispatch(setPopular(result?.data?.data?.data));
      }

      if (types === 'recommended') {
        dispatch(setRecommended(result?.data?.data?.data));
      }
    })
    .catch(error => {
      dispatch(setLoading(false));
      showMessage(
        `${error?.response?.data?.message} on Food By Type API` ||
          'Terjadi kesalahan di API Food By Type',
        'danger',
      );
    });
};
