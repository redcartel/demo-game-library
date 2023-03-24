# demo-game-library : showing a friend some simple react

This README and the ones in react-frontend and functions are about setting up firebase / react projects in general. You don't have to clone the code to follow them.

If you just want to get this project's code working, read `MAKEMEWORK.md`

## Command Line Software

### Homebrew

Install Homebrew if you haven't:

https://brew.sh/

### Visual Studio Code

If you haven't installed VS Code, you can do so with homebrew

`brew install --cask visual-studio-code`

Try to open a file or directory with the `code` command

`code .`

If that doesn't work, I'd suggest looking up how to enable it. I think the homebrew install sets that up automatically but I don't remember, you might have to set your PATH in `~/.bash_profile` mine includes `/Users/redcartel/Applications/Visual\ Studio\ Code\ 2.app/Contents/Resources/app/bin` but I think I installed through a download installer. YMMV.

### Node

If you haven't installed node, you can do so with homebrew

`brew install node`

That should be good enough for this project. If you get into node development in any real way, I strongly strongly strongly suggest also setting up `nvm`, Node Version Manager, which lets you easily switch between different versions of node to maintain compatibility with different projects. It has saved my ass.

If I'm -splaining, forgive me. I don't know how much experience you have with node and JavaScript tooling. There's also this thing out there called yarn. It's a replacement for the npm package manager. It's fine to use for everything. A lot of people like it more. You type `yarn add` instead of `npm i` that's pretty much it. You'll see it used in a lot of tutorials. They're basically interchangeable.

## Firebase

Let's set up a new project in firebase.

### Create Account and Project

Go to https://firebase.com & login, probably with the same account you log into github with

Click 'Go To Console' in the upper right hand corner. It might make you click through an intro, I don't remember.

Click '+ Add Project'

Give it a name `separate-words-with-hyphens`

Click 'Continue'

On 'Choose or Create a Google Analytics Account' just select the default

Click 'Create Project' it will grind for a bit while it provisions everything

### Create App for Project & Set Up Hosting

Click the gear next to 'Project Overview' on the left

Scroll down to 'Your Apps'

Click `</>` to create a webapp (dumb, not obvious, hate it)

Name it, it's ok to give it the same name as your project if this is just going to be a webapp project

If you don't have another idea for where you're going to host, you can click 'Also Set Up Firebase Hosting.' It does a fine job.

Step 2) will tell you to run 

`npm install firebase`

Don't do that yet. You're going to do it once you initialize your React project, which we haven't done yet.

Below that you'll see a bunch of Javascript to put in your project. You're going to use that later. You don't have to save it now, you can get back to it. In order to get back to it, you'll click on the gear again, go to project settings, and scroll down to apps. It'll be there.

Below that it will tell you to install the Firebase cli. That's a good idea, let's do that.

`npm install -g firebase-tools`

And then run `firebase login` and login to the account you used to login to the Firebase web panel.

It will also tell you to `init` and `deploy`, we'll do that later.

You're done with that step, click 'Continue To Console'

### Set up Auth

Click 'Build' on the left hand side. There's the list of the most commonly used services that Firebase provides.

Anyway, after clicking Build, click 'Authentication' then click on 'Get Started'

Then click 'Google', click the 'Enable' checkbox slider, and then put in a good public facing name

#### n.b.

The public facing name is visible to the user on the little log in popup that you get when you click log in with google, and IMO the generic choice they give you can look a little scammy. 

What Firebase does not make at all obvious at this point is you *cannot change* this selection after you make it. Making that pop up say something better later on involves setting up a special url with Firebase that gets into, like, screwing with DNS records and stuff. Very stupid how important this dumb little box is.

#### anyway

Now put in your project support email. If you made a google group for the project, maybe use that. This is the from: field on email messages about login, I think.

Leave the other two sections blank and submit the form.

Now go over to 'Settings' see 'Authorized Domains?' Later on, when and if you get a domain name for the project, you'll add it there.

That's it, you have a user database now. Cool. You can also add other login providers. Email and password is pretty easy to support, but it requires some tedious webdev to make all the forms. Some of the other providers, like Apple and Facebook, require their own special configuration. Google is easy and everyone has it, so I just went with that for the demo.

### Set up the firestore database

Click 'Build' click 'Firestore Database' click 'Create'

Go ahead and start in production mode. You want to learn access rules sooner rather than later, so we'll just do that. They're what make the whole 'the client is able to read and write to the database directly' thing make any kind of sense.

Set your region. US Central I'm assuming.

Ok, database is set up.

You will need to set up access rules in order to use this. The example rules that make the demo game library project work are in MAKEMEWORK.md.

#### aside

Google provides other cloud services than these too, it gets confusing what is and is not under the 'Firebase' brand, what you need a 'Service Account' for, and what you don't, etc.

Like, for instance, ReCAPTCHA is a Google service that's usually free, pretty easy to set up, and is used all over the place, but it's buried really deep and isn't just part of Firebase, when it would totally fit.

## Go set up your React app now!

The instructions are in the README.md that's in `/react-frontend` in this project.

With Auth + Firestore + React, you have enough for a lot of projects. Firebase storage is pretty easy to use if you need to mess with files, but I didn't for this sample project. For this project I did wind up needed functions, so we can talk about...

### ---

## Cloud Functions and Hosting (optional)

### ---

This project wound up needing some cloud functions and I used Firebase hosting, so I'll talk about that.

### firebase-tools

You need to have firebase-tools installed

`npm i -g firebase-tools`

And you need to have run `firebase login` to log into the account you're using for firebase.

### Enable functions

Go to build -> functions, click "Get Started"

At some point in this process, I am pretty sure it bugs you to set up billing. Functions cost a small fraction of a cent per execution. I have a $10 alert set up for my hobby projects and it has never gone off once. "Serverless" hosting services are generally cheaper than dedicated hosting / traditional server architecture until you're at scale. And even then.

It's going to tell you to do the firebase-tools setup we just did. We'll do the init step in a second.

### Enable hosting

Go to build -> hosting, click "Get Started"

Click "Next" a couple of times. Ok, it's set up.

### firebase init

First things first, in your react frontend directory, run `npm build` this will give you some publishable files to host in the `/react-frontend/build` directory. Even if you just have a blank React starter project right now, still do it.

Now, in the root folder of the project, run

`firebase init`

Select 'functions' and 'hosting' with the space bar and arrows and then hit enter

It will ask you if you want to use an existing project. You do.

I think it will always do functions setup first, it will create an functions folder if one doesn't exist (if you working from a clone of this repo)

You want to use JavaScript probably. Though firebase cloud functions are a fine "small" project to learn some TypeScript on. I wouldn't do TypeScript for your first ever node-based webapp project, but I might do it for your second one. It's so good.

You do want to use ESLint, the default firebase ESLint rules aren't too much of a pain, I find.

Then it'll install some dependencies and set up an index.js file in the functions directory that has a hello world function that doesn't work. I'll get to that.

Then it's gonna set up hosting

The public directory should be the react build directory that got created at the top of this section. On the demo game library example project that means `react-frontend/build` is what I put in for that prompt.

You do want to configure as a single-page app. This does some magic that makes what's going on with react-router-dom work.

Don't worry about a github build pipeline. We're just going to deploy with firebase deploy.

### Try a deployment

In your project root run `firebase deploy` this is slow, get some coffee. It should deploy your built React app and the hello world function (or the functions from this project if you cloned)

You can deploy only your functions with `firebase deploy --only functions` or only the hosted web site with `firebase deploy --only hosting`

### A little automation

Look at the `firebase.json` file in this project. See this?

```
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint && cd react-frontend && npm run build"
    ],
```

That's a little modification that makes it run React's npm build first whenever I tell it to deploy, so I'm not deploying old versions of the site because I forgot to run build first.

If you want to do any more automation than that, like running tests prior to deployment, then github workflows or gitlab or something like that is what you want. This is about as much complxity as the predeploy option is going to handle elegantly.

### The hello world function doesn't work

Yeah, for a webapp you want to be using the kind of firebase function that is created with `.onCall` not `.onRequest`. No the documentation does not make that immediately obvious. Yes you might have just lost two days to fruitlessly fucking with CORS configuration. Yes that happened to me last spring the first time I did a project with FB cloud functions. Yes I'm still a little mad about it.
