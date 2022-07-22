import africanData from './AfricanCapitals';
import asianData from './AsianCapitals';
import europeanData from './EuropeanCapitals';
import northAmericanData from './NorthAmericanCapitals';
import oceaniaData from './OceaniaCapitals';
import southAmericanData from './SouthAmericanCapitals';

// for each entry isolate the capitol name, the country name, plus three other random country names as an entry with the original country designated as the correct answer
// randomize the country names for each iteration, then once done, randomize the entries.

// for Capital to Country: data, prompt = capital, correctResponse = name, options = name
export const createQuiz = (data, prompt, option) => {
  const quiz = [];
  data.forEach((country, index) => {
    // generate 3 unique random number different that the current index and pull country names from those
    const nums = new Set();
    nums.add(index);
    while (nums.size !== 4) {
      nums.add(Math.floor(Math.random() * data.length));
    }
    const options = [];
    nums.forEach(number => {
      options.push(data[number][option]);
    });
    options.sort((a, b) => 0.5 - Math.random());
    const question = {
      prompt: {
        prompt: country[prompt],
        flag: country.flag,
      },
      options,
      correctResponse: country[option],
    };
    quiz.push(question);
  });
  return quiz.sort((a, b) => 0.5 - Math.random());
};

export const createCapToCounQuiz = dataName => {
  switch (dataName) {
    case 'european':
      return createQuiz(europeanData, 'capital', 'name');
    case 'sa':
      return createQuiz(southAmericanData, 'capital', 'name');
    case 'na':
      return createQuiz(northAmericanData, 'capital', 'name');
    case 'africa':
      return createQuiz(africanData, 'capital', 'name');
    case 'asia':
      return createQuiz(asianData, 'capital', 'name');
    case 'oceania':
      return createQuiz(oceaniaData, 'capital', 'name');
    case 'world':
      const newArray = europeanData
        .concat(southAmericanData)
        .concat(northAmericanData)
        .concat(africanData)
        .concat(asianData)
        .concat(oceaniaData);
      return createQuiz(newArray, 'capital', 'name');
  }
};

export const createCounToCapQuiz = dataName => {
  switch (dataName) {
    case 'european':
      return createQuiz(europeanData, 'name', 'capital');
    case 'sa':
      return createQuiz(southAmericanData, 'name', 'capital');
    case 'na':
      return createQuiz(northAmericanData, 'name', 'capital');
    case 'africa':
      return createQuiz(africanData, 'name', 'capital');
    case 'asia':
      return createQuiz(asianData, 'name', 'capital');
    case 'oceania':
      return createQuiz(oceaniaData, 'name', 'capital');
    case 'world':
      const newArray = europeanData
        .concat(southAmericanData)
        .concat(northAmericanData)
        .concat(africanData)
        .concat(asianData)
        .concat(oceaniaData);
      return createQuiz(newArray, 'name', 'capital');
  }
};
