// step 1
console.log("A");
console.log("B");
console.log("C");

// step 2
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

// step 3
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// step 4
async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("3");
test();
console.log("4");

console.log("A");

// step 5
setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");