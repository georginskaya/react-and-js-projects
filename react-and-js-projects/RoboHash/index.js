// select all element that you need
// pay attention to the format
// creat an img element and put the generated img source into it
// fetch date and use async

const textInput = document.getElementById("text-input");
const generateBtn = document.getElementById("generate-btn");
const selectDropdown = document.getElementById("select-set");
const container = document.getElementById("robohash-container");

// assigning the arguments upon a button click by running an anonymous function
generateBtn.addEventListener("click", () => {
  let text = textInput.value;
  let selected = selectDropdown.value;

  // running the actual function
  getImage(text, selected);
});

function randomSize() {
  let sizes = ["50", "100px", "150px", "200px", "250px", "350px"];
  let index = Math.floor(Math.random() * sizes.length);
  return sizes[index];
}

// await - operator is used to wait for a Promise
//to complete before executing the rest of the code
// only works with async functions

async function getImage(text, selected) {
  let encodedText = encodeURIComponent(text);
  try {
    let response = await axios.get(
      `https://robohash.org/${encodedText}?set=${selected}`
    );

    console.log(response);
    // this  code  line will not run until the promise (await response) returns

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    // appending img and text
    let img = document.createElement("img");
    img.src = response.request.responseURL;
    imgContainer.appendChild(img);
    let randomWidth = randomSize();
    img.style.width = randomWidth;
    img.style.height = randomWidth;

    let fing = document.createElement("span");
    fing.innerHTML = `${text}`;
    fing.classList.add("findcaption");
    imgContainer.appendChild(fing);

    container.appendChild(imgContainer);
  } catch (error) {
    console.log(`something went wrong: ${error}`);
  }
}

window.onload = function () {
  const robots = [
    { text: "Lucia Johnsonuk", set: "set1" },
    { text: "Pedrito von der Heid", set: "set1" },
    { text: "Denise Howdiy", set: "set1" },
    { text: "Roman Kaydar", set: "set1" },
  ];

  robots.forEach((robot) => getImage(robot.text, robot.set));
};
