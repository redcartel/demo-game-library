# Making this project work

The README's pretty much assume you're building your own project from scratch looking at this one for guidance. But if you just want to get this project working, here are the steps.

## Sign up for the IGDB API

https://api-docs.igdb.com/#about

You'll need a Twitch account with two-factor turned on.

## Put the values in the functions/.env file

Look at sample.env, you want the values you got from Twitch to be in CLIENT_ID and CLIENT_SECRET

## Sign up for Firebase

(There is more detail to all of this in the main README)

Log into firebase with a google account. Go to dashboard. Create a project. In that project, enable Auth, Firestore, Functions and maybe hosting. Functions and/or hosting will bug you to set up billing. You can set an alert so it tells you if charges are going to be over $10. I've never had a hobby project get out of control on firebase, which is more than I can say for AWS.

Then create a webapp for the project in the gear icon menu. Creating the webapp will give you some credentials in a sample .js file.

## Put the values in the react-frontend/.env file

Look at sample.env, you want the credential values from your firebase app to be in REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN etc.

*env variables in React apps are public, and only variables with names that start with REACT_APP are visible to the app*

## Install firebase tools and initialize

`npm i -g firebase-tools`

`firebase login` to log into the same account you logged into the firebase web interface with.

Then in the base directory of this project run

`firebase init`

Select functions and hosting

It'll ask you to select an existing project, select the one you just created.

For functions you do want JavaScript, you do want ESLint, and you don't want to overwrite anything

For hosting you don't want any github workflow or CI/CD, we're just going to deploy with `firebase deploy`

## Deploy the functions

Now run `firebase deploy --only functions` it might take a little while, but it should deploy your functions

## Launch the React App locally

In the `react-frontend` directory, run `npm start` it should launch the react app on localhost:3000.

Open the developer console for errors. The Firebase function logs are your friend.

Try to log in, search for a game, and add it to your profile.

## Deploy the site

Run `firebase deploy`

You've deployed a webapp! Cool!