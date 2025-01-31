const score = 100
const temperature = 36.6
const greeting = "Hello, JavaScript!"
const isLearningFun = true
console.log(score)
console.log(temperature)
console.log(greeting)
console.log(isLearningFun)

//using const because the object shouldn't be changed, but we can add properties
//const uses key value so it looks like name: "Dul"
// function uses this.varName = ___
const student = {
    name: "Dul",
    age: 21,
    subjects: ["math","science","econ"],
    isGraduated: false
}
console.log("\n")

// prime numbers
const primeNumbers = [2,3,4,7,11]
primeNumbers[1] = 4;
console.log(primeNumbers[1])
console.log('Mistake detected');
primeNumbers[1] = 3

// Arithmetic Operators
let num1 = 15;
let num2 = 4;

// Basic arithmetic operations
let sum = num1 + num2;
let product = num1 * num2;
let modulus = num1 % num2;

console.log("\nArithmetic Operations:");
console.log(`Sum of ${num1} + ${num2} = ${sum}`);
console.log(`Product of ${num1} * ${num2} = ${product}`);
console.log(`Modulus of ${num1} % ${num2} = ${modulus}`);

// Comparison Operators
let x = 10;
let y = 5;

console.log("\nComparison Operations:");
console.log(`x = ${x}, y = ${y}`);
console.log(`x > y: ${x > y}`);   // Greater than
console.log(`x < y: ${x < y}`);   // Less than
console.log(`x >= y: ${x >= y}`); // Greater than or equal to
console.log(`x <= y: ${x <= y}`); // Less than or equal to
console.log(`x === y: ${x === y}`); // Strict equality
console.log(`x !== y: ${x !== y}`); // Strict inequality

// Logical Operators
let isRaining = true;
let isWarm = false;

console.log("\nLogical Operations:");
console.log(`isRaining AND isWarm: ${isRaining && isWarm}`); // Logical AND
console.log(`isRaining OR isWarm: ${isRaining || isWarm}`);  // Logical OR
console.log(`NOT isRaining: ${!isRaining}`);                 // Logical NOT

//If-Else

if (score > 50) {
    console.log("Great job!");
} else {
    console.log("Keep trying!");
}

console.log("\nPrime numbers printed")
for(let i = 0; i < primeNumbers.length;i++){
    console.log(primeNumbers[i])
}

let score2 = score
console.log("\nDecrementing score from", score2, "to 0:");
while (score2 > 0) {
    console.log(score2);
    score2 -= 10; // Decrease by 10 each time to make the output more manageable
}
console.log("Final score:", score2);

// Part 1: Event Countdown Function
function eventCountdown(eventDate) {
    const now = new Date();
    const event = new Date(eventDate);
    const timeDiff = event - now;
    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds remaining until the event.`;
}

// Test the countdown function
const countdownMessage = eventCountdown('December 31, 2024 23:59:59');
console.log(countdownMessage);

// How it works:
// creates two dates, one for now and one for the event. It calculates the timeDiff. Then we use that to convert minutes, hours, and days.
// we use modulo to get the remainder for hours, minutes, and seconds
// the it returns a formatted string with the countdown

// Part 2: Swap Function
function swapThreeVariables(a, b, c) {
    // Store original value of a
    let temp = a;
    // Perform the circular swap
    a = c;
    c = b;
    b = temp;
    return [a, b, c];
}

// swap function Test
x = 1, y = 2
let z = 3;
console.log('Before swap:', x, y, z);
[x, y, z] = swapThreeVariables(x, y, z);
console.log('After swap:', x, y, z);

// Part 3: Find Longest Word Function
function findLongestWord(sentence) {
    const words = sentence.split(' ');
    let longestWord = '';
    
    for (let word of words) {
        // Remove any punctuation from the word for accurate length comparison
        const cleanWord = word.replace(/[.,!?]/g, '');
        if (cleanWord.length > longestWord.length) {
            longestWord = cleanWord;
        }
    }
    
    return longestWord;
}

// Test the longest word function
console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));

