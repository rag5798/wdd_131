function getGrades(inputSelector) {
    // get grades from the input box
    const text_box = document.querySelector(inputSelector)
    const text = text_box.value;
    // split them into an array (String.split(','))
    const grades = text.split(',');
    // clean up any extra spaces, and make the grades all uppercase. (Array.map())    
    // return grades
    return grades.map(text => text.toUpperCase().trim());
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

function calculateGpa(grades) {
  // gets a list of grades passed in
  let gpa = 0;
  // convert the letter grades to gpa points
  grades.forEach(element => {
      const point_value = lookupGrade(element);
      gpa += point_value;
  });
  // calculates the GPA
  // return the GPA
  return gpa/grades.length;
}

function outputGpa(gpa, selector) {
  // takes a gpa value and displays it in the HTML in the element identified by the selector
  const text_element = document.querySelector(selector);
  text_element.textContent = `${gpa}`;
}

function clickHandler() {
  // when the button in our html is clicked:
  const text_value = document.querySelector('#grades');
  console.log(text_value.value)
  if (text_value.value == ''){
    const output = document.querySelector('#output');
    output.textContent = 'No Values';
  }else{
    // get the grades entered into the input
    const list = getGrades('#grades')
    // calculate the gpa from the grades entered
    // display the gpa
    outputGpa(calculateGpa(list), '#output')
  }
}

const button = document.querySelector('#submitButton');
button.addEventListener('click', clickHandler)

