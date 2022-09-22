### Getting these specific functions to work

The instructions for getting this project working are in the base directory's MAKEMEWORK.md but

Rename `.sample.env` to `.env` and then go get some access keys from the IGDB / Twitch developer site and fill in the appropriate values. There is no even remotely secure way to put a private key or token into a React app, so this had to be done with functions.

### Basic info

This line I added in `package.json`

`  "type": "module",`

Means that the functions use `import X from "y"` module syntax instead of the much (IMO) dumber `const X = require('y')` syntax.

Functions are declared in `index.js` but there's nothing stopping you from breaking that out into multiple files and using imports to pull them all into index. This is just a small project so I didn't bother.

`npm run lint` on the command line will check for basic dumb errors in the functions without having to deploy first

### onCall vs. onRequest

`.onRequest` creates a minimal, generic HTTP request endpoint. It does not support CORS headers out of the box, and as a result can't be called from a javascript webapp without work. It also is just plain incompatible with the easy httpsCallable firebase function consumer.

If you're writing a client side app that is also using firebase services that is going to be calling your functions, you want to use `.onCall`

B.U.T. if you need to write a webhook or something else like that, use onRequest.

Their documentation is not clear enough on this point, IMO (I lost a whole day to this a couple of years ago and I'm still mad)

## Why use functions

Well first,
### I did not plan on using functions in this project

I was like "Ok, I'm demo-ing for someone who wants to build an API-based webapp, I'll do something fun with an API"

The version of this project I used to use with students used either the Yahoo Finance API for slightly out of date stock data (up to date stock data is extraordinarily expensive) or a fun little Pokemon API. I saw that there was an "IGDB" video game database API and thought I'd try something new.

Well, it has kinda strict requirements, you've got to use private authentication keys to get an OAuth token and then it doesn't support CORS headers so a webapp can't call the API directly, you have to call it from the server and then pass that info down on to the app.

If the API you are using doesn't have onerous authentication requirements and allows direct access from the web, you might not have to do any of this though. Try just making some axios calls to whatever API your project uses directly from within React, see if that works and maybe avoid a headache.

Just remember that anything in your React code is naked and public to the web. If your API requires a secret key to use, you're going to need to have at least some of your process in cloud functions.

### But also, users are scum

Another big reason you might use cloud functions is you don't trust users to modify their own data. The client access credentials for firebase are right there out in the open in your react app and there's no avoiding that. That means a clever user can do any write (or read) to firestore that the access rules will permit them to make.

Sometimes that's not a problem and simple "a user can write whatever they want to their own account but not to someone else's" kind of restrictions are sufficient.

But if you are in a situation that involves less trust than that, you might want to lock down your firestore and have the data writing handled by intermediate cloud functions where you have way more control.

### Run on a timer

You can write cloud functions that execute at regularly scheduled times. It's been a couple of years since I've done that. I think it uses CRON syntax to set up scheduling? I don't totally remember. Anyway, I don't remember it being difficult.

### Other APIs

Send emails (Yahoo plays a little more nice with SMTP than gmail does), send text messages (Twilio is what you want for that), etc. etc. ad inf.

### Trigger on other firebase services actions

You can also have functions fire off when something happens on a different firebase service. User logs in? trigger a function. Firestore document gets created? Trigger a function. Upload a file to storage? (haven't talked about firebase storage. It's not as good as AWS S3, but it can be good enough, and it interacts well with everything else) trigger a function.

### This shit is cool

It's kind of amazing how easy all of this got. Not like, easy easy, but once you're in the groove, features that sound pretty hard can be turned around in like 4-8 hours.

### Firestore Extensions

For more magic, check those out. Need to do for-real serious data analytics of your firestore data? Send emails with just a db write? I dunno? Live chat? There's all kinds of things.