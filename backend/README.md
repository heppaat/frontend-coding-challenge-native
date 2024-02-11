# Challenge

This challenge is divided between the main task an additional stretch goals. All of those stretch goals are optional, but we would love to see them implemented. It is expected that you should be able to finish the chellenge in about 1.5 hours. If you feel you are not able to implement everything on time, try instead describing how you solve the points you didn't finish.

And also, please do not hesitate to ask any questions. Good luck!

## Do you have a lucky name?

Your task is to create a single page application that checks if a name the user enters is in the lucky names list for the day. If the name is lucky, then the person is a winner.
The user should be able to type in their name and submit it. You will have access to a mock api, which will provide you a list of people whose names are lucky. Once the application knows whether it is a lucky name or not, you should display that information back to the user.

If it's not a lucky name you should display a prompt with the message: "I'm sorry, {name} is not in today's list of lucky names."
Clicking "Ok" makes this message disappear and they can search for a different name.

If it's a lucky name then you should display a prompt with the message: "Congratulations, {name} is a lucky name! You've won a prize. Will you accept it?"
This prompts the user with two options:
* Accept: 
  * The name is added to the list of winners for the day.
  * The input field is cleared.
* Reject: 
  * The name is NOT added to the list of winners for the day.
  * The input field REMAINS with the inserted name.

The list of winners should be displayed in the same page.

Use your own judgement to make the user experience as pleasant as possible in your own terms, but don't spend much time on the visual, as the functionality is most important for the task.
You can use any UI libraries you're comfortable with to help completing this task, however, ElementPlus is already in the project for ease of use.

## Stretch goals

You may modify the "people" array to fit your needs. Some of these will also require the use of either the router and/or vuex store.

* Validate the input field to only accept letters and to not be smaller than 2 characters.
* Validate the api call by passing "canReturnError" as true and dealing with the error by displaying to the user a notification that an error occurred.
* Add a link that takes you to a dedicated page that shows only the list of people who have won. The winners should be the same as the list in the home page.
* Once the prize is "Accepted" for a name, don't allow it to win again. Displaying a message like "I'm sorry, {name} has already received their prize today!".
  * Persist this change through refreshing the page.
* Make a limit of 10 lucky names per day. Each day is arbitrary and the user can advance to the next day by clicking a button "Next day". Each subsequent day should not repeat a name from the previous day.
* Press enter to submit the name.
* Set up your favorite tools to measure and enforce code quality, apply linting rules, and format the code according to your preferred guideline.
* Prepare a TODO.md file describing possible further improvements to the architecture:
  * Assuming the list of names are fetched from an actual api, how would you implement authentication, rate limiting handling, error handling, api unavailability? - What kind of retry strategies you’d imagine implementing?
  * How can we protect the app from being abused?
  * How can we deploy the app into a cloud environment?
  * How can we be sure the app is running with the latest version of code?
  * What techniques you can employ to ensure users are not disrupted when you make significant changes to code?
  * What kind of accessibility best practices should we keep in mind?
  * How would you structure the css so that we have the most reusability but also the least leakage between components?
  * Any other improvements that you feel like could be added.
