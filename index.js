console.log(
  "\n\n This is a README.md file generator. Please read the included README file before using this application. \n\n Please type your answers to the questions below to generate your own README.md file.\n To type your answers press \n- 'Enter' \n- Then press 'i' \n- Press Ctrl v (Windows) - command v (Mac OS) to paste your text or start typing directly into the editor\n- Press 'escape' \n- Press colon ':' \n- Press 'wq' and 'Enter'\n\n"
);

// fs is the Node.js File System module, which is used to read and write files, and inquirer is a package that provides a way to prompt users for input in the command line using the prompt() method below.
const fs = require("fs");
const inquirer = require("inquirer");
const SimpleGit = require("simple-git");
const generateMarkdown = require("./utils/generateMarkdown.js");

async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?\n",
      },
      {
        type: "input",
        name: "repoTitle",
        message: "What is the exact title of your repository?\n",
      },
      {
        type: "editor",
        name: "description",
        message:
          "\nPlease enter a description of your project: \n 1. Explain the what, why, and how of your project. \n2. Use the following questions as a guide: \n\t- What was your motivation? \n\t- Why did you build this project? \n\t- What problem does it solve? \n\t- What did you learn?\n",
      },
      {
        type: "input",
        name: "deployedWebsite",
        message: "Please enter deployed website URL:\n",
      },
      {
        type: "input",
        name: "imgAlt",
        message: "Please enter your screenshot Alt:\n",
      },
      {
        type: "input",
        name: "screenshot",
        message: "Please enter relative path to screenshot:\n",
      },
      {
        type: "input",
        name: "screenshotSubtitle",
        message: "Please enter screenshot subtitle:\n",
      },
      {
        type: "editor",
        name: "installation",
        message: "Please enter installation instructions for your project:\n",
      },
      {
        type: "input",
        name: "librariesAndTools",
        message:
          "Please enter libraries and tools used for your project. Write them in a list like this: \n<li>First item</li> \n<li>Second item</li> \n<li>Third item</li>:\n",
      },
      {
        type: "editor",
        name: "usage",
        message: "Please enter usage information for your project:\n",
      },
      {
        type: "list",
        name: "license",
        message:
          "\n Please choose a license for your project\n (Visit https://choosealicense.com/ if you are unsure, which license to choose):",
        choices: [
          "MIT",
          "GPL-3-0",
          "apache-2-0",
          "BSD-3-clause",
          "ISC",
          "0bsd",
        ],
      },
      {
        type: "editor",
        name: "contribution",
        message: "\nPlease enter contribution guidelines for your project:\n",
      },
      {
        type: "editor",
        name: "tests",
        message: "Please enter test instructions for your project:\n",
      },
      {
        type: "input",
        name: "github",
        message: "What is your GitHub username?\n",
      },
      {
        type: "input",
        name: "website",
        message: "What is your website URL?\n",
      },
      {
        type: "input",
        name: "webLinkPlaceholder",
        message: "What is the placeholder for the website URL?\n",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?\n",
      },
      //add more questions here ...
    ]);

    const generatedContent = generateMarkdown(answers);
    await writeToFile("README.md", generatedContent);

    const git = new SimpleGit();
    await performGitOperations(git);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function writeToFile(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`${fileName} file generated successfully!`);
        resolve();
      }
    });
  });
}

async function performGitOperations(git) {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      await git.init();
    }
    await git.add("README.md");
    await git.commit("Generated README.md");
    await git.push();
    console.log("README.md pushed to remote repository successfully!");
  } catch (error) {
    console.error("Error during Git operations:", error);
  }
}

promptUser();
