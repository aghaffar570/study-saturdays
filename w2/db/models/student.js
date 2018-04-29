'use strict'

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  //is not going to be saved in the database
  //not a field
  // fullName: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
  //     //return this.firstName + ' ' + this.lastName;
  //   }
  // }
}, {
  getterMethods: {
    fullName () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
    }
  },
  // hooks: {
  //   beforeCreate: (student) => {
  //     student.firstName = `${student.firstName[0].toUpperCase()}${student.firstName.slice(1)}`;
  //     student.lastName = `${student.lastName[0].toUpperCase()}${student.lastName.slice(1)}`;
  //   }
  // }
});

// Student.hook('beforeCreate', (student) => {
//   student.firstName = `${student.firstName[0].toUpperCase()}${student.firstName.slice(1)}`;
//   student.lastName = `${student.lastName[0].toUpperCase()}${student.lastName.slice(1)}`;
// })

Student.beforeCreate((student) => {
  student.firstName = `${student.firstName[0].toUpperCase()}${student.firstName.slice(1)}`;
  student.lastName = `${student.lastName[0].toUpperCase()}${student.lastName.slice(1)}`;

  /*
  //change first initial
  let firstInitialUpperCase = student.firstName[0].toUpperCase();
  let lastInitialUpperCase = student.lastName[0].toUpperCase();

  //get the rest of the name
  let remainderFirstName = student.firstName.slice(1);
  let remainderLastName = student.lastName.slice(1);

  //reassign student
  student.firstName = firstInitialUpperCase + remainderFirstName;
  student.lastName = lastInitialUpperCase + remainderLastName;
  */
});

Student.prototype.initials = function() {
  return `${this.getDataValue('firstName')[0]} ${this.getDataValue('lastName')[0]}`;
}

module.exports = Student;
