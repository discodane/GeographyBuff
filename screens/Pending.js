import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {Animated, StyleSheet, View, Text} from 'react-native';
import {createCapToCounQuiz, createCounToCapQuiz} from '../utils/utils';

const Pending = ({route, navigation}) => {
  const {type, scope} = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  let quizData;
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    quizData =
      type === 'cap2coun'
        ? createCapToCounQuiz(scope)
        : createCounToCapQuiz(scope);
    setTimeout(() => {
      navigation.navigate('Quiz', {
        quizData,
        quizTypeDescription: `${type}_${scope}`,
      });
    }, 3000);
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.tidbitHeader}>{'Did you know?'}</Text>
        <Animated.View
          style={{
            // Bind opacity to animated value
            opacity: fadeAnim,
          }}>
          <Text style={styles.tidbit}>
            {'Chad and Romania have the same flag?'}
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 15,
  },
  tidbitHeader: {
    fontSize: 25,
    paddingBottom: 20,
  },
  tidbit: {
    fontSize: 20,
  },
});

export default Pending;
