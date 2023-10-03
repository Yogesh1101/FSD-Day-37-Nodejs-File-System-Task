// Importing all required modules
import express from "express";
import fs from "fs";
import moment from "moment";

// assigning express to app and settin 4000 as PORT Number
const app = express();
const PORT = 4000;

app.use(express.json());

// API Endpoint to create a text file with current timestamp in a given folder
// "/createTimestampFile" is the endpoint name

app.post("/createTimestampFile", (req, res) => {
  const date = new Date().toString().trim(); // it is brief dateTime format to store inside the file as content
  const timestamp = moment().format("YYYY-MM-DD_HH-mm-ss"); // short dateTime format to set as text file name

  // write the file inside the folder and file name as timestamp value
  fs.writeFile(`./files/${timestamp}.txt`, date, (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error occurred while creating the file." });
    } else {
      res.json({
        message: "File with current timestamp name is created successfully.",
      });
    }
  });
});

// API Endpoint to retrieve a list of all text files in the given folder.
// "/getAllTextFiles" is the endpoint name.

app.get("/getAllTextFiles", (req, res) => {
  // reading the files inside the files folder
  // to get text files only filter is used
  fs.readdir(`./files`, (err, files) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Error occurred while reading the text files." });
    } else {
      const txtFiles = files.filter((txt) => txt.endsWith(".txt"));
      res.json({ txtFiles });
    }
  });
});

// to ensure the server is listening to port 4000
app.listen(PORT, () => console.log("Server running on PORT => ", PORT));
