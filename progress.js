const totalSteps = {
    today: 0,
    yesterday: 0,
    twoDaysAgo: 0,
};

// Load steps data from localStorage (if it exists)
const loadStepsFromStorage = () => {
    const savedSteps = JSON.parse(localStorage.getItem('totalSteps'));
    if (savedSteps) {
        totalSteps.today = savedSteps.today || 0;
        totalSteps.yesterday = savedSteps.yesterday || 0;
        totalSteps.twoDaysAgo = savedSteps.twoDaysAgo || 0;
    }
    updateTable();
};

// Save the updated steps to localStorage
const saveStepsToStorage = () => {
    localStorage.setItem('totalSteps', JSON.stringify(totalSteps));
};

// Update the steps table by adding new rows
const updateTable = () => {
    const tbody = document.getElementById('steps-table').querySelector('tbody');
    tbody.innerHTML = ''; // Clear current table rows

    // Add a new row for each day with the total steps
    Object.keys(totalSteps).forEach(day => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day.charAt(0).toUpperCase() + day.slice(1);
        const stepsCell = document.createElement('td');
        stepsCell.textContent = totalSteps[day];

        row.appendChild(dayCell);
        row.appendChild(stepsCell);
        tbody.appendChild(row);
    });
};

// Update steps based on user input
document.getElementById('update-steps-btn').addEventListener('click', function () {
    const daySelect = document.getElementById('day-select').value;
    const stepsInput = document.getElementById('steps-input');
    const stepsValue = parseInt(stepsInput.value, 10);

    if (!isNaN(stepsValue) && stepsValue > 0) {
        totalSteps[daySelect] += stepsValue;
        saveStepsToStorage();
        updateTable();
        stepsInput.value = ''; // Clear input field after submission
    } else {
        alert('Please enter a valid number of steps.');
    }
});

// Clear the table values by setting all steps to 0
document.getElementById('clear-steps-btn').addEventListener('click', function () {
    // Reset all the steps to 0
    totalSteps.today = 0;
    totalSteps.yesterday = 0;
    totalSteps.twoDaysAgo = 0;
    
    // Save the updated steps to localStorage
    saveStepsToStorage();
    
    // Update the table to reflect the reset values
    updateTable();
});

// Load the steps data when the page loads
loadStepsFromStorage();
