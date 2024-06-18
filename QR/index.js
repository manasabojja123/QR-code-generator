/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Prompt the user to enter a URL
inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR code image from the URL
    const qr_svg = qr.image(url);
    
    // Pipe the QR code image to a writable stream and save it as qr_img.png
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // Save the URL to a text file named URL.txt
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved to URL.txt!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("Something else went wrong:", error);
    }
  });
