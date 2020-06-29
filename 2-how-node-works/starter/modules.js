// console.log(arguments);
// console.log(require("module").wrapper);

// modeule.exports
const C = require("./test-module-1");
const calc1 = new C();

console.log(calc1.add(2, 5));

// exports Method 1
//const calc2 = require("./test-module-2");
//console.log(calc2.add(2, 5));
//exports Method 2
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();

// the ourput is:
//$ Hello form the module
// log this text 😎
// log this text 😎
// log this text 😎

// Because node runs the function once (that's why there is just one Hello...)
// but calls the export from the internal cache each time it is called again.
