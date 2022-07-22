import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Animated,
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import quizTypeData from '../utils/QuizTypes.json';
import quizScopeData from '../utils/QuizScopes.json';

const Home = ({navigation}) => {
  const [quizTypeValue, setQuizTypeValue] = useState(quizTypeData[0].value);
  const [quizScopeValue, setQuizScopeValue] = useState(quizScopeData[0].value);

  getTransform = () => {
    let transform = {
      transform: [{perspective: 400}, {rotateX: '180deg'}],
    };
    return withAnchorPoint(
      transform,
      {x: 0.5, y: 0.5},
      {width: 200, height: 200},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>{'Geography Buff'}</Text>
      </View>
      <View>
        <Text style={styles.pickerLabels}>{'Quiz Type:'}</Text>
        <Picker
          selectedValue={quizTypeValue}
          onValueChange={(itemValue, itemIndex) => setQuizTypeValue(itemValue)}>
          {quizTypeData.map(type => (
            <Picker.Item
              key={type.label}
              label={type.label}
              value={type.value}
            />
          ))}
        </Picker>
      </View>
      <View>
        <Text style={styles.pickerLabels}>{'Scope:'}</Text>
        <Picker
          selectedValue={quizScopeValue}
          onValueChange={(itemValue, itemIndex) =>
            setQuizScopeValue(itemValue)
          }>
          {quizScopeData.map(scope => (
            <Picker.Item
              key={scope.label}
              label={scope.label}
              value={scope.value}
            />
          ))}
        </Picker>
      </View>
      <View>
        <Button
          title="Let's Go"
          onPress={() =>
            navigation.navigate('Pending', {
              type: quizTypeValue,
              scope: quizScopeValue,
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerSection: {
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 125,
  },
  pickerLabels: {
    fontSize: 20,
  },
  redBlock: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
  },
});
