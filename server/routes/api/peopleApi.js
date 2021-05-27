const express = require('express');
const router = express.Router();

let personId = 6;

const people = require('../../js/peopleData');

// get all people Endpoint
router.get('/', (req, res) => {
  // grazinam json
  res.json(people);
});
// get one people Endpoint
router.get('/:id', (req, res) => {
  const paramId = req.params.id;

  const found = people.find((p) => p.id === paramId);

  if (!found) {
    res.status(404).json({ errorMsg: `sorry person with id ${paramId} was not found` });
  }

  // grazinam json
  res.json(found);
});

// Create one people Endpoint
// gauti duomenis is vartojo formos arba json pavidalu ir sukuri nauja partotoja tarp savo people
router.post('/', (req, res) => {
  console.log(' req.body', req.body); //{"name":"James","surname":"Jameson"}
  const newPerson = {
    id: (++personId).toString(),
    name: req.body.name,
    surname: req.body.surname,
  };
  people.push(newPerson);
  // prideti nauja people objekta
  res.json(people);
});

// edit one person Endpoint
router.put('/:id', (req, res) => {
  console.log('executing put request');
  const paramId = req.params.id;

  const found = people.find((p) => p.id === paramId);

  if (!found) {
    res.status(404).json({ errorMsg: `sorry person with id ${paramId} was not found` });
  }

  // jei viskas ok atnaujinam zmogu
  found.name = req.body.name;
  found.surname = req.body.surname;
  res.json({ msg: 'User was updated', updatetUser: found });
});
module.exports = router;
