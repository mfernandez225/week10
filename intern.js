const inquirer = require("inquirer")
const Employee = require("./employee")

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email)
    this.school = school;
  }
  async prompt() {
    await super.prompt()
    const {
      school,
    } = await inquirer.prompt([{
      message: "What school are you attending?",
      name: "school",
    }])
    this.school = school
  }
  getSchool() {
    return this.school
  }
  getRole() {
    return "Intern"
  }
}

module.exports = Intern;
