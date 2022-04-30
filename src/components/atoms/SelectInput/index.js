import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const SelectInput = ({
  label,
  placeholder,
  data = [],
  value,
  setValueChange,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => setValueChange(itemValue)}>
          <Picker.Item label={placeholder} value="" />
          {data.length > 0 &&
            data.map((res, index) => (
              <Picker.Item key={index} label={res} value={res} />
            ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
});
