//* Understanding async/await
//@ http://thecodebarbarian.com/80-20-guide-to-async-await-in-node.js.html

//Synchronous function
function bad() {
  throw new Error("bad");
}

//Asynchronous function due to Promise
function bad2() {
  return new Promise(() => {
    throw new Error("bad2");
  });
}

// Asynchronous function async/await catches sync and async errors
async function test() {
  try {
    await bad();
  } catch (error) {
    console.log("caught", error.message);
  }

  try {
    await bad2();
  } catch (error) {
    console.log("caught", error.message);
  }
}

test();
