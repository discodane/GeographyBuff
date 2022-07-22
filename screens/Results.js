import React from 'react';
import {Button, Text, View, SafeAreaView, StyleSheet} from 'react-native';

const calculateAdjective = percentage => {
  switch (true) {
    case percentage === 1:
      return 'you must be smart';
    case percentage > 0.75:
      return 'not bad';
    case percentage > 0.25:
      return 'less partying more studying';
    default:
      return 'have you tried art?`';
  }
};

const renderProgress = (amountCorrect, previousScore) => {
  console.log(amountCorrect, previousScore);
  if (!previousScore) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  } else {
    if (amountCorrect > previousScore) {
      return (
        <View>
          <Text>{'New Record!'}</Text>
        </View>
      );
    } else if (amountCorrect === previousScore) {
      return (
        <View>
          <Text>{'About as good as ever'}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>{'What happened to you?'}</Text>
        </View>
      );
    }
  }
};

const Results = ({route, navigation}) => {
  const {amountCorrect, outOf, previousScore} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.score}>
          {amountCorrect}/{outOf}
        </Text>
      </View>
      <View>
        <Text style={styles.score}>
          {calculateAdjective(amountCorrect / outOf)}
        </Text>
      </View>
      <View>
        <Text style={styles.score}>
          {renderProgress(amountCorrect, previousScore)}
        </Text>
      </View>
      <View style={styles.buttonArea}>
        <Button title="Done" onPress={() => navigation.popToTop()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonArea: {
    bottom: 30,
    position: 'absolute',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  score: {
    fontSize: 30,
  },
});

export default Results;
