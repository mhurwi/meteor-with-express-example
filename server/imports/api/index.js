import { Meteor } from 'meteor/meteor';
import express from 'express';
import bodyParser from 'body-parser';

import Widgets from '../../../imports/api/widgets';

async function getWidget(req, res) {
  const widget = await Widgets.findOne(req.params.id);

  res.status(200).json({ data: widget });
}

async function updateWidget(req, res) {
  const result = await Widgets.update(req.params.id, { $set: { name: req.body.name, color: req.body.color } });
  const widget = await Widgets.findOne(req.params.id);

  res.status(200).json({ data: widget });
}

async function deleteWidget(req, res) {
  const result = await Widgets.remove(req.params.id);

  res.status(202).json({ data: result });
}

function getWidgets(req, res) {
  const widgets = Widgets.find().fetch();

  res.status(200).json({ data: widgets });
}

async function createWidget(req, res) {
  const widgetId = await Widgets.insert({
    name: req.body.name,
    color: req.body.color
  });
  const widget = await Widgets.findOne(widgetId);

  res.status(201).json({ data: widget });
}

export function setupApi() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/api/widgets/:id', getWidget);
  app.put('/api/widgets/:id', updateWidget)
  app.delete('/api/widgets/:id', deleteWidget)
  app.get('/api/widgets', getWidgets);
  app.post('/api/widgets', createWidget);
  app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' });
  });

  WebApp.connectHandlers.use(app);
}
