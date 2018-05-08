/*
 * https://cloud.google.com/functions/docs/calling/storage
 * https://cloud.google.com/functions/docs/tutorials/ocr#windows
*/
'use strict';

// [START functions_ocr_setup]
// const config = require('./config.json');

// Get a reference to the Pub/Sub component
const pubsub = require('@google-cloud/pubsub')();
// Get a reference to the Cloud Storage component
const storage = require('@google-cloud/storage')();
// Get a reference to the Cloud Vision API component
const vision = require('@google-cloud/vision')();

const Buffer = require('safe-buffer').Buffer;


exports.recieveNewImage = (event, callback) => {
  const file = event.data;
  const context = event.context;

  console.log(`Event ${context.eventId}`);
  console.log(`  Event Type: ${context.eventType}`);
  console.log(`  Bucket: ${file.bucket}`);
  console.log(`  File: ${file.name}`);
  console.log(`  Metageneration: ${file.metageneration}`);
  console.log(`  Created: ${file.timeCreated}`);
  console.log(`  Updated: ${file.updated}`);

  callback();
};