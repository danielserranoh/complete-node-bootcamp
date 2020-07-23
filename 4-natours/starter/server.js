const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("success: DB connection established");
  });


// console.log(process.env);

// const testTour = new Tour({
//   name: "The Park Camper",
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((error) => {
//     console.log("error 😈:", error);
//   });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});