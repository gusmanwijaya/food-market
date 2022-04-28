import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TabBar, SceneMap, TabView} from 'react-native-tab-view';
import {ItemListFood} from '../../../components';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';

const OrderTabSection = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'inProgress', title: 'In Progress'},
    {key: 'pastOrders', title: 'Past Orders'},
  ]);

  const initialLayout = {
    width: layout.width,
  };

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

  const InProgress = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerInProgress}>
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          type="in-progress"
          items={2}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          type="in-progress"
          items={2}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy3}
          price={20000}
          type="in-progress"
          items={2}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy4}
          price={20000}
          type="in-progress"
          items={2}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          type="in-progress"
          items={2}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          type="in-progress"
          items={2}
        />
      </View>
    </ScrollView>
  );

  const PastOrders = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerPastOrders}>
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy4}
          price={20000}
          items={2}
          status="Progress"
          type="past-orders"
          date={1600841258000}
          onPress={() => navigation.navigate('OrderDetail')}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy3}
          price={20000}
          items={2}
          status="Progress"
          type="past-orders"
          date={1600841258000}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          items={2}
          status="Progress"
          type="past-orders"
          date={1600841258000}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          items={2}
          status="Progress"
          type="past-orders"
          date={1600841258000}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          items={2}
          status="Progress"
          type="past-orders"
          date={1600841258000}
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          items={2}
          status="Progress"
          type="past-orders"
          date={1600841258000}
        />
      </View>
    </ScrollView>
  );

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
