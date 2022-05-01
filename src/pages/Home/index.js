/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {FoodDummy1} from '../../assets';
import {FoodCard, Gap, HomeProfile, HomeTabSection} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodData} from '../../redux/actions';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {food} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodData());
  }, []);

  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.foodCardContainer}>
            <Gap width={24} />
            {food.length > 0 &&
              food.map((value, index) => {
                return (
                  <FoodCard
                    key={index}
                    image={
                      value?.picturePath
                        ? {uri: value?.picturePath}
                        : FoodDummy1
                    }
                    name={value?.name ?? '-'}
                    rating={value?.rate ?? 0}
                    onPress={() => navigation.navigate('FoodDetail', value)}
                  />
                );
              })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {
    flex: 1,
  },
});
