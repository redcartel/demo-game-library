# Making this project work

The README's pretty much assume you're building your own project from scratch looking at this one for guidance. But if you just want to get this project working, here are the steps.

## Sign up for the IGDB API

https://api-docs.igdb.com/#about

You'll need a Twitch account with two-factor turned on.

## Put the values in the functions/.env file

*Private and even deployment-specific public data shouldn't be checked into files of a git repo, even if it's a private repo*

Look at sample.env, copy it to `functions/.env` you want the values you got from Twitch to be in CLIENT_ID and CLIENT_SECRET.

## Sign up for Firebase

(I go into more detail about all of this in the main README)

Log into firebase with a google account. Go to dashboard. Create a project. In that project, enable Auth, Firestore, Functions and hosting. Functions and/or hosting will bug you to set up billing. You can set an alert so it tells you if charges are going to be over $10. I've never had a hobby project get out of control on firebase, which is more than I can say for AWS.

Then create a webapp for the project in the gear icon menu. Creating the webapp will give you some credentials in a sample .js file.

## Put the values in the react-frontend/.env file

Look at sample.env, copy it to `react-frontend/.env` you want the credential values from your firebase app to be in REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN etc. of `react-frontend/.env`

*env variables in React apps are public, and only variables with names that start with REACT_APP are visible to the app*

## Set up firestore access rules

Go back to your project in firebase, go to firestore, click on the "Rules" tab. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    match /users/{userId} {
    	allow read: if true;
    	allow write, create: if request.auth.uid == userId;
    }
    match /users/{userId}/games/{gameId} {
    	allow read: if true;
      allow write, create, delete: if request.auth.uid == userId;
    }
  }
}
```

That says

"turn of default read & write"

"allow anyone to read a user document"

"allow someone to create or update a user document if their auth id is the same as the document's key"

"allow anyone to read a user games subcollection document"

"allow someone to create or update or delete a user games subcollection document if their auth id is the same as the user document's key"

IMO, Firestore rules are pretty straightforward. And if you find yourself going nuts trying to do something really specific with them, maybe just put that operation behind a cloud function instead.

## Install firebase tools and initialize

`npm i -g firebase-tools`

`firebase login` to log into the same account you logged into the firebase web interface with.

Then in the base directory of this project run

`firebase init`

Select functions and hosting with arrow & the space bar.

It'll ask you to select an existing project, select the one you just created.

For functions you do want JavaScript, you do want ESLint, and you don't want to overwrite anything

For hosting, the public directory is `react-frontend/build`

You don't need any github workflow or CI/CD, we're just going to deploy with `firebase deploy`, and gitlab is superior for this kind of thing anyway.

## Deploy the functions

Now run `firebase deploy --only functions` from the project root. It might take a little while, but it should deploy the functions without error.

## Launch the React App locally

In the `react-frontend` directory, run `npm start` it should launch the react app on localhost:3000.

Open the developer console for errors. The Firebase function logs are your friend.

Try to log in, search for a game, and add it to your profile.

## Deploy the site

Run `firebase deploy` from the base directory. It should automatically run build on the react app and then deploy.

You've deployed a small but modern full-stack webapp! Cool!