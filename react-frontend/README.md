# React App and connecting Firebase

## Create React App

If you want a big repo with multiple parts to it (like a React frontend and some server functions) then make a git repo for the project run `npx create-react-app@latest react-frontend`

If you want just a react app, then in whatever directory your personal projects live in run `npx create-react-app@latest my-project-name` and then do `git init` in the directory that creates.

Create-react-app takes a while, it always downloads the latest CRA first. Now's a good time to make coffee.

## Open in Visual Studio Code

Now that we have some code to edit, let's open our editor

`code my-project-name`

### Keyboard shortcuts

Microsoft is all about some JavaScript & TypeScript these days, so for a node project, you really might not need any plugins, the default support is good. Here's the three keyboard shortcuts you need to know (on Mac):

`ctrl+backtick` opens an in-editor terminal

`shift+option+f` auto-format the document you're editing. It might make you pick a formatter the first time you do this. I think I remember going with eslint & that that is built in.

Highlight text + `command+forward slash` comment or uncomment a block of code.

That's it. That's all I use. I'm not a power user. Go nuts if you want to, there's lots of productivity plugins and keyboard shortcuts, but it's just not how I roll.

## Install dependencies

`ctrl+backtick` to open the terminal.

We're going to use:

#### react-router

Regular React apps are really just a single page, to make them pretend to have multiple pages, you need react-router

`npm install react-router react-router-dom`

#### axios

Axios is an HTTP request library provider that I'm told also runs an online news service. Weird. I like their library for get & post requests a lot more than the browser's built in fetch library.

From the root directory of the react project run `npm install axios`

#### firebase

`npm install firebase`

#### Material UI

`https://mui.com/` is a UI widget & layout library for React. I use it whenever I'm not working with a designer. It does a good job of making your app look generically acceptable.

`npm install @mui/material @emotion/react @emotion/styled`

And you might as well install the icon pack that goes with it. They're neat. https://mui.com/material-ui/icons/

`npm install @mui/icons-material`

## Firebase config file

Look at `src/firebase/fire.js`

I basically just modified the file from the firebase gear icon page web app section to have some useful exports.

All of those keys and tokens are PUBLIC, as is every other scrap of anything that goes into a React app. That's cool. That's ok. If you need backend access to the firebase API on a server, there are a few more ID values you have to have. But that does mean that a nefarious user who knows their JavaScript can do anything your own web code would be capable of doing. Like registering new users, or making writes to firestore that your access rules permit.

Think about that when deciding what goes into the frontend code and what goes into cloud functions or onto a server. The Firebase philosophy is that you can get away with more responsibility being placed on the client than is traditional, but there are limits to what is sane.

## A word about custom hooks

`src/utils/hooks` has my hooks. (Jon Hamm in 30 Rock joke goes here)

I think custom hooks are a subject new React developers avoid. None of the juniors at my job write them. This is silly, they're amazing and they really clean up the code.

If you need to do complicated or even semi-complicated stuff involving multiple hooks, it's best to abstract that logic out of your components into a hook.

You can return state variables and callbacks from the custom hook that you can then use in your component. If you want a custom hook to create a function that a component can use, it absolutely must be wrapped in useCallback. And mind the state dependencies for that callBack (the stuff in []). That function won't see changes to any variables not in those brackets, and that can result in weird bugs.

It's basically impossible to fully achieve this, but the goal is for components to be mostly about visual presentation and have as little logic logic in them as possible. Anything that gets data processing out of the components and into another file is good.