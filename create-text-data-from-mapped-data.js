import mappedTrainData from './mapped_captions_train2014.json' assert { type: 'json' }
import mappedValData from './mapped_captions_val2014.json' assert { type: 'json' }
import FileSystem from 'fs'

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

FileSystem.writeFile(`text_data.json`, JSON.stringify(newArr), (error) => {
  if (error) {
    throw error
  }
})
