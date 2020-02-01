class Employee {
  constructor(data) {
    if (!data) throw "No data"
    if (!data.name) throw "Name is required"
    if (!data.id) throw "ID is required"
    if (!data.title) throw "Title is required"

    this.name = data.name;
    this.id = data.id;
    this.title = data.title;
  }
}

module.exports = Employee;
