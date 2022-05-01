/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IcMin, IcPlus} from '../../../assets';

const Counter = ({onValueChange}) => {
  const [value, setValue] = useState(1);

  const onCount = type => {
    let result = value;

    if (type === 'plus') {
      result = value + 1;
    }

    if (type === 'minus') {
      if (value > 1) {
        result = value - 1;
      }
    }

    setValue(result);
    onValueChange(result);
  };

  useEffect(() => {
    onValueChange(value);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onCount('minus')} activeOpacity={0.7}>
        <IcMin />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={() => onCount('plus')} activeOpacity={0.7}>
        <IcPlus />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginHorizontal: 10,
  },
});
