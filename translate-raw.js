import translate from 'google-translate-api-x'
import jsonFile from './annotations/captions_train2014.json' assert { type: 'json' }
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
    `translated_data_train2014_raw_${first_data}_to_${last_data}.json`,
    JSON.stringify(translatedArr),
    (error) => {
      if (error) {
        throw error
      }
    }
  )
}

// translateData(0, 20705)
// translateData(20705, 41410)
// translateData(41410, 62115)
// translateData(62115, 82820)
// translateData(82820, 103525)
// translateData(103525, 124230)
// translateData(124230, 144935)
// translateData(144935, 165640)
// translateData(165640, 186345)
// translateData(186345, 207050)
// translateData(207050, 227755)
// translateData(227755, 248460)
// translateData(248460, 269165)
// translateData(269165, 289870)
// translateData(289870, 310575)
// translateData(310575, 331280)
// translateData(331280, 351985)
// translateData(351985, 372690)
// translateData(372690, 393395)
// translateData(393395, 414100)
// translateData(414100, 414112)
