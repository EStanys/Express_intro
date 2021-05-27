const express = require('express');
const router = express.Router();

let personId = 6;

let people = require('../../js/peopleData');

// get all people Endpoint
router.get('/', (req, res) => {
  // grazinam json
  res.json(people);
});
// get one person Endpoint
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
  const { name, surname } = req.body;
  // jei viskas ok atnaujinam
  found.name = name || found.name; // sutrumpinimas
  found.surname = surname ? surname : found.surname;
  res.json({ msg: 'User was updated', updatetUser: found });
});

// delete one person Endpoint
router.delete('/:id', (req, res) => {
  const paramId = req.params.id;
  // randam ka norim isrtrinti pagal id
  const found = people.find((p) => p.id === paramId);

  if (!found) {
    res.status(404).json({ errorMsg: `sorry person with id ${paramId} was not found` });
  }
  // paliekam visus objektus isskyrus kuri surandam
  people = people.filter((p) => p.id !== paramId);

  // grazinam json
  res.json({ msg: 'delete was successfull', deletedPerson: found, people });
});

module.exports = router;
