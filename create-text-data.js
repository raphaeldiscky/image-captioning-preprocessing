import jsonFile from './annotations/coco2014_captions_indo.json' assert { type: 'json' }
import FileSystem from 'fs'

async function mappingForCaptioning() {
  let arr = []

  jsonFile.images.forEach((item, i) => {
    console.log(
      'Mapping data: ',
      i,
      'of',
      jsonFile.images.length,
      'total images'
    )
    item.sentences.map((x) => arr.push(`sos ${x.raw} eos`))
  })
  return arr
}

const newArr = await mappingForCaptioning()

console.log('New text data length: ', newArr.length)

FileSystem.writeFile(`text_data.json`, JSON.stringify(newArr), (error) => {
  if (error) {
    throw error
  }
})
