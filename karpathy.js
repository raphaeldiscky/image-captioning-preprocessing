import indoValData from './mapped_captions_val2014_indo.json' assert { type: 'json' }
import indoTrainData from './mapped_captions_train2014_indo.json' assert { type: 'json' }
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

  console.log(Object.keys(newTrainObj).length)
  console.log(Object.keys(valRemainder).length)

  FileSystem.writeFile(
    `karpathy_train2014_indo.json`,
    JSON.stringify(newTrainObj),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
  FileSystem.writeFile(
    `karpathy_val2014_indo.json`,
    JSON.stringify(valRemainder),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

getKarpathy()
