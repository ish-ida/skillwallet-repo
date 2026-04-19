// Step 2: Convert var â†’ let / const

const name = "Akio";   // constant
let age = 20;          // can change

age = 21; // reassigned

console.log(name, age);


// Step 3: Convert Functions â†’ Arrow Functions

// Old ES5:
// function greet(name) {
//     return "Hello " + name;
// }

// ES6 Arrow Function
const greet = (name) => `Hello ${name}`;


// Step 4: Template Literals

const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);


// Step 5: Modern ES6 Features

// 1. Destructuring
const person = {
    username: "Kei",
    country: "Philippines"
};

const { username, country } = person;

console.log(`User: ${username}, Country: ${country}`);


// 2. Spread Operator
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log("New Numbers:", newNumbers);


// 3. Default Parameters
const multiply = (a = 1, b = 1) => a * b;

console.log("Multiply:", multiply(5, 2));
console.log("Default Multiply:", multiply());


// Display output in webpage
document.getElementById("output").textContent =
    `${greet(name)} | ${message}`;