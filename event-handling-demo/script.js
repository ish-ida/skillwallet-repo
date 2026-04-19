// Step 4.1: Access DOM elements
const input = document.getElementById("textInput");
const button = document.getElementById("clickBtn");
const output = document.getElementById("output");
const form = document.getElementById("myForm");
const dropdown = document.getElementById("dropdown");


// Step 4.2: Click Event
button.addEventListener("click", () => {
    output.textContent = "Button was clicked!";
});


// Step 4.3: Input & Change Events
input.addEventListener("input", () => {
    output.textContent = "Typing: " + input.value;
});

dropdown.addEventListener("change", () => {
    output.textContent = "Selected: " + dropdown.value;
});


// Step 4.4: Submit Event
form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent reload
    output.textContent = "Form submitted!";
});


// Step 4.5: Keyup Event
input.addEventListener("keyup", (e) => {
    console.log("Last key:", e.key);
});


// Step 4.6: Mouse Events
button.addEventListener("mouseover", () => {
    output.textContent = "Mouse over button";
});

button.addEventListener("mouseout", () => {
    output.textContent = "Mouse left button";
});


// Step 4.7: Focus & Blur Events
input.addEventListener("focus", () => {
    input.style.backgroundColor = "#e0f7ff";
});

input.addEventListener("blur", () => {
    input.style.backgroundColor = "white";
});