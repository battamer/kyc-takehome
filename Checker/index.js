/*
 * https://cloud.google.com/functions/docs/calling/storage
 * https://cloud.google.com/functions/docs/tutorials/ocr#windows
 * https://github.com/thesandlord/samples/blob/master/cloud-vision-nodejs/index.js#L52
 * https://github.com/googleapis/nodejs-vision/blob/master/samples/detect.js
*/

// [START functions_ocr_setup]
// const config = require('./config.json');

// Get a reference to the Pub/Sub component
const pubsub = require('@google-cloud/pubsub')();
// Get a reference to the Cloud Storage component
const storage = require('@google-cloud/storage')();
// Get a reference to the Cloud Vision API component
const vision = require('@google-cloud/vision')();

const acceptableTags = {'fish':1, 'bread':1, 'milk':1}

const Buffer = require('safe-buffer').Buffer;


exports.recieveNewImageMetadata = (event, callback) => {
  const file = event.data;
  const context = event.context;

  const foundFood = detectTags(file.bucket, file.name, file.timeCreated)
  callback();
};

function detectTags (bucketName, filename, timeCreated) {
//	var types = ['labels']
	var foundFood = 0;
	vision
		.labelDetection({ source: { imageUri: `gs://${bucketName}/${filename}` } })
		.then(results => {
			const labels = results[0].labelAnnotations;
			console.log('Labels:');
			labels.forEach(label => {
				if(label.description in acceptableTags && label.score >= .5)  {
					console.log(`FOOD: ${label.description} ${label.score}`);
					foundFood = 1;
				} else {					
					console.log(`NOT FOOD: ${label.description} ${label.score}`);
				}
			})
		})
		.then(() => {
				if (foundFood) {
					console.log(`	 Food uploaded at: ${timeCreated}`);
				} else {
					console.log(`	 Upload was not food`);
				}
		});
 }
