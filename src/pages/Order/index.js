import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {EmptyOrder, Header, OrderTabSection} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder} from '../../redux/actions';

const Order = () => {
  const dispatch = useDispatch();

  const {order} = useSelector(state => state.orderReducer);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <View style={styles.page}>
      {order.length > 0 ? (
        <View style={styles.content}>
          <Header title="Your Orders" subTitle="Wait for the best meal" />
          <View style={styles.tabContainer}>
            <OrderTabSection />
          </View>
        </View>
      ) : (
        <EmptyOrder />
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    marginTop: 24,
  },
});
