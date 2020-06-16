const fs = require("fs");

// Synchronous method
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync(".txt/output.txt", textOut);
// console.log("File written!");

// Asyncronous method: see what happnes to the "reading file..." output
fs.readFile("./txt/start.txt", "utf-8", (err, text1) => {
  fs.readFile(`./txt/${text1}.txt`, "utf-8", (err, text2) => {
    console.log(text2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, text3) => {
      console.log(text3);

      fs.writeFile("./txt/final.txt", `${text2}\n${text3}`, "utf-8", (err) => {
        console.log("Your file has been written!");
      });
    });
  });
});
console.log("Will read file ...");
