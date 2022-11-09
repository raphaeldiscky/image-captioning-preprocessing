import mappedTrainData from './saved_data/mapped_captions_train2014_indo.json' assert { type: 'json' }
import mappedValData from './saved_data/mapped_captions_val2014_indo.json' assert { type: 'json' }
import FileSystem from 'fs'

// create text data from indonesian mapped data after mapping
async function createTextData() {
  let arrTrain = []
  let arrVal = []

  for (const item in mappedTrainData) {
    console.log('Mapping data: ', item)
    const captionsList = mappedTrainData[item]
    for (const caption of captionsList) {
      arrTrain.push(`<start> ${caption} <end>`)
    }
  }

  for (const item in mappedValData) {
    console.log('Mapping data: ', item)
    const captionsList = mappedValData[item]
    for (const caption of captionsList) {
      arrVal.push(`<start> ${caption} <end>`)
    }
  }
  const mergedData = arrTrain.concat(arrVal)

  return mergedData
}

const newArr = await createTextData()

FileSystem.writeFile(
  `./saved_data/text_data_indo.json`,
  JSON.stringify(newArr),
  (error) => {
    if (error) {
      throw error
    }
  }
)
