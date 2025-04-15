
const employee1 = {
    firstName: "Sam",
    department: "Tech",
    designation: "Manager",
    salary: 40000,
    raiseEligible: true
};

const employee2 = {
    firstName: "Mary",
    department: "Finance",
    designation: "Trainee",
    salary: 18500,
    raiseEligible: true
};

const employee3 = {
    firstName: "Bill",
    department: "HR",
    designation: "Executive",
    salary: 21200,
    raiseEligible: false
};

console.log("Problem 1: Employees JSON", employee1, employee2, employee3);

const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: [employee1, employee2, employee3]
};

console.log("Problem 2: Company JSON", company);

const newEmployee = {
  firstName: "Anna",
  department: "Tech",
  designation: "Executive",
  salary: 25600,
  raiseEligible: false
};

company.employees.push(newEmployee);

console.log("Problem 3: Company after adding Anna", company);

let totalSalary = 0;
company.employees.forEach(emp => {
  totalSalary += emp.salary;
});

console.log("Problem 4: Total salary of all employees:", totalSalary);

function applyRaises(company) {
  company.employees.forEach(emp => {
    if (emp.raiseEligible) {
      emp.salary *= 1.10;
      emp.raiseEligible = false;
    }
  });
}

applyRaises(company);
console.log("Problem 5: Company after applying raises", company);

const wfhEmployees = ["Anna", "Sam"];

company.employees.forEach(emp => {
  emp.wfh = wfhEmployees.includes(emp.firstName);
});

console.log("Problem 6: Company after adding WFH status", company);
