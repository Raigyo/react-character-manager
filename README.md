# Becode  JEPSEN LG - ReactJS - Characters manager!

![Becode logo](img/becode-logo.png)


*March 2019*

> 🔨  Characters manager with ReactJS (CRUD with API). [Github page](https://raigyo.github.io/react-character-manager/)

* * *

## Description

You can see all the characters retrieved from the API.

Each character has a name, a short and a long description and also a picture. The long description displays markdown.

You can edit these datas for each character and use markdown in the long description textarea.

You also can add a character or delete an existing one.

## Technologies covered by the exercise

[x] JSX syntax

[x] Creating components

[x] Map function

[x] Render method

[x] Props / State

[x] Scope / Bind

[x] Routing

[x] Helpers

## Architecture of the website

├── react-character-manager

│   ├── build

│   ├── img

│   ├── node_modules

│   ├── public

│   │   ├── favicon.ico

│   │   ├── index.html

│   │   └── manifest.json

│   └── src

│   │   ├── components

│   │   │   ├── create.component.js

│   │   │   ├── edit.component.js

│   │   │   └── helpers.js

│   │   ├── images

│   │   └── App.css

│   │   └── App.js

│   │   └── index.css

│   │   └── index.js

│   │   └── Routes.js

├── .gitignore

├── package.json

└── README.md

### Main scripts/components used

**--src/App.js--**

Component that displays characters list from the Api.
It also displays main navigation and manage the delete functionality.

**--src/App.css--**

The layout is managed in that file. The application also use bootstrap.

**--src/index.js--**

Main page that renders the App component using the class *HashRouter* for routing (we have to use *HashRouter* to deploy the app on Github pages, but it's usually preferable to use *BrowserRouter* instead).

**--src/Routes.js--**

Component that creates routes.

**--src/components/create.component.js--**

Component that manage the creation of a character and add it in the API using Axios.

**--src/components/edit.component.js--**

Component that manage the edition of a character and update it in the API using Axios.

**--src/components/helpers.component.js--**

Component used to hide or display characters. It contains functions with a global scope that can be used in each component.

## How to launch

npm install -g create-react-app

cd my-app-name

npm start

[http://localhost:3000/](http://localhost:3000/)

**Or visit the [Github page](https://raigyo.github.io/react-character-manager/)**

## Sources and components

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[axios](https://alligator.io/react/axios-react/)

[react-router-dom](https://www.npmjs.com/package/react-router-dom)

[react-markdown](https://github.com/rexxars/react-markdown)

[react-collapsible](https://github.com/glennflanagan/react-collapsible)

[Character Database API](https://character-database.becode.xyz/)
