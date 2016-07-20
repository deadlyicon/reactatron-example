# Ideal node setup


```
.
├── README.md
├── server
│   ├── index.js
├── browser
│   ├── index.js   # rendered to /public/browser.js
│   ├── resources
│       ├── locationResource.js
│       ├── routeResource.js
│   ├── view
│       ├── components
│           ├── root.jsx
│       ├── styles
│           ├── index.sass # rendered to /public/browser.css
├── lib
├── log
├── dist # .gitignore
│   ├── server.js # rendered from /server/index.js
│   ├── public
│       └── browser.js   # rendered from /browser/index.js
│       └── browser.css  # rendered from /browser/view/styles/index.sass
├── bin
│   ├── build
│   ├── deploy
│   └── start
├── public
```

## Webpack

#### Webpack Configs

```
/server/index.js                -> /dist/server.js
/browser/index.js               -> /dist/public/browser.js
/browser/view/styles/index.sass -> /dist/public/browser.css
```

- server.js and browser.js should have /lib in their load path
- browser.js should not have /server in their load path


## Procfile

```
web: bin/start
```




# nice to haves

- server should log to /log/${NODE_ENV}.log
