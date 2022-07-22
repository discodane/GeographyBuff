import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Question from '../components/Question';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = ({route, navigation}) => {
  const {quizData, quizTypeDescription} = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [amountCorrect, setAmountCorrect] = useState(0);
  const [question, setQuestion] = useState([]);
  const [quizIsDone, setQuizIsDone] = useState();

  const handleQuit = () => {
    navigation.popToTop();
  };

  const reportAnswer = async isCorrect => {
    if (isCorrect) setAmountCorrect(amountCorrect + 1);
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizIsDone(true);
    }
  };

  useEffect(() => {
    setQuestion(quizData[0]);
  }, []);

  useEffect(() => {
    setQuestion(quizData[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    async function checkIfFinished() {
      if (quizIsDone) {
        // quiz is over
        let dbValue;
        try {
          // pull high score
          dbValue = await AsyncStorage.getItem(
            `@best_score_${quizTypeDescription}`,
          );
        } catch (e) {
          console.log('error reading value');
        }
        if (dbValue < amountCorrect) {
          // if the previous high score is less than the newly generated score
          try {
            await AsyncStorage.setItem(
              `@best_score_${quizTypeDescription}`,
              amountCorrect.toString(),
            ); // set new high score
          } catch (e) {
            console.log('error storing value');
          }
        }
        navigation.navigate('Results', {
          amountCorrect,
          outOf: quizData.length,
          previousScore: dbValue,
        });
      }
    }
    checkIfFinished();
  }, [quizIsDone]);

  return (
    <SafeAreaView style={styles.quizContainer}>
      <View style={styles.scoreArea}>
        <Text style={styles.scoreText}>
          {`Score: ${amountCorrect}/${quizData.length}`}
        </Text>
        <Button title="Quit" onPress={handleQuit} />
      </View>
      <View style={styles.questionNumberArea}>
        <Text style={styles.questionNumberText}>
          {`Question ${currentIndex + 1}`}
        </Text>
      </View>
      <View>
        <Question reportAnswer={reportAnswer} questionInfo={question} />
      </View>
    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  questionNumberArea: {
    alignItems: 'center',
    paddingTop: 25,
  },
  questionNumberText: {
    color: 'grey',
    fontSize: 15,
  },
  scoreArea: {
    padding: 15,
  },
  scoreText: {
    color: 'grey',
    fontSize: 25,
  },
});
