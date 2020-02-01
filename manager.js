const inquirer = require("inquirer")
const Employee = require("./employee")

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email)
    this.officeNumber = officeNumber;
  }
  async prompt() {
    await super.prompt()
    const {
      officeNumber,
    } = await inquirer.prompt([{
      message: "What is your office number?",
      name: "officeNumber",
    }])
    this.officeNumber = officeNumber
  }
  getOfficeNumber() {
    return this.officeNumber
  }
  getRole() {
    return "Manager"
  }
}

module.exports = Manager;
