# React App and connecting Firebase

## Repo / Project Structure

There are two ways of doing this, either have a repo that consists of a parent directory for the whole multi-part project, with sub-directories for things like the web frontend, the server, shared resources, etc. or else separate repos for each part. They both have advantages. Lately, I'm a "monorepo" kind of guy.
### Monorepo

If you want a big repo with multiple parts to it, like this sample project is, make your `my-project` directory wherever you usually do that, run `git init` in it, and run `npx create-react-app@latest react-frontend` from within that base directory.

### Multi-Repos

If you want a repo that is just a react app, then in whatever directory your personal projects live in run `npx create-react-app@latest my-project-name` and then do `git init` in the directory that creates.

## Open in Visual Studio Code

Now that we have some code to edit, let's open the project directory in our editor

`code my-project-name`

#### Some (Mac) Keyboard shortcuts for VS Code

Microsoft is all about some JavaScript & TypeScript these days, so for a node project, you really might not need any plugins, the default support is good. Here's the three keyboard shortcuts you need to know (on Mac):

`ctrl+backtick` opens an in-editor terminal

`shift+option+f` auto-format the document you're editing. It might make you pick a formatter the first time you do this. I think I remember going with eslint & that that is built in.

Highlight text + `command+forward slash` comment or uncomment a block of code.

That's it. That's almost all I use. I'm not a power user. Go nuts if you want to, there's lots of productivity plugins and keyboard shortcuts, but it's just not how I roll.

## Install dependencies

`ctrl+backtick` to open the terminal.

We're going to use:

#### react-router

Regular React apps are really just a single page, to make them pretend to have multiple pages, you need react-router

`npm install react-router react-router-dom`

#### axios

Axios is an HTTP request library provider that I'm told also runs an online news service. Weird. I like their library for get & post requests a lot more than the browser's built in fetch library.

From the root directory of the react project run `npm install axios`

#### well, actually

I didn't use axios in the example project! The API I used wound up not having CORS support so I couldn't make requests directly from the webapp. What's cool about axios though is it is the same library with the same syntax for making requests from either a client browser or from a server (or from a react-native phone app for that matter) so if you want some example axios code, look in the functions directory of this project, it will work the same if you wind up doing requests directly in the client.

#### firebase

`npm install firebase`

This will install (as of this writing) version 9 of the firebase client libraries. So, so, so much example code out there is for version 8, and it's COMPLETELY different. I prefer version 8, but we sometimes just have to move on. That's how life is.

#### Material UI

`https://mui.com/` is a UI widget & layout library for React. I use it whenever I'm not working with a designer. It does a good job of making your app look generically acceptable.

`npm install @mui/material @emotion/react @emotion/styled`

And you might as well install the icon pack that goes with it. They're neat. https://mui.com/material-ui/icons/

`npm install @mui/icons-material`

## Firebase config file and .env

Look at `src/firebase/fire.js`

Don't just copy the firebase config file from the firebase webapp screen into your project and check that into git.

Don't do it.

Everything in that file is public. Everything included in ANY React project is public. But still, I think it's a bad idea to check deployment specific credential values into a git repo.

Look at the `src/firebase/fire.js` file I have in this project. It pulls the values from a `.env` file that is ignored in `.gitignore`. IMO, this is how to do it. `.sample.env` shows how `.env` should look, you just copy those values from Firebase into there.

## Title, favicon, robots.txt etc.

All live in `/public` you can put images there too. I thiiiiiiink(?) firebase hosting is ok with a few images in public, but really binary files should be uploaded to firebase storage. Images are for CDNs.

The generated html, css, and javascript that will actually be served to the internet is all created under `/build` when you set up deployment, it's the `/build` folder of the React app you will be deploying.

## A word about custom hooks

`src/utils/hooks` has my hooks. (Jon Hamm in 30 Rock jpg goes here)

I think custom hooks are a subject new React developers avoid. None of the juniors at my job write them. This is silly, they're amazing and they really clean up the code.

If you need to do complicated or even semi-complicated stuff involving multiple hooks, it's best to abstract that logic out of your components into a custom hook.

You can return state variables and callbacks from the custom hook that you can then use in your component. If you want a custom hook to return a function that a component can use, it absolutely must be wrapped in useCallback. And mind the state dependencies for that callBack (the stuff in []). That function won't see updates to any variables not in those brackets, and that can result in weird bugs.

The goal is for components to be mostly about visual presentation and have as little logic-logic in them as possible. Anything that gets data processing out of the components and into another file is good.