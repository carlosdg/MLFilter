# Machine Learning Filter

Progressive Web App that allows the user to take pictures filtered to have the same style as [The Scream painting](https://en.wikipedia.org/wiki/The_Scream). This is done by using the [Style Transfer technique via the ml5.js library](https://ml5js.org/docs/StyleTransfer).

The ml5.js library allows us to use, in a very abstract way, Machine Learning algorithms in the clients browsers, which is perfect for an offline capable application.

However, note that this application is very performance heavy and even on a laptop the style transfer can take several seconds. Also, the first time users access the site the browser needs to download the model trained for the style transfer which is around 7MB.

[See the application in action](https://carlosdg.github.io/MLFilter/)

## Download and run yourself

First clone the repository and install the development dependencies

```
git clone https://github.com/carlosdg/MLFilter.git && cd MLFilter && npm install
```

Run webpack to generate a bundle from the scripts

```
npm run webpack:production
```

Run a server

```
npm start
```

## Author

- Carlos Domínguez García