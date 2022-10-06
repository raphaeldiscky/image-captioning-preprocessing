import mappedTrainData from './karpathy_train2014_indo.json' assert { type: 'json' }
import mappedValData from './karpathy_val2014_indo.json' assert { type: 'json' }
import FileSystem from 'fs'

// @Function: Create text data from mapped data
async function createTextData() {
  let arrTrain = []
  let arrVal = []

  for (const item in mappedTrainData) {
    console.log('Mapping data: ', item)
    const captionsList = mappedTrainData[item]
    for (const caption of captionsList) {
      arrTrain.push(caption)
    }
  }

  for (const item in mappedValData) {
    console.log('Mapping data: ', item)
    const captionsList = mappedValData[item]
    for (const caption of captionsList) {
      arrVal.push(caption)
    }
  }
  const mergedData = arrTrain.concat(arrVal)

  return mergedData
}

const newArr = await createTextData()

FileSystem.writeFile(`text_data_indo.json`, JSON.stringify(newArr), (error) => {
  if (error) {
    throw error
  }
})
