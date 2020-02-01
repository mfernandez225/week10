const inquirer = require("inquirer")

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  validateIsRequired(value) {
    if (value) {
      return true
    } else {
      return "Can't be blank"
    }
  }

  async prompt() {
    const {
      name,
      id,
      email
    } = await inquirer.prompt([{
      message: "What is your full name?",
      name: "name",
      validate: this.validateIsRequired
    }, {
      message: "What is your id?",
      name: "id",
      validate: this.validateIsRequired
    }, {
      message: "What is your email address?",
      name: "email",
      validate: this.validateIsRequired
    }])
    this.name = name
    this.id = id
    this.email = email
  }

  getName() {
    return this.name
  }
  getId() {
    return this.id
  }
  getEmail() {
    return this.email
  }
  getRole() {
    return "Employee"
  }
}

module.exports = Employee;
