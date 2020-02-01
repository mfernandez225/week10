const inquirer = require("inquirer")
const Manager = require("./manager")
const Engineer = require("./engineer")
const Intern = require("./intern")
const fs = require("fs")

const teamMembers = []

// Choose the role of the team
const chooseTeamMemberRole = async () => {
  const {
    teamMemberRole
  } = await inquirer.prompt({
    type: "list",
    name: "teamMemberRole",
    message: "What kind of team member would you like to add?",
    choices: ["Manager", "Engineer", "Intern"]
  })
  return teamMemberRole
}

// Ask if you would like to add additional team members
const askToAddAnother = async () => {
  const {
    addAnother
  } = await inquirer.prompt({
    type: "confirm",
    name: "addAnother",
    message: "Would you like to add another team member?"
  })
  if (addAnother) {
    addTeamMember()
  } else {
    allDone()
  }
}

// Based on the role, ask correct questions
const addTeamMember = async () => {
  const role = await chooseTeamMemberRole()
  let employee;
  switch (role) {
    case "Manager":
      employee = new Manager();
      break;
    case "Engineer":
      employee = new Engineer();
      break;
    case "Intern":
      employee = new Intern();
  }
  await employee.prompt()
  teamMembers.push(employee)
  askToAddAnother()
}

// Generate the HTML based on the team members selected
const allDone = () => {
  const cards = teamMembers.map(teamMember => {
    switch (teamMember.getRole()) {
      case "Manager":
        return managerCard(teamMember)
      case "Engineer":
        return engineerCard(teamMember)
      case "Intern":
        return internCard(teamMember)
    }
  })

  // html template
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <title>Build a Team</title>
</head>
  <body class="container-fluid">
    <div class="row justify-content-center bg-danger mb-3">
        <h1 class="text-white p-5">My Team</h1>
    </div>
        <div class="row">
          ${cards.join("")}
        </div>
  </body>
</html>`
  // writes the HTML in the index and opens it in the browser
  fs.writeFileSync("./index.html", html)
  require('child_process').exec("open index.html");
}

// seperate cards based on role selection
const managerCard = manager => `
  <div class="card text-white font-weight-bold bg-primary border-primary m-1 p-5">
    <h3 class="text-center">${manager.name}</h3>
    <ul class="list-unstyled">
      <li>${manager.officeNumber}</li>
      <li>${manager.getRole()}</li>
      <li>${manager.id}</li>
      <li>${manager.email}</li>
    </ul>
  </div>
`

const engineerCard = engineer => `
  <div class = "card text-white font-weight-bold bg-warning border-warning m-1 p-5">
    <h3 class="text-center">${engineer.name}</h3>
    <ul class="list-unstyled">
      <li>${engineer.github}</li>
      <li>${engineer.getRole()}</li>
      <li>${engineer.id}</li>
      <li>${engineer.email}</li>
    </ul>
  </div>
`

const internCard = intern => `
  <div class = "card text-white font-weight-bold bg-success border-success m-1 p-5">
    <h3 class="text-center">${intern.name}</h3>
    <ul class="list-unstyled">
      <li>${intern.school}</li>
      <li>${intern.getRole()}</li>
      <li>${intern.id}</li>
      <li>${intern.email}</li>
    </ul>
  </div>
`

addTeamMember()
