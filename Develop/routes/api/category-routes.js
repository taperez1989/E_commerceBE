const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        include: [
          {
            model: Tag,
            through:ProductTag
          }
        ]
      }
    ]
  }).then((categoryData) => {
    console.log(categoryData);
    return res.send(categoryData);
  });
  // be sure to include its associated Products

  // we want to SEND a RESPONSE data object
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include:[{model: Product}]
  }).then((catData) => {
    res.send(catData); 
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
    
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    },
      {
        where: {
          id: req.params.id,
        },
    
      });
  
  
    res.json(updateCategory);
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCate = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json(deleteCate);
});

module.exports = router;
