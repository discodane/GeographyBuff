import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const QuestionOption = props => {
  const {textString, handlePress, index, selected} = props;

  return (
    <TouchableOpacity onPress={() => handlePress(index)}>
      <View
        style={[
          styles.optionCard,
          {backgroundColor: selected ? 'blue' : null},
        ]}>
        <Text style={[styles.optionText, {color: selected ? 'white' : null}]}>
          {textString}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuestionOption;

const styles = StyleSheet.create({
  optionCard: {
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 5,
    borderStyle: 'solid',
    marginVertical: 20,
    width: '100%',
  },
  optionText: {
    fontSize: 30,
    fontWeight: '500',
  },
});
