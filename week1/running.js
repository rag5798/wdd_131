const apples = 3
const organges = 5

let total = apples + organges

console.log("Total: ", total)

const h1 = document.createElement('h1')
h1.textContent = `Apples: ${apples} Oranges: ${organges}`
document.body.append(h1)

const h2 = document.createElement('h2')
h2.textContent = `Total: ${total}`
document.body.append(h2)