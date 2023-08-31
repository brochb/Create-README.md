const fs = require('fs');
const inquirer = require('inquirer');

const { renderLicenseBadge, renderLicenseLink, renderLicenseSection } = require('./utils/generateMarkdown');

const licenseOptions = ['MIT License',
    'Apache License 2.0',
    'GNU General Public License (GPL) 3.0',
    'BSD 3-Clause "New" or "Revised" License'
];

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
    name: 'tests'
}, {
    type: 'input',
    message: 'Please provide your GitHub Username.',
    name: 'githubuser'
}, {
    type: 'input',
    message: 'Please enter your E-mail address.',
    name: 'email'
}, {
    type: 'list',
    message: 'Please select a license:',
    name: 'license',
    choices: licenseOptions,
}];



// Function to write README file
function writeFile(fileName, data, license) {
    const [title, description, installation, usage, contribution, tests, githubuser, email] = data;

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
  - [Licese](#license)
  - [Contact](#contact)

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

  ## License
  This Project is licenced under the ${license} License.

  ## Contact
  Email: ${email}
  GitHub: https://github.com/${githubuser}
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
        const selectedLicense = answers.license;
        const data = Object.values(answers);
        writeFile('README.md', data, selectedLicense);
    });
}

// Call Initialization Function
init();