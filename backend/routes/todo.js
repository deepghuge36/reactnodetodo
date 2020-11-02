const express = require('express');
const router = express.Router();
// add the models 
const TodoModel = require('../Models/Todos')

// get all todos form database
router.get("/", async (req, res) => {
  await TodoModel.find({}).then((todo) => {
    if (todo.length > 0) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: "no todo found" });
    }
  });
});

// get single todo from database 
router.get('/:id', (req, res) => {
  TodoModel.findOne({ _id: req.params.id })
    .then(todo => {
      // if (todo._id != req.params.id) {
      //   res.json({message: 'todo not found'})
      // }else{
      //   res.status(200).json(todo);
      // }
      res.json(todo)
    })
    .catch(() =>{
      res.json({ message:"todo not found"})
    });
})


// add new todo to database 
router.post('/', (req, res) => {
  const newtodo = TodoModel({
    name: req.body.name,
    details: req.body.details,
  });

  newtodo
    .save()
    .then(() => {
      res.status(200).json({ message: "successfully addedd" });
    })
    .catch(() => {
      res.status(500).json({ message: "something went wrong" });
    });
});

//make changes to selected todo database

router.put('/:id', (req, res) => {
  TodoModel.findOneAndUpdate({ _id: req.params.id }, {
    //  ! To update only selected fields, $set operator needs to be used
    $set: {
      name: req.body.name,
      details: req.body.details,
    },
  }
  ).then(todo => {
    res.status(200)
      .json({ todo });
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err })
    });
});

router.delete('/:id', async (req, res) => {
  TodoModel.deleteOne({ _id: req.params.id })
  .then(()=> {
      res.json({message: "todo Successfully deleted"});
    })
    .catch(err =>{
      res.json({message:"todo delete failed"})
    });
});



module.exports = router;