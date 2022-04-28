import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';
import ItemListFood from '../ItemListFood';
import {useNavigation} from '@react-navigation/native';

const HomeTabSection = () => {
  const navigation = useNavigation();
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

  const NewTaste = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerNewTaste}>
        <ItemListFood
          onPress={() => navigation.navigate('FoodDetail')}
          name="Soup Bumil"
          price={20000}
          rating={3.5}
          image={FoodDummy1}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy3}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy4}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          rating={3.5}
          type="product"
        />
      </View>
    </ScrollView>
  );

  const Popular = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerNewTaste}>
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy4}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy3}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          rating={3.5}
          type="product"
        />
      </View>
    </ScrollView>
  );

  const Recommended = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerNewTaste}>
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy3}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy4}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy1}
          price={20000}
          rating={3.5}
          type="product"
        />
        <ItemListFood
          name="Soup Bumil"
          image={FoodDummy2}
          price={20000}
          rating={3.5}
          type="product"
        />
      </View>
    </ScrollView>
  );

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
