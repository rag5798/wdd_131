const new_img = document.createElement('img')
new_img.src = "https://picsum.photos/200"
new_img.setAttribute('alt', "pic sum photo")
document.body.append(new_img)

const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

const new_section = document.createElement('section')
new_section.innerHTML = "<h2>DOM Basics</h2><p>This was added through Javascript</p>"
document.body.append(new_section)
