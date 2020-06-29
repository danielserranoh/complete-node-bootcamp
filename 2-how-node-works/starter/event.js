//* observer pattern

const EventEmitter = require("events");
const http = require("http");
// extend the new Sales class with EventEmmiter (events)
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmiter = new Sales();
// observer
myEmiter.on("newSale", () => {
  console.log("There was a new sale!");
});

//observer
myEmiter.on("newSale", () => {
  console.log("Customer Name: Dani");
});

//observer
myEmiter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

// emiter
myEmiter.emit("newSale", 9);

//////////////////

const server = http.createServer();

// Nota: red.end es la forma de enviar info de vuelta
// ~ es equivalente a un return en una función normal
// porque es un evento emitido cuando todos los datos
// se han transmitido
server.on("request", (req, res) => {
  console.log("request received");
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Request received 🥰");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
