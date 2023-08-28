const fs = require('fs');
const inquirer = require('inquirer');

const questions = ["Please input Project title.", "Please give a Description of the Project.",
"Please provide Installation Instructions.", "Please Provide Usage Information.", 
"Please provide Constribution Guidelines", "Please provide Test Instructions."];

// Function to write README file
function writeToFile(fileName, data) {
  const [title, description, installation, usage, contribution, tests] = data;

  const readmeContent = `
  # ${title}

  ## Description
  ${description}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  ${installation}

  ## Usage
  ${usage}

  ## Contributing
  ${contribution}

  ## Tests
  ${tests}

  ## Questions
  If you have any questions, feel free to reach out via email or GitHub.

  Email: your-email@example.com
  GitHub: [Your GitHub Profile](https://github.com/your-github-username)
  `;

  fs.writeFile(fileName, readmeContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`README file (${fileName}) created successfully!`);
    }
  });
}

// Defining write file function using User Inputed Answers
function init() {
    inquirer.prompt(questions).then((answers) => {
        const data = Object.values(answers);
        writeToFile('README.md', data);
    });
}

// Call Initialization Function
init();