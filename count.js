import indoValData from './saved_data/karpathy_valtest2014_indo.json' assert { type: 'json' }
import indoTrainData from './saved_data/karpathy_train2014_indo.json' assert { type: 'json' }
import sentenceDataIndo from './saved_data/sentence_data_indo.json' assert { type: 'json' }

const indoValTestLength = Object.keys(indoValData).length
const indoTrainLength = Object.keys(indoTrainData).length
const indoTextLength = Object.keys(sentenceDataIndo).length

console.log('karpathy indo valtest length: ', indoValTestLength)
console.log('karpathy indo train length: ', indoTrainLength)
console.log('indo text data: ', indoTextLength)

console.log(
  'supposed indo total text data:',
  (indoValTestLength + indoTrainLength) * 5,
  '\n'
)
