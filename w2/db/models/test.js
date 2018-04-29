'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
//Test.protoype.passing - instance
//class method
Test.passing = function() {
  return this.findAll({
    where: {
      grade: {
        gt: 70
      }
    }
  })
}

Test.findBySubject = function(subject) {
  return this.findAll({
    where: {
      subject
    }
  })
}
//studentId column is added inside of your Test model.
//your test model will say: 'subject', 'grade', 'studentId'
//'studentId' - foreign key that will link to the primary key on the Student table
//its initial studentId can be null

// Test.create({
//   subject: 'History',
//   grade: 65,
//   studentId: 1
// })

Test.belongsTo(Student);
module.exports = Test;
