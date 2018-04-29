const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/passing', (req, res, next) => {
  Test.passing()
  .then(tests => res.send(tests))
  .catch(next);
})

router.get('/', (req, res, next) => {
  Test.findAll()
  .then(tests => res.send(tests))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Test.findById(Number(req.params.id))
  .then(test => res.send(test))
  .catch(next);
})

router.get('/subject/:subject', (req, res, next) => {
  Test.findBySubject(req.params.subject)
  .then(subjectedTests => res.send(subjectedTests))
  .catch(next);
})

router.post('/student/:studentId', (req, res, next) => {
  Test.create({
    subject: req.body.subject,
    grade: req.body.grade,
    studentId: req.params.studentId
  })
  .then(test => res.status(201).send(test))
  .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Test.findById(Number(req.params.id))
  .then(test => test.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
})

module.exports = router;
