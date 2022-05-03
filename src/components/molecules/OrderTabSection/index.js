import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TabBar, SceneMap, TabView} from 'react-native-tab-view';
import ItemListFood from '../ItemListFood';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getOrder, getPastOrders} from '../../../redux/actions';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {inProgress} = useSelector(state => state.orderReducer);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(50).then(() => {
      dispatch(getOrder());
      dispatch(getInProgress());
      dispatch(getPastOrders());
      setRefreshing(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInProgress());
  }, [dispatch]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerInProgress}>
        {inProgress.length > 0 &&
          inProgress.map((value, indexInProgress) => {
            return (
              <ItemListFood
                key={indexInProgress}
                image={{uri: value.food.picturePath}}
                onPress={() => navigation.navigate('OrderDetail', value)}
                type="in-progress"
                items={value.quantity}
                price={value.total}
                name={value.food.name}
                date={value.created_at}
                status={value.status}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {pastOrders} = useSelector(state => state.orderReducer);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(50).then(() => {
      dispatch(getOrder());
      dispatch(getInProgress());
      dispatch(getPastOrders());
      setRefreshing(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPastOrders());
  }, [dispatch]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerPastOrders}>
        {pastOrders.length > 0 &&
          pastOrders.map((value, indexPastOrders) => {
            return (
              <ItemListFood
                key={indexPastOrders}
                image={{uri: value.food.picturePath}}
                onPress={() => navigation.navigate('OrderDetail', value)}
                type="past-orders"
                items={value.quantity}
                price={value.total}
                name={value.food.name}
                date={value.created_at}
                status={value.status}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const OrderTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'inProgress', title: 'In Progress'},
    {key: 'pastOrders', title: 'Past Orders'},
  ]);

  const initialLayout = {
    width: layout.width,
  };

  const renderScene = SceneMap({
    inProgress: InProgress,
    pastOrders: PastOrders,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
};

export default OrderTabSection;

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: 'white',
  },
  tabIndicator: {
    backgroundColor: '#020202',
    height: 3,
  },
  tabBarStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  tabStyle: {
    width: 'auto',
  },
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
  containerInProgress: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  containerPastOrders: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
