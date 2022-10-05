import translate from 'google-translate-api-x'
import jsonFile from './restructured_data.json' assert { type: 'json' }
import FileSystem from 'fs'

async function translateData() {
  const arr = []
  for (let i = 0; i < jsonFile.length; i++) {
    console.log('Translating image: ', i, 'of', jsonFile.length)
    for (let j = 0; j < jsonFile[i].caption.length; j++) {
      const translatedText = await translate(jsonFile[i].caption[j], {
        to: 'id'
      }).then((res) => res.text)
      const filteredText = translatedText.replace('-', ' ')
      jsonFile[i].caption[j] = filteredText
    }
    arr.push({
      ...jsonFile[i]
    })
  }
  return arr
}

const translatedArr = await translateData()

console.log(
  'Original data length',
  jsonFile.length,
  'New data length: ',
  translatedArr.length
)

FileSystem.writeFile(
  'translated_data.json',
  JSON.stringify(translatedArr),
  (error) => {
    if (error) {
      throw error
    }
  }
)
