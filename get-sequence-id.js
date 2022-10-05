import jsonFile from './annotations/captions_train2014.json' assert { type: 'json' }
import FileSystem from 'fs'

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
      const id = item.image_id
      arr.push(id)
    } else {
      arr[indexOfExisting].image_id.push(item.image_id)
    }
  })

  console.log(
    'Original data length: ',
    jsonFile.images.length,
    'New array length: ',
    newArr.length
  )

  FileSystem.writeFile(
    'train_ids_sequence.json',
    JSON.stringify(arr),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

await restructureData()
