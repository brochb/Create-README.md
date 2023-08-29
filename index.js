const fs = require('fs');
const inquirer = require('inquirer');
const { renderLicenseBadge, renderLicenseLink, renderLicenseSection } = require('./utils/generateMarkdown');

const questions = [{
    type: 'input',
    message: 'Please input Project title.',
    name: 'title',
}, {
    type: 'input',
    message: 'Please give a Description of the Project.',
    name: 'desciption',
}, {
    type: 'input',
    message: 'Please provide Installation Instructions.',
    name: 'installation',
}, {
    type: 'input',
    message: 'Please Provide Usage Information.',
    name: 'usage',
}, {
    type: 'input',
    message: 'Please provide Contribution Guidelines',
    name: 'contribution',
}, {
    type: 'input',
    message: 'Please provide Test Instructions.',
    name: 'test'
}];

// Function to write README file
function writeFile(fileName, data) {
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

  Email: brochbaltzer@gmail.com
  GitHub: [Your GitHub Profile](https://github.com/brochb)
  `;

    fs.writeFile(fileName, readmeContent, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`README file (${fileName}) created successfully!`);
        }
    });
}

// Defining initialization function
function init() {
    inquirer.prompt(questions).then((answers) => {
        const data = Object.values(answers);
        writeFile('README.md', data);
    });
}

// Call Initialization Function
init();


// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README