gcloud beta functions deploy recieveNewImageMetadata --trigger-resource kyc-bucket-mb --trigger-event google.storage.object.finalize

*TIME SPENT*
I spent a total of about 8 hours reading (one day), 7 hours coding and documenting (one day).
Please note that the only computers I had access to were library computers, which I couldn't install software on, and a borrowed laptop with a Swedish keyboard (which has unfamiliar locations for all symbols). I would have accomplished more if I had access to a better suited computer.

*ACCOMPLISHED*
Please note that I don't know Javascript or nodejs, and I have never used Google Cloud before. I thought this would be a good opportunity to learn about a lot of things.

The codebase is called when a bucket (kyc-bucket-mb) recieves a new file. It sends the file to the Google Vision API, recieves a list of tags, and checks the tags

It does not send emails 15 minutes after the last meal. In order to do that I would create a second bucket that contains a text file that has the time of the last meal in it, sleep the function that created the last meal, and when the sleep is over send an email if appropriate.

*HOW TO RUN*
Deploy on Google Cloud, create a bucket, set trigger by:
gcloud beta functions deploy recieveNewImageMetadata --trigger-resource [YOUR_BUCKET] --trigger-event google.storage.object.finalize

*WHY I IMPLEMENTED AS I DID*
I chose Google Cloud because I thought it would be easier to integrate with the Vision API. It would have been just as easy to work with that API on AWS, but I didn't know that when I started.
I chose nodejs because the majority of the sample code for Google Cloud is written in nodejs, so it was easier to transfer new knowledge. I also welcomed the opportunity to learn something new.


*WHAT I WOULD DO DIFFERENTLY*
I would have put in exception handling. I would have deleted the image when I was done with it. I would have done unit tests. I wouldn't have used a language that I was new to me.

