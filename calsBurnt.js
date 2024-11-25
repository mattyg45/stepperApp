const form = document.getElementById('calories-form');
const stepsInput = document.getElementById('steps-input');
const resultBox = document.getElementById('result');

const CALORIES_PER_STEP = 0.04;

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const steps = parseInt(stepsInput.value, 10);
    if (isNaN(steps) || steps < 0) {
        resultBox.textContent = "Please enter a valid step count.";
    } else {
        const caloriesBurnt = (steps * CALORIES_PER_STEP).toFixed(2);
        resultBox.textContent = `You burned approximately ${caloriesBurnt} calories!`;
    }

    resultBox.classList.remove('hidden');
});
