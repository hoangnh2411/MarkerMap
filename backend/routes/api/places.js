const express = require('express');
const router = express.Router();

const Place = require('../../models/Places');

router.get('/test', (req, res) => res.send('place route testing!'));

router.get('/', (req, res) => {
    Place.find()
        .then(places => {
            console.log('get places successfully')
            res.json(places)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ noplacesfound: 'No Places found' })
        })
})

router.get('/:id', (req, res) => {
    Place.findById(req.params.id)
        .then(place => res.json(place))
        .catch(err => res.status(404).json({ nobookfound: 'No place found' }));
});

router.post('/', (req, res) => {
    try {
        Place.create(req.body)
            .then(place => res.json({ msg: 'Place added successfully' }))
            .catch(err => {
                console.log(err)
                res.status(400).json({ error: 'Unable to add this place' })
            });
    } catch (e) {
        console.error(e)
    }

});

router.put('/:id', (req, res) => {
    try {
        console.log('update place')
        console.log(req.body)
        Place.findByIdAndUpdate(req.params.id, req.body)
            .then(place => res.json({ msg: 'Updated successfully' }))
            .catch(err => {
                console.log(err)
                res.status(400).json({ error: 'Unable to update the Database' })
            }
            );
    } catch (e) {
        console.error(e)
    }
});

router.delete('/:id', (req, res) => {
    Place.findByIdAndRemove(req.params.id, req.body)
        .then(place => res.json({ mgs: 'Place entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a place' }));
});


module.exports = router;
