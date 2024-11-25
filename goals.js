document.addEventListener("DOMContentLoaded", () => {
    const goals = [
        "Run 5 miles",
        "Read a book for 30 minutes",
        "Drink 8 glasses of water",
        "Do 50 push-ups",
        "Meditate for 15 minutes",
        "Cook a new recipe",
        "Learn a new language",
        "Walk 10,000 steps",
        "Take a yoga class",
        "Journal for 10 minutes"
    ];

    let randomGoalButton = document.getElementById("randomGoalButton");
    let currentGoalElement = document.getElementById("currentGoal");
    let doneButton = document.getElementById("doneButton");
    let notDoneButton = document.getElementById("notDoneButton");
    const doneList = document.getElementById("doneList");
    const notDoneList = document.getElementById("notDoneList");

    randomGoalButton.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * goals.length);
        currentGoalElement.textContent = goals[randomIndex];
    });

    doneButton.addEventListener("click", () => {
        const goalText = currentGoalElement.textContent;
        if (goalText) {
            const li = document.createElement("li");
            li.textContent = goalText;
            doneList.appendChild(li);
            currentGoalElement.textContent = ""; 
        }
    });

    notDoneButton.addEventListener("click", () => {
        const goalText = currentGoalElement.textContent;
        if (goalText) {
            const li = document.createElement("li");
            li.textContent = goalText;
            li.addEventListener("click", () => {
                doneList.appendChild(li);
                li.removeEventListener("click", arguments.callee); 
            });
            notDoneList.appendChild(li);
            currentGoalElement.textContent = "";
        }
    });
});