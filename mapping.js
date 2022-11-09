import jsonFile from './annotations/captions_indo_rayandrew.json' assert { type: 'json' }
import FileSystem from 'fs'

const DATA_TYPE = 'val2014'

// Mapping from raw indonesian coco dataset from rayandrew github
async function mappingForCaptioning() {
  let mappedData = {}

  jsonFile.images.forEach((item, i) => {
    if (item.filepath === DATA_TYPE) {
      let key = `datasets/${item.filepath}/${item.filename}`
      mappedData[key] = item.sentences.slice(0, 5).map((x) => x.raw)
    }
  })
  return mappedData
}

const mappedData = await mappingForCaptioning()

console.log(
  'Original data length',
  jsonFile.images.length,
  `${DATA_TYPE} data length: `,
  Object.keys(mappedData).length
)

const folderName = 'saved_data'

if (!FileSystem.existsSync(folderName)) {
  FileSystem.mkdirSync(folderName)
}

FileSystem.writeFile(
  `./saved_data/mapped_captions_${DATA_TYPE}_indo.json`,
  JSON.stringify(mappedData),
  (error) => {
    if (error) {
      throw error
    }
  }
)
