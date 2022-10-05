import translate from 'google-translate-api-x'
import jsonFile from './annotations/captions_train2014.json' assert { type: 'json' }
import FileSystem from 'fs'

async function translateData() {
  const arr = []
  const annotationsArr = []
  for (let i = 0; i < jsonFile.annotations; i++) {
    console.log('Translating image: ', i, 'of', jsonFile.annotations.length)
    const translatedText = await translate(jsonFile.annotations[i].caption, {
      to: 'id'
    }).then((res) => res.text)
    const filteredText = translatedText.replace('-', ' ')
    jsonFile.annotations[i].caption = filteredText
    annotationsArr.push(jsonFile.annotations[i])
  }
  arr.push({
    info: jsonFile.info,
    images: jsonFile.images,
    licenses: jsonFile.licenses,
    annotations: annotationsArr
  })
  return arr.shift()
}

const translatedArr = await translateData()
console.log(translatedArr)
console.log(
  'Original annotations data length',
  jsonFile.annotations.length,
  'New annotations data length: ',
  translatedArr.annotations.length
)

FileSystem.writeFile(
  'translated_data_train2014_raw.json',
  JSON.stringify(translatedArr),
  (error) => {
    if (error) {
      throw error
    }
  }
)
