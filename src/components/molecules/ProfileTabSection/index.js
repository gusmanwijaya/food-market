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
import ItemListMenu from '../ItemListMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Account = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await AsyncStorage.multiRemove(['token', 'userProfile']);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'SignIn',
        },
      ],
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerAccount}>
        <ItemListMenu
          text="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ItemListMenu text="Sign Out" onPress={handleSignOut} />
      </View>
    </ScrollView>
  );
};

const FoodMarket = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerFoodMarket}>
        <ItemListMenu text="Rate App" />
        <ItemListMenu text="Help Center" />
        <ItemListMenu text="Privacy & Policy" />
        <ItemListMenu text="Terms & Conditions" />
      </View>
    </ScrollView>
  );
};

const ProfileTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'account', title: 'Account'},
    {key: 'foodMarket', title: 'FoodMarket'},
  ]);

  const initialLayout = {
    width: layout.width,
  };

  const renderScene = SceneMap({
    account: Account,
    foodMarket: FoodMarket,
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

export default ProfileTabSection;

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
  containerAccount: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  containerFoodMarket: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
