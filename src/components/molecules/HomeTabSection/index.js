import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FoodDummy1} from '../../../assets';
import ItemListFood from '../ItemListFood';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodByTypes} from '../../../redux/actions';

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

const NewTaste = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {newTaste} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodByTypes('new_food'));
  }, [dispatch]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(50).then(() => {
      dispatch(getFoodByTypes('new_food'));
      dispatch(getFoodByTypes('popular'));
      dispatch(getFoodByTypes('recommended'));
      setRefreshing(false);
    });
  }, [dispatch]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerNewTaste}>
        {newTaste.length > 0 &&
          newTaste.map((value, indexNewTaste) => {
            return (
              <ItemListFood
                key={indexNewTaste}
                onPress={() => navigation.navigate('FoodDetail', value)}
                name={value?.name}
                price={value?.price}
                rating={value?.rate}
                image={
                  value?.picturePath ? {uri: value?.picturePath} : FoodDummy1
                }
                type="product"
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {popular} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodByTypes('popular'));
  }, [dispatch]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(50).then(() => {
      dispatch(getFoodByTypes('new_food'));
      dispatch(getFoodByTypes('popular'));
      dispatch(getFoodByTypes('recommended'));
      setRefreshing(false);
    });
  }, [dispatch]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerNewTaste}>
        {popular.length > 0 &&
          popular.map((value, indexPopular) => {
            return (
              <ItemListFood
                key={indexPopular}
                onPress={() => navigation.navigate('FoodDetail', value)}
                name={value?.name}
                price={value?.price}
                rating={value?.rate}
                image={
                  value?.picturePath ? {uri: value?.picturePath} : FoodDummy1
                }
                type="product"
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const Recommended = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {recommended} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodByTypes('recommended'));
  }, [dispatch]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(50).then(() => {
      dispatch(getFoodByTypes('new_food'));
      dispatch(getFoodByTypes('popular'));
      dispatch(getFoodByTypes('recommended'));
      setRefreshing(false);
    });
  }, [dispatch]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerNewTaste}>
        {recommended.length > 0 &&
          recommended.map((value, indexRecommended) => {
            return (
              <ItemListFood
                key={indexRecommended}
                onPress={() => navigation.navigate('FoodDetail', value)}
                name={value?.name}
                price={value?.price}
                rating={value?.rate}
                image={
                  value?.picturePath ? {uri: value?.picturePath} : FoodDummy1
                }
                type="product"
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const HomeTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newTaste', title: 'New Taste'},
    {key: 'popular', title: 'Popular'},
    {key: 'recommended', title: 'Recommended'},
  ]);

  const initialLayout = {
    width: layout.width,
  };

  const renderScene = SceneMap({
    newTaste: NewTaste,
    popular: Popular,
    recommended: Recommended,
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

export default HomeTabSection;

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: 'white',
  },
  indicator: {
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
  containerNewTaste: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  containerPopular: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  containerRecommended: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
