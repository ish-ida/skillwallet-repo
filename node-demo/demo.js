import fs from 'node:fs';
const message = "Hello! This is my first file created using Node.js 🚀";


fs.writeFile("message.txt", message, (err) => {
    if (err) {
        console.log("Error writing file:", err);
        return;
    }

    console.log("File created successfully: message.txt");
});