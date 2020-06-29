const fs = require("fs");
const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });
// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// by adding the info in the res.json, () we cofigure the response format to Jsend
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port} ...`);
});
