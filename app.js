const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const myTeam = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


// Function to prompt the start of the session and add new employees
const addEmployee = () => {
    inquirer.
        prompt({
            type: "list",
            name: "choice",
            message: "Select a new employee to add to your team:",
            choices: [
                "Add a new Engineer",
                "Add a new Intern",
                "Add a new Manager",
                "Assemble my Team!"
            ]
        })
        .then(answer => {
        switch (answer.choice) {
            case "Add a new Engineer":
                newEngineer();
                break;
            case "Add a new Intern":
                newIntern();
                break;
            case "Add a new Manager":
                newManager();
                break;
            default:
                exit();
                break;
        }
    });
};

const newEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the NAME of your new ENGINEER:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the ID of your new ENGINEER:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the EMAIL for your new ENGINEER:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter the GITHUB account for your new ENGINEER:"
        }
    ]).then((answers) => {
        // Create new employee Engineer Instance
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // Push new Engineer class instance to myTeam
        myTeam.push(newEngineer)
        console.log("-----------------------------------");
        // Prompt add employee again
        addEmployee();
    });
}
const newIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the NAME of your new INTERN:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the ID of your new INTERN:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the EMAIL for your new INTERN:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter the SCHOOL your new INTERN attends:"
        }
    ]).then((answers) => {
        //create new employee Intern Instance
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        //push new Intern class instance to myTeam
        myTeam.push(newIntern)
        console.log("-----------------------------------");
        // Prompt add employee again
        addEmployee();
    });
}

const newManager = () => {
    //ask the questions
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the NAME of your new MANAGER:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the ID of your new MANAGER:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the EMAIL for your new MANAGER:"
        },
        {
            type: "input",
            name: "officeNum",
            message: "Enter the OFFICE NUMBER for your new MANAGER:"
        }
    ]).then((answers) => {
        // Create new employee Manager Instance
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNum);
        // Push new Manager class instance to myTeam
        myTeam.push(newManager)
        console.log("-----------------------------------");
        // Prompt add employee again
        addEmployee();
    });
}

const exit = () => {
    fs.writeFileSync(outputPath, render(myTeam), "utf-8")
    console.log("-----------------------------------");
    console.log("Congrats! Your team has been created!");
    console.log("-----------------------------------");
}

addEmployee();