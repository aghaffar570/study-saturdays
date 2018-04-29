const router = require('express').Router();
const Student = require('../db/models/student');

router.param('id', (req, res, next, id) => {
  Student.findById(id)
  .then(student => {
    if (!student) {
      //res.status(404).send();
      //res.sendStatus(404);
      let err = new Error();
      err.status = 404;
      next(err);
    }
    else {
      req.student = student;
      next();
    }
  })
  .catch(next);
})

router.get('/', (req, res, next) => {
  Student.findAll()
  .then(students => res.send(students))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  res.send(req.student);
})

router.post('/', (req, res, next) => {
  Student.create(req.body)
  .then(student => {
    res.send(student);
  })
  .catch(next);
})
//there is a Model update method AND!!! and an instance update method
router.put('/:id', (req, res, next) => {
  req.student.update(req.body)
  .then(updatedStudent => res.status(201).send(updatedStudent))
  .catch(next);

  /*Student.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  */
})

router.delete('/:id', (req, res, next) => {
  req.student.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
})

module.exports = router;
