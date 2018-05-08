/*
 * References used
 * https://cloud.google.com/functions/docs/tutorials/ocr#windows
 * https://github.com/thesandlord/samples/blob/master/cloud-vision-nodejs/index.js#L52
 * https://github.com/googleapis/nodejs-vision/blob/master/samples/detect.js
*/

// Unused, for use when implementing the timer feature
// Get a reference to the Cloud Storage component 
// const storage = require('@google-cloud/storage')();

// Get a reference to the Cloud Vision API component
const vision = require('@google-cloud/vision')();

const acceptableTags = {'fish':1, 'bread':1, 'milk':1}

// Triggered by finalize for kyc-bucket-mb
exports.recieveNewImageMetadata = (event, callback) => {
  const file = event.data;
  const context = event.context;
  
  detectTags(file.bucket, file.name, file.timeCreated).
  callback();
};

// Sends a file from kyc-bucket-mb to Vision API, recieves tags, processes tags
function detectTags (bucketName, filename, timeCreated) {
	var foundFood = 0;
	// vision.labelDetection returns a Promise object
	vision
		.labelDetection({ source: { imageUri: `gs://${bucketName}/${filename}` } })
		.then(results => {
			// results is a list of items returned by the Vision API, 
			// results[0] contains the object containing the tags
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
					// Insert code to implemet the timer
				} else {
					console.log(`	 Upload was not food`);
				}
		});
 }
