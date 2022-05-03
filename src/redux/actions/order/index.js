import axios from 'axios';
import {API_HOST} from '../../../configs';
import {showMessage, getData} from '../../../utils';
import {setLoading} from '../global';

const setOrder = value => {
  return {
    type: 'SET_ORDER',
    value,
  };
};

export const getOrder = () => dispatch => {
  dispatch(setLoading(true));
  getData('token').then(resToken => {
    axios
      .get(`${API_HOST.url}/transaction`, {
        headers: {
          Authorization: resToken,
        },
      })
      .then(result => {
        dispatch(setLoading(false));
        dispatch(setOrder(result?.data?.data?.data));
      })
      .catch(error => {
        dispatch(setLoading(false));
        showMessage(
          `${error?.response?.data?.message} on Transaction API` ||
            'Terjadi Kesalahan di API Transaction',
        );
      });
  });
};

const setInProgress = value => {
  return {
    type: 'SET_IN_PROGRESS',
    value,
  };
};

export const getInProgress = () => dispatch => {
  dispatch(setLoading(true));
  getData('token').then(resToken => {
    axios
      .all([
        axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
          headers: {
            Authorization: resToken,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
          headers: {
            Authorization: resToken,
          },
        }),
      ])
      .then(
        axios.spread((resultPending, resultOnDelivery) => {
          dispatch(setLoading(false));
          const pending = resultPending?.data?.data?.data;
          const onDelivery = resultOnDelivery?.data?.data?.data;
          dispatch(setInProgress([...pending, ...onDelivery]));
        }),
      )
      .catch(error => {
        dispatch(setLoading(false));
        showMessage(
          `${error?.response?.data?.message} on In Progress API` ||
            'Terjadi Kesalahan di In Progress API',
        );
      });
  });
};

const setPastOrders = value => {
  return {
    type: 'SET_PAST_ORDERS',
    value,
  };
};

export const getPastOrders = () => dispatch => {
  dispatch(setLoading(true));
  getData('token').then(resToken => {
    axios
      .all([
        axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
          headers: {
            Authorization: resToken,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
          headers: {
            Authorization: resToken,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
          headers: {
            Authorization: resToken,
          },
        }),
      ])
      .then(
        axios.spread((resultCancelled, resultSuccess, resultDelivered) => {
          dispatch(setLoading(false));
          const cancelled = resultCancelled?.data?.data?.data;
          const success = resultSuccess?.data?.data?.data;
          const delivered = resultDelivered?.data?.data?.data;
          dispatch(setPastOrders([...cancelled, ...success, ...delivered]));
        }),
      )
      .catch(error => {
        dispatch(setLoading(false));
        showMessage(
          `${error?.response?.data?.message} on Past Orders API` ||
            'Terjadi Kesalahan di Past Orders API',
        );
      });
  });
};
