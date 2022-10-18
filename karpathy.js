import indoValData from './saved_data/mapped_captions_val2014_indo.json' assert { type: 'json' }
import indoTrainData from './saved_data/mapped_captions_train2014_indo.json' assert { type: 'json' }
import FileSystem from 'fs'

async function getKarpathy() {
  const sliceVal = Object.keys(indoValData)
    .slice(0, 30504)
    .reduce((res, key) => {
      res[key] = indoValData[key]
      return res
    }, {})

  const valRemainder = Object.keys(indoValData)
    .slice(30504)
    .reduce((res, key) => {
      res[key] = indoValData[key]
      return res
    }, {})

  const newTrainObj = { ...indoTrainData, ...sliceVal }

  FileSystem.writeFile(
    `./saved_data/karpathy_train2014_indo.json`,
    JSON.stringify(newTrainObj),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
  FileSystem.writeFile(
    `./saved_data/karpathy_val2014_indo.json`,
    JSON.stringify(valRemainder),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

getKarpathy()
