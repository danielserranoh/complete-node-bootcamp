// info Converting callback-nesting into Promises

// The process requires three steps, as seen befor in index-L41:
// 1- read the breed form the file
// 2- get the image for the server
// 3- save the image link to a file

//+ we are going to chain the callbacks instead of nesting them
// to obtain a flat structure of chained promises

const fs = require("fs");
const superagent = require("superagent");

//We have to build a promisified verion of fs.readFile, becuse readFile is syncronous
// we could have used readFileStream but the point was to learn
// how to declare a funcion with a promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 🤨");
      resolve(data);
    });
  });
};

// We also have to build a promisified version of writeFile,
// for the same reasons we had to build the readFilePro version:
// we are chaining promises: So a promise has to return a promise
// that handles a promise and returns a promise and so on...
const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject("I could not save the file 😢");
      resolve("success");
    });
  });
};

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
// });

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`); // comprueba que ha lio el nombre del archivo
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  //   .then((res) => {
  //     console.log(res.body.message);
  //     return res;
  //   })
  .then((resolve, reject) => {
    console.log(resolve.body.message);
    return writeFilePro("dogimage.txt", resolve.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    console.log(err.message);
  });
