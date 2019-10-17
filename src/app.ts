import path from 'path';
import hbs from 'hbs';
import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import { geocode } from './utils/geocode';
import { forecast } from './utils/forecast';

const app = express();

const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req: Request, res: Response) => {
  res.render('index', {
    title: 'Weather',
    name: 'Monday Victor'
  });
});

app.get('/about', (req: Request, res: Response) => {
  res.render('about', {
    title: 'About Me',
    name: 'Monday Victor'
  });
});

app.get('/help', (req: Request, res: Response) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Monday Victor'
  });
});

app.get('/weather', (req: Request, res: Response) => {
  console.log(req.query.address);
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, search): void => {
    if (error) {
      res.send({ error });
      return;
    }
    if (search) {
      forecast(+search.latitude, +search.longitude, (err, forecastData) => {
        if (err) {
          return res.send({ err });
        }

        res.send({
          forecast: forecastData,
          location: search.location,
          address: req.query.address
        });
      });
    }
  });
});

app.get('/products', (req: Request, res: Response) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req: Request, res: Response) => {
  res.render('404', {
    title: '404',
    name: 'Monday Victor',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', (req: Request, res: Response) => {
  res.render('404', {
    title: '404',
    name: 'Monday Victor',
    errorMessage: 'Page not found.'
  });
});

module.exports.server = serverless(app);
