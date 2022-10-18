import jsonFile from './annotations/captions_raw_train2014_english.json' assert { type: 'json' }
import FileSystem from 'fs'

// Restructure from raw english coco dataset
async function restructureData() {
  const arr = []

  jsonFile.annotations.forEach(async (item, i) => {
    console.log(
      'Restructuring data: ',
      i,
      'of',
      jsonFile.annotations.length,
      'annotations'
    )
    const indexOfExisting = arr.findIndex((x) => x.image_id === item.image_id)

    if (indexOfExisting === -1) {
      const translatedText = item.caption
      const newData = {
        image_id: item.image_id,
        caption: [translatedText]
      }
      arr.push(newData)
    } else if (
      arr.find((x) => x.image_id === item.image_id).caption.length < 5
    ) {
      arr[indexOfExisting].caption.push(item.caption)
    }
  })

  let merged = []

  for (let i = 0; i < arr.length; i++) {
    merged.push({
      ...arr[i],
      ...jsonFile.images.find((x) => x.id === arr[i].image_id)
    })
  }

  for (let i = 0; i < merged.length; i++) {
    delete merged[i].height
    delete merged[i].width
    delete merged[i].date_captured
    delete merged[i].flickr_url
    delete merged[i].id
    delete merged[i].license
    delete merged[i].coco_url
  }

  return merged
}

const newArr = await restructureData()

console.log(
  'Original data length: ',
  jsonFile.images.length,
  'New array length: ',
  newArr.length
)

FileSystem.writeFile(
  'restructured_data_train2014_english.json',
  JSON.stringify(newArr),
  (error) => {
    if (error) {
      throw error
    }
  }
)
