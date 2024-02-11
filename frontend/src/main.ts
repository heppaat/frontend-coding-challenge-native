import "./style.css";
import { z } from "zod";

//validating the people data which arrives with fetch

const NameSchema = z.object({ name: z.string() });

const inputName = document.getElementById("nameInput") as HTMLInputElement;
//const submitButton = document.getElementById("submit") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;
const nameForm = document.getElementById("nameForm") as HTMLFormElement;
const errorDiv = document.getElementById("errorDiv") as HTMLDivElement;

const winnersMainDiv = document.getElementById(
  "winnersMainDiv"
) as HTMLDivElement;
const listOfWinners = document.getElementById("winnersList") as HTMLElement;

let inputValue: string;
const winnersArray: string[] = [];

const fetchData = async (event: Event) => {
  //prevent form submission
  event.preventDefault();

  // clear previous errors
  errorDiv.innerHTML = "";

  //get input value

  inputValue = inputName.value.trim().toLowerCase();

  //check for empty input
  if (!inputValue) return showError("Please enter a name");

  //check if input is more than 2 characters and not a number
  if (inputValue.length <= 2 || !/^[a-zA-Z]+$/.test(inputValue))
    return showError("Please enter at least 3 characters of alphabetic text");

  let response = null;

  try {
    response = await fetch("http://localhost:4100/api/people");
  } catch (error) {
    return showError("Network error");
  }

  //if no internet, network error
  if (response === null) return alert("network error");

  //client error? - not implemented
  if (response.status >= 400 && response.status < 500)
    return alert("Client error");

  //if server has error
  if (response.status >= 500) return alert("server error");

  //zod validation

  const names = await response.json();
  const result = NameSchema.array().safeParse(names);

  if (!result.success) return showError(result.error.toString());

  const validatedData = result.data;

  let isFound = false;
  for (let i = 0; i < validatedData.length; i++) {
    const listName = validatedData[i].name.toLowerCase();
    if (listName === inputValue) {
      isFound = true;
      break;
    }
  }

  if (isFound) {
    if (!winnersArray.includes(inputValue)) {
      resultDiv.innerHTML = `Congratulations, ${
        inputValue[0].toUpperCase() + inputValue.slice(1)
      } is a lucky name! You've won a prize. Will you accept it?<button id="acceptButton" class="btn btn-secondary">Accept</button>
  <button id="rejectButton" class="btn btn-secondary">Reject</button>`;

      const acceptButton = document.getElementById(
        "acceptButton"
      ) as HTMLButtonElement;
      const rejectButton = document.getElementById(
        "rejectButton"
      ) as HTMLButtonElement;

      rejectButton.addEventListener("click", () => {
        winnersMainDiv.style.display = "none";
        resultDiv.innerHTML = "";
      });

      acceptButton.addEventListener("click", () => {
        if (inputValue !== "") {
          inputName.value = "";
          winnersMainDiv.style.display = "flex";
          listOfWinners.insertAdjacentHTML(
            "beforeend",
            `<li>${inputValue[0].toUpperCase() + inputValue.slice(1)}</li>`
          );
          winnersArray.push(inputValue);
          inputValue = "";
          console.log(winnersArray);
        }
      });
    } else {
      showError(
        `I'm sorry, ${
          inputValue[0].toUpperCase() + inputValue.slice(1)
        } has already received their prize today!`
      );
    }
  } else {
    resultDiv.innerHTML = `I'm sorry, ${
      inputValue[0].toUpperCase() + inputValue.slice(1)
    } is not in today's list of lucky names.<button id="Ok" class="btn btn-secondary">Ok</button>`;

    const okButton = document.getElementById("Ok") as HTMLButtonElement;

    okButton.addEventListener("click", () => {
      resultDiv.innerHTML = "";
      inputName.value = "";
      //winnersMainDiv.style.display = "none";
    });
  }
};

const showError = (errorMessage: string) => {
  errorDiv.innerHTML = errorMessage;
  resultDiv.innerHTML = "";
};

nameForm.addEventListener("submit", fetchData);
