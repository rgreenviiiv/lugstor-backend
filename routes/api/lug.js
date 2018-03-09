const express = require('express');
const router = express.Router();
const db = require('../../database');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const path = require('path');

router.get('/', function (req, res) {
  db.select().from('lug_items').orderBy('id').then((data) => res.send(data));
});

router.post('/', function (req, res) {
  console.log(req.body);
  db.insert(req.body).returning('*').into('lug_items').then((data) => res.send(data));
});

router.get('/photos', (req, res) => {
  res.send('this is the photos page')
})

router.patch('/:id', function (req, res) {
  db('lug_items').where({ id: req.params.id }).update(req.body).returning('*').then(function (data) {
    res.send(data);
  });
});

router.put('/:id', function (req, res) {
  db('lug_items').where({ id: req.params.id }).update({
    title: req.body.title || null,
    is_done: req.body.is_done || null
  }).returning('*').then(function (data) {
    res.send(data);
  });
});

router.delete('/:id', function (req, res) {
  db('lug_items').where({ id: req.params.id }).del().then(function () {
    res.json({ success: true });
  });
});

router.get('/:id', function(req, res) {
  db('lug_items').where({id: req.params.id}).first().then(function(data) {
    res.send(data);
  });
});

module.exports = router;
