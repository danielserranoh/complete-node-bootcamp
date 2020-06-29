// Converting callback-nesting to async/await Promises
// info Building Promises
// Lesson 43

// The process requires three steps, as seen befor in index-L41:
// 1- read the breed form the file
// 2- get the image for the server
// 3- save the image link to a file

const fs = require("fs");
const superagent = require("superagent");

//+ We build the functions as promises to be able to hendle them as such
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
// We can hace as many awiats inside an async function as we need
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
  }
};

getDogPic();
