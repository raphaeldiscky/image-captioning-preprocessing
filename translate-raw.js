import translate from 'google-translate-api-x'
import jsonFile from './annotations/captions_raw_val2014_english.json' assert { type: 'json' }
import FileSystem from 'fs'

async function translateData(first_data, last_data) {
  const arr = []
  const annotationsArr = []
  for (let i = first_data; i < last_data; i++) {
    console.log('Translating image: ', i, 'of', last_data)
    const translatedText = await translate(jsonFile.annotations[i].caption, {
      to: 'id'
    }).then((res) => res.text)
    const filteredText = translatedText.replace('-', ' ')
    jsonFile.annotations[i].caption = filteredText
    annotationsArr.push(jsonFile.annotations[i])
  }
  arr.push({
    annotations: annotationsArr
  })

  const translatedArr = arr.shift()

  FileSystem.writeFile(
    `translated_raw_val2014_${first_data}_to_${last_data}.json`,
    JSON.stringify(translatedArr),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

translateData(0, 1000)
