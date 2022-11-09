import jsonFile from './annotations/captions_indo_rayandrew.json' assert { type: 'json' }
import rawValEnglish from './annotations/captions_raw_val2014_english.json' assert { type: 'json' }
import FileSystem from 'fs'

// mapping from rayandrew data for val2014 to same structure as COCO Dataset val 2014
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

    if (item.filepath === 'val2014') {
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
  arr['info'] = rawValEnglish.info
  arr['images'] = images
  arr['licenses'] = rawValEnglish.licenses
  arr['annotations'] = annotations

  return arr
}

const mappedData = await createRaw()

FileSystem.writeFile(
  `./saved_data/captions_raw_val2014_indo.json`,
  JSON.stringify(mappedData),
  (error) => {
    if (error) {
      throw error
    }
  }
)
