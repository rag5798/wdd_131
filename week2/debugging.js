const pi = 3.14;
let radius = 3;
let area = 0;
area = calcArea(radius);
const equation = document.createElement('p');
equation.textContent = `${pi} * ${radius}\^2 = ${area}`;
document.body.append(equation);


radius = 4;
area = calcArea(radius);
const eq2 = document.createElement('p');
eq2.textContent = `${pi} * ${radius}\^2 = ${area}`
document.body.append(eq2);

function calcArea(radius){
    return radius * radius * 3.14;
}