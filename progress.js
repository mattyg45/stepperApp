// Global array to store step data
let stepsData = [];

// Add steps manually
document.getElementById('add-steps-btn').addEventListener('click', () => {
    const date = document.getElementById('date-input').value;
    const steps = document.getElementById('steps-input').value;

    if (date && steps) {
        // Add to steps data array
        stepsData.push({ date, steps });
        
        // Add to table
        const tableBody = document.querySelector('#steps-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${steps}</td>
        `;
        tableBody.appendChild(row);

        // Clear inputs
        document.getElementById('date-input').value = '';
        document.getElementById('steps-input').value = '';
    } else {
        alert('Please fill in both the date and steps!');
    }
});

// Clear the table and steps data
document.getElementById('clear-steps-btn').addEventListener('click', () => {
    stepsData = [];
    const tableBody = document.querySelector('#steps-table tbody');
    tableBody.innerHTML = ''; // Clear the table body
});

// Export steps data as JSON file
document.getElementById('exportData').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(stepsData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'stepsData.json';
    link.click();
});

// Fetch Fitbit Data
document.getElementById('fetchData').addEventListener('click', async () => {
    const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with a valid token

    try {
        // Fetch user profile data
        const profileResponse = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!profileResponse.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const profileData = await profileResponse.json();
        const userId = profileData.user.encodedId;

        // Fetch step count for today
        const activityResponse = await fetch(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/1d.json`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!activityResponse.ok) {
            throw new Error('Failed to fetch activity data');
        }

        const activityData = await activityResponse.json();
        const steps = activityData['activities-steps'][0].value;

        // Update the table with Fitbit steps
        const tableBody = document.querySelector('#steps-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Today (Fitbit)</td>
            <td>${steps}</td>
        `;
        tableBody.appendChild(row);

        // Add to steps data array
        stepsData.push({ date: 'Today (Fitbit)', steps });

    } catch (error) {
        console.error('Error fetching Fitbit data:', error);
        alert('Error fetching Fitbit data. Please check the console for details.');
    }
});
