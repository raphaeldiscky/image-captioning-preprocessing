## Data preprocessing step for <a href="https://github.com/raphaeldiscky/image-captioning" target="_blank">Image Captioning</a>:

1. `npm run mapping`
   - input: raw indonesian coco2014 dataset from rayandrew github
   - output: mapped captions dataset, train set and val set coco2014
2. `npm run karpathy`
   - input: mapped captions dataset, train set and val set coco2014
   - output: dataset with 113287 training samples and 10000 validation samples
3. `npm run create-captions-data`
   - input: karpathy train and val coco2014
   - output: sentence data which will later be used to get vocabs
4. train data
5. `npm run create-raw-indo`
   - input: raw indonesian coco2014 dataset from rayandrew github
   - output: train/val/test dataset with similar structure with raw coco2014 dataset but with indonesian captions

## Scripts descriptions:

### Mains

1. mapping.js
2. karpathy.js
3. text-data.js

### Extras

1. restructure.js: restructure data from raw english coco2014 dataset
2. translate.js: translate from restructured data from number 1
3. translate-raw.js: translate captions from raw english coco2014 dataset
