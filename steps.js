const totalSteps = {
    today: 0,
    yesterday: 0,
    twoDaysAgo: 0,
};

document.getElementById('update-steps-btn').addEventListener('click', function () {
    const daySelect = document.getElementById('day-select').value;
    const stepsInput = document.getElementById('steps-input');
    const stepsValue = parseInt(stepsInput.value, 10);

    if (!isNaN(stepsValue) && stepsValue > 0) {
        totalSteps[daySelect] += stepsValue;

        document.getElementById(`${daySelect}-steps`).textContent = totalSteps[daySelect];

        stepsInput.value = ''; 
        alert('Please enter a valid number of steps.');
    }
});
