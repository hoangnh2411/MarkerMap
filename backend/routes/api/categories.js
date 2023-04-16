

const express = require('express');
const router = express.Router();

const Category = require('../../models/Category');
const Place = require('../../models/Places');


router.get('/test', (req, res) => res.send('Category route testing!'));

router.get('/', (req, res) => {
    Category.find().populate('places')
        .then(categories => {
            console.log('get Categories successfully')
            res.json(categories)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ nocategoriesfound: 'No Categories found' })
        })
})

router.get('/:id', (req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(404).json({ nobookfound: 'No Category found' }));
});

//add sửa lại theo relationship
router.post('/', async (req, res) => {

    var places = [];
    if (req.body.markers && req.body.markers.length > 0) {
        places = await Place.find({ _id: { $in: req.body.markers } });
    }

    const createCategory = async (CategoryModel) => {
        const newPlace = new Category({
            name: CategoryModel.name,
            iconColor: CategoryModel.iconColor,
            iconColorText: CategoryModel.iconColorText,
            places: places?.map(tag => tag._id)
        });
        const savePlace = await newPlace.save();
        return savePlace;
    }



    createCategory(req.body)
        .then(async category => {
            newCategory = await Category.findOne({ updated_date: category.updated_date })
            if (places && places.length > 0) {
                places.forEach(place => {
                    Place.updateOne({ _id: place._id, }).set('category', newCategory._id)
                })
            }
            res.json({ msg: 'Place added successfully' })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Unable to add this Category' })
        });
});

router.put('/:id', async (req, res) => {

    //update Category
    Category.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, iconColor: req.body.iconColor, iconColorText: req.body.iconColorText } })
        .then(async category => {

            const places = await Place.find({ _id: { $in: req.body.markers } });

            const placesf = places.map(place => place._id)

            await Category.updateOne({ _id: req.params.id }, { $set: { places: placesf } });

            console.log(category)

            if (req.body.markers.length > 0) {

                req.body.markers.forEach(async function (marker) {
                    await Place.updateOne({_id: marker}, {$unset: {category: 1 }});
                    await Place.updateOne({ _id: marker }, { $set: { category: req.params.id } });
                })
            }


            res.json({ msg: 'Updated successfully' })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ error: 'Unable to update the Database' })
        }
        );
});

router.delete('/:id', async (req, res) => {
    // try {
    //     const category = await Category.findById(req.params.id);
    //     if (!category) {
    //         return res.status(404).json({ message: 'Category not found' });
    //     }

    //     await Place.updateMany({ category: category._id }, { $pull: { category: category._id } });

    //     await category.delete();
    //     res.json({ msg: 'Updated successfully' })
    // } catch (err) {
    //     console.log(err);
    //     res.status(404).json({ error: 'No such a place' })
    // }
    Category.findByIdAndRemove(req.params.id, req.body)
        .then(async category => {
            await Place.updateMany({ category: req.params.id }, { $pull: { category: req.params.id } })
            res.json({ mgs: 'Place entry deleted successfully' })
        })
        .catch(err => res.status(404).json({ error: 'No such a place' }));
});


module.exports = router;
