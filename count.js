import indoValData from './saved_data/karpathy_val2014_indo.json' assert { type: 'json' }
import indoTrainData from './saved_data/karpathy_train2014_indo.json' assert { type: 'json' }
import textDataIndo from './saved_data/text_data_indo.json' assert { type: 'json' }

const indoValLength = Object.keys(indoValData).length
const indoTrainLength = Object.keys(indoTrainData).length
const indoTextLength = Object.keys(textDataIndo).length

console.log('karpathy indo val length: ', indoValLength)
console.log('karpathy indo train length: ', indoTrainLength)
console.log('indo text data: ', indoTextLength)

console.log(
  'supposed indo total text data:',
  (indoValLength + indoTrainLength) * 5,
  '\n'
)
