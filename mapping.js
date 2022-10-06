import jsonFile from './annotations/coco2014_captions_indo.json' assert { type: 'json' }
import FileSystem from 'fs'

const DATA_TYPE = 'val2014'

// Mapping from raw indonesian coco dataset from rayandrew github
async function mappingForCaptioning() {
  let arr = [{}]

  jsonFile.images.forEach((item, i) => {
    console.log(
      'Mapping data: ',
      i,
      'of',
      jsonFile.images.length,
      'total images'
    )

    if (item.filepath === DATA_TYPE) {
      let key = `coco/${item.filepath}/${item.filename}`
      arr[0][key] = item.sentences.slice(0, 5).map((x) => `sos ${x.raw} eos`)
    }
  })
  return arr.shift()
}

const mappedData = await mappingForCaptioning()

console.log(
  'Original data length',
  jsonFile.images.length,
  `${DATA_TYPE} data length: `,
  Object.keys(mappedData).length
)

FileSystem.writeFile(
  `mapped_captions_${DATA_TYPE}_indo.json`,
  JSON.stringify(mappedData),
  (error) => {
    if (error) {
      throw error
    }
  }
)
