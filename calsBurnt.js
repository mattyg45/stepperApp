const form = document.getElementById('data-form');
const stepsInput = document.getElementById('steps-input');
const dateInput = document.getElementById('date-input');
const resultBox = document.getElementById('result');
const dataTableBody = document.querySelector('#data-table tbody');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');
const CALORIES_PER_STEP = 0.04;

// Load data from localStorage on page load
let data = JSON.parse(localStorage.getItem('caloriesData')) || [];

// Function to render the table with data from localStorage
const renderTable = () => {
    dataTableBody.innerHTML = '';
    data.forEach(entry => {
        const newRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = entry.date;
        const caloriesCell = document.createElement('td');
        caloriesCell.textContent = entry.calories;
        newRow.appendChild(dateCell);
        newRow.appendChild(caloriesCell);
        dataTableBody.appendChild(newRow);
    });
};

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const steps = parseInt(stepsInput.value, 10);
    const date = dateInput.value;

    if (isNaN(steps) || steps < 0 || !date) {
        resultBox.textContent = "Please enter a valid step count and select a date.";
    } else {
        const caloriesBurnt = (steps * CALORIES_PER_STEP).toFixed(2);
        resultBox.textContent = `You burned approximately ${caloriesBurnt} calories!`;

        // Check if the date already exists in the data
        const existingEntry = data.find(entry => entry.date === date);

        if (existingEntry) {
            // If the date exists, update the calories
            existingEntry.calories = (parseFloat(existingEntry.calories) + parseFloat(caloriesBurnt)).toFixed(2);
        } else {
            // If the date does not exist, add a new entry
            const newEntry = { date, calories: caloriesBurnt };
            data.push(newEntry);
        }

        // Save updated data to localStorage
        localStorage.setItem('caloriesData', JSON.stringify(data));

        // Render updated table
        renderTable();

        // Clear form inputs
        stepsInput.value = '';
        dateInput.value = '';

        resultBox.classList.remove('hidden');
    }
});

// Export data as JSON
exportBtn.addEventListener('click', () => {
    if (data.length === 0) {
        alert('No data to export!');
        return;
    }

    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'calories_data.json';
    a.click();
});

// Clear all data
clearBtn.addEventListener('click', () => {
    // Clear the data from localStorage
    localStorage.removeItem('caloriesData');
    data = [];
    renderTable();
    resultBox.classList.add('hidden');
});

// Initial render on page load
renderTable();
