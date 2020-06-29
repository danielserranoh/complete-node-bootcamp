// Converting callback-nesting to async/await Promises
// info Undersatanding how async/await works and how to return values
// Lesson 44

// The process requires three steps, as seen befor in index-L41:
// 1- read the breed form the file
// 2- get the image for the server
// 3- save the image link to a file

//. Take Away: Async/await returns promises

const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 🤨");
      resolve(data);
    });
  });
};

const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject("I could not save the file 😢");
      resolve("success");
    });
  });
};

//+ We have to create an async function and chain the promises (functions)
// with await instead of having to chain them with .then(callback())
// We can have as many awiats inside an async function as we need
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`); // comprueba que ha lio el nombre del archivo

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dogimage.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "2: ready 😇";
};

//! An async function returns a promise, that needs to be handled as such
// The code below will return Promise {<pending>} for x
// console.log("1: will get dog pics");
// const x = getDogPic();
// console.log(x);
// console.log("3: done getting dog pics");

//+ Handling the issue with a promise based approximation
// The problem is of style: mixing async/await with promises
// console.log("1: will get dog pics");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: done getting dog pics");
//   })
//   .catch((err) => {
//     console.log("Error 💥");
//   });

//+ Handling the issue with an async/await function
(async () => {
  try {
    console.log("1: will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: done getting dog pics");
  } catch (error) {
    console.log("Error 💥");
  }
})();
