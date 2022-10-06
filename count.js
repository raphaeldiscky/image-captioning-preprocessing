// indonesia
import indoValData from './mapped_captions_val2014_indo.json' assert { type: 'json' }
import indoTrainData from './mapped_captions_train2014_indo.json' assert { type: 'json' }
import textDataIndo from './text_data_indo.json' assert { type: 'json' }
// english
import englishValData from './mapped_captions_val2014_english.json' assert { type: 'json' }
import englishTrainData from './mapped_captions_train2014_english.json' assert { type: 'json' }
import englishTextData from './text_data_english.json' assert { type: 'json' }

const indoValLength = Object.keys(indoValData).length
const indoTrainLength = Object.keys(indoTrainData).length
const englishValLength = Object.keys(englishValData).length
const englishTrainLength = Object.keys(englishTrainData).length
const indoTextLength = Object.keys(textDataIndo).length
const englishTextLength = Object.keys(englishTextData).length

console.log('indo val length: ', indoValLength)
console.log('indo train length: ', indoTrainLength)
console.log('indo text data: ', indoTextLength)

console.log(
  'supposed indo total text data:',
  (indoValLength + indoTrainLength) * 5,
  '\n'
)

console.log('english val length: ', englishValLength)
console.log('english train length: ', englishTrainLength)
console.log('english text data: ', englishTextLength)

console.log(
  'supposed english total text data:',
  (englishValLength + englishTrainLength) * 5
)
