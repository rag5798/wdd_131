//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`//the html string made from step;
}
const stepsHtml = steps.map(step => listTemplate(step));// use map to convert the list from strings to HTML
document.querySelector('#myList').innerHTML = `${stepsHtml.join('')}`; // set the innerHTML



let grade = ['A', 'C', 'D']
grade.forEach(element => {
    document.querySelector('#myList').innerHTML += `Letter Grade: ${listTemplate(element)}`;
});
let gpa = grade.map(grade => lookupGrade(grade))
gpa.forEach(element => {
    document.querySelector('#myList').innerHTML += `GPA: ${listTemplate(element)}`;
});
let calc = gpa.reduce(function(add, current){return add + current}, 0)/gpa.length;
document.querySelector('#myList').innerHTML += `${listTemplate(calc.toPrecision(3))}`;



let fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
let big_fruit = fruit.filter(word => word.length > 5);
big_fruit.forEach(element => {
    document.querySelector('#myList').innerHTML += `Fruit Larger than 6 Characters: ${listTemplate(element)}`;
});



let lottery = [12, 34, 21, 54];
const luckyNumber = 21;
let lucky_index = lottery.indexOf(luckyNumber)

if (lucky_index){
    document.querySelector('#myList').innerHTML += `Lucky Index: ${listTemplate(lucky_index)}`;
}

function lookupGrade(grade) {
// converts the letter grade to it's GPA point value and returns it
    const gpa = {
        'A+': 4.0,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D': 1.0,
        'F': 0.0 
    };
    if (grade in gpa){
        return gpa[grade];
    }else{
        throw new Error('LETTER GRADE NOT VALID' + grade);
    }

}
