const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1: Small, local = not production ready
  //   fs.readFile("./starter/test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Solution 2: Streams
  //   const readable = fs.createReadStream("./starte/test-file.txt");
  //   readable.on("data", (chunk) => {
  //     // streaming the file to the client
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  // Solution 3: piping
  const readable = fs.createReadStream("./starter/test-file.txt");
  readable.pipe(res);
  //readableSource.pipe(writableDestination)
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
