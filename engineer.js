const Employee = require('./employee')
const inquirer = require("inquirer")

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email)
    this.github = github;
  }
  async prompt() {
    await super.prompt()
    const {
      github,
    } = await inquirer.prompt([{
      message: "What is your GitHub username?",
      name: "github",
    }])
    this.github = github
  }
  getGithub() {
    return this.github
  }
  getRole() {
    return "Engineer"
  }
}

module.exports = Engineer;
