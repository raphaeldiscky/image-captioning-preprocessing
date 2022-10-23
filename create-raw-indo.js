import jsonFile from './annotations/captions_indo_rayandrew.json' assert { type: 'json' }
import rawValEnglish from './annotations/captions_raw_val2014_english.json' assert { type: 'json' }
import rawTestEnglish from './annotations/captions_raw_test2014_english.json' assert { type: 'json' }
import FileSystem from 'fs'

const DATA_TYPE = 'val2014'

function switchData() {
  if (DATA_TYPE === 'val2014') {
    return rawValEnglish
  } else if (DATA_TYPE === 'test2014') {
    return rawTestEnglish
  }
}

const selectedRawEnglishData = switchData()

// mapping from raw indonesian coco dataset from rayandrew github
async function createRaw() {
  let images = []
  let annotations = []

  jsonFile.images.forEach((item, i) => {
    console.log(
      'Mapping data: ',
      i,
      'of',
      jsonFile.images.length,
      'total images'
    )

    if (item.filepath === DATA_TYPE) {
      const data = { file_name: item.filename, id: item.cocoid }
      images.push(data)

      item.sentences.forEach((x) => {
        const obj = {}
        obj['image_id'] = item.cocoid
        obj['id'] = x.sentid
        obj['caption'] = x.raw
        annotations.push(obj)
      })
    }
  })

  let arr = {}
  arr['info'] = selectedRawEnglishData.info
  arr['images'] = images
  arr['licenses'] = selectedRawEnglishData.licenses
  arr['annotations'] = annotations

  return arr
}

const mappedData = await createRaw()

FileSystem.writeFile(
  `captions_raw_${DATA_TYPE}_indo.json`,
  JSON.stringify(mappedData),
  (error) => {
    if (error) {
      throw error
    }
  }
)
