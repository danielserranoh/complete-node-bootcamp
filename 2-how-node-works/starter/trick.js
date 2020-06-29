//* Understanding asyncronous nature of Node
//@ http://thecodebarbarian.com/80-20-guide-to-async-await-in-node.js.html

//! This is a trick due to the way node is build and the
//! asyncronicity of setTimeout()
//setTimeout is async and therefore enters the event loop,
// while the rest of the code never hits the event loop an is
// fully syncronous con

for (var i = 0; i < 5; ++i) {
  // Actually prints out "5" 5 times.
  // But if you use `let` above, it'll print out 0-4
  setTimeout(() => console.log(i), 0);
}

// This will print *before* the 5's
let x = -2;
x += 1;
console.log("x =", x);

// the reason why the for loop writes 5 when the iterator is a var
// is because as a var it is evaluated inside the for block.
// Becase the for loop happens really fast, by the time the console.log
// insode the setTimeout function grabs the value of the iterator, the for
// loop has been run 5 times, and i = 5 (becasue its seen as a global variable,
// and the value changed "outside the scope of the block of code inside the
// for loop")
// When the iterator is declared with let, th eiterator can´t be changed "externally",
// and hence, once it is passed to the code block, it keeps it's value
// (it's like the value is carried along the whole funcion)
