const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// const { tableName } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  }).then((tagData) => {
    console.log(tagData);
    res.json(tagData);
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  }).then((tagData) => {
    res.json(tagData);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.id
  },
    {
      where: {
        tag_id: req.params.tag.id
      },
    }
  )
    .then((updatedTag) => {
      res.send(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      tag_name: req.params.tag.id,
    },
  })
    .then((deletedTag) => {
      res.send(deletedTag);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
