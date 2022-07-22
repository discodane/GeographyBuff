import React, {useState} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import QuestionOption from './QuestionOption';

const Question = props => {
  const {questionInfo} = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [errorText, setErrorText] = useState('');

  const handleOptionPress = index => {
    setErrorText('');
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === -1) {
      setErrorText('Please select an option');
      return;
    }
    const correct =
      questionInfo.options[selectedIndex] === questionInfo.correctResponse;
    props.reportAnswer(correct);
    setSelectedIndex(-1);
  };
  if (Object.keys(questionInfo).length === 0) return null;
  return (
    <SafeAreaView style={styles.questionContainer}>
      <View style={styles.questionSection}>
        <Text style={styles.question}>{questionInfo.prompt.prompt}</Text>
        <Image style={styles.tinyLogo} source={questionInfo.prompt.flag} />
      </View>
      <View style={styles.errorArea}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
      <View style={styles.optionSection}>
        <QuestionOption
          selected={selectedIndex == '0'}
          index="0"
          textString={questionInfo.options[0]}
          handlePress={handleOptionPress}
        />
        <QuestionOption
          selected={selectedIndex == '1'}
          index="1"
          textString={questionInfo.options[1]}
          handlePress={handleOptionPress}
        />
        <QuestionOption
          selected={selectedIndex == '2'}
          index="2"
          textString={questionInfo.options[2]}
          handlePress={handleOptionPress}
        />
        <QuestionOption
          selected={selectedIndex == '3'}
          index="3"
          textString={questionInfo.options[3]}
          handlePress={handleOptionPress}
        />
      </View>
      <View style={styles.submitButton}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default Question;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  errorArea: {
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  questionContainer: {
    height: '100%',
  },
  question: {
    fontSize: 30,
    fontWeight: '500',
  },
  optionSection: {
    marginHorizontal: 15,
  },
  questionSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  submitButton: {
    alignContent: 'center',
    width: '100%',
  },
});
