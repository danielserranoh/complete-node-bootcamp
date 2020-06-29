// Converting callback-nesting to async/await Promises
// info Waiting for multiple promises simoultaneously
// Lesson 45

// The process requires three steps, as seen befor in index-L41:
// 1- read the breed form the file
// 2- get the image for the server
// 3- save the image link to a file

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

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`); // comprueba que ha lio el nombre del archivo

    //+ create three calls to the promis
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    //+ catch all the promises
    //* What happens when there are many of them?
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = all.map((el) => el.body.message);
    console.log(images);

    await writeFilePro("dogimage.txt", images.join("\n"));
    console.log("Random dog image saved to file!");
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "2: ready 😇";
};

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
