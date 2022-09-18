### Getting this to work

Rename `.sample.env` to `.env` and then go get some access keys from the IGDB / Twitch developer site and fill in the appropriate values. There is no even remotely secure way to put a private key or token into a React app, so this had to be done with functions.

### onCall vs. onRequest

`.onRequest` creates a minimal, generic HTTP request endpoint. It does not support CORS headers out of the box, and as a result can't be called from a javascript webapp without work. It also is just plain incompatible with the easy httpsCallable firebase function consumer.

If you're writing a client side app that is also using firebase services that is going to be calling your functions, you want to use `.onCall`

B.U.T. if you need to write a webhook or something else like that, use onRequest.

### The API made me do it

I was like "Ok, John needs to build an API-based webapp, I'll do something fun with an API to demo"

The version of this project I used to use with students used either the Yahoo Finance API for slightly out of date stock data (up to date stock data is extraordinarily expensive) or a fun little Pokemon API. I saw that there was a "IGDB" video game API and thought I'd try something new.

Well, it has crazy requirements, you've got to use private authentication keys to get an OAuth token and then it doesn't support CORS headers so a webapp can't call the API directly, you have to call it from the server and then pass that info down to the app.

Basically dealing with those two things are why there's a server component to this project.

If the API you are using doesn't have onerous authentication requirements and allows direct access from the web, you might not have to do any of this.

### But also, users are scum

Another big reason you might use cloud functions is you don't trust users to modify their own data. The access credentials for firebase are right there out in the open in your app and there's no avoiding that. That means a clever user can do any write (or read) to firestore that the access rules will permit them to make.

Sometimes that's not a problem and "a user can write whatever they want to their own account but not to someone else's" kind of restrictions are sufficient.

But if you are in a situation that involves less trust than that, you might want to lock down your firestore and have the data writing handled by intermediate cloud functions where you have way more control.

### Run on a timer

You can write cloud functions that execute at regularly scheduled times. It's been a couple of years since I've done that. I think it uses CRON syntax? Anyway, it's not hard.

### Other APIs

Send emails (Yahoo plays a little more nice with SMTP than gmail does), send text messages (Twilio is what you want for that), etc. etc. ad inf. Functions are useful, maybe most useful, for API integrations.

### Trigger warning puns are stupid

You can also have functions fire off when something happens on a different firebase service. User logs in? trigger a function. Firestore document gets created? Trigger a function. Upload a file to storage? (haven't talked about storage. It's not as good as AWS S3, but it can be good enough, and it interacts well with everything else) Trigger a function.

### This shit is cool

It's kind of amazing how easy all of this got. Not like, easy easy, but once you're in the groove, features that sound kind of insane can be turned around in like 4 hours.

### Firestore Extensions

For more magic, check those out. Need to do for-real data analytics of your firestore data? Send emails with just a db write? I dunno? Live chat? There's all kinds of things. It gets pretty nuts.