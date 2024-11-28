document.addEventListener("DOMContentLoaded", () => {
    const goals = [
        "Run 5 miles", "Read a book for 30 minutes", "Drink 8 glasses of water",
        "Do 50 push-ups", "Meditate for 15 minutes", "Cook a new recipe",
        "Learn a new language", "Walk 10,000 steps", "Take a yoga class",
        "Journal for 10 minutes", "Climb a mountain", "Practice a musical instrument",
        "Volunteer for a charity", "Go for a swim", "Do a digital detox for 24 hours",
        "Complete a puzzle", "Write a letter to a friend", "Try a new hobby",
        "Take a cooking class", "Watch a documentary", "Go on a hike", 
        "Sleep for 8 hours", "Organize your workspace", "Plan a road trip",
        "Try a new restaurant", "Visit a new city", "Create a vision board",
        "Start a blog", "Run a 5k", "Make homemade bread", "Try a new fitness routine",
        "Spend time with family", "Clean your house", "Take a day off work",
        "Learn a new recipe", "Go on a bike ride", "Do a random act of kindness",
        "Declutter your home", "Start a garden", "Paint a picture", "Learn photography",
        "Join a fitness challenge", "Watch the sunset", "Watch a sunrise",
        "Organize your closet", "Complete a home improvement project", "Go stargazing",
        "Try a new sport", "Attend a live concert", "Take a dance class", "Attend a webinar",
        "Plan your finances", "Create a bucket list", "Do a digital declutter",
        "Start journaling", "Take a weekend trip", "Start an exercise routine", 
        "Complete a personal challenge", "Meet a friend you haven't seen in a while",
        "Learn to cook a complex dish", "Start a podcast", "Try an online course",
        "Go on a road trip", "Learn to play chess", "Attend a networking event",
        "Go to a museum", "Do a social media detox", "Explore a nearby town",
        "Start a daily gratitude journal", "Take a mental health day", "Do a fitness test",
        "Get up early for a week", "Spend a day without technology", "Complete a self-improvement book",
        "Take a creative writing course", "Do a charity run", "Explore a local park",
        "Go for a long walk", "Try a new workout routine", "Do a deep clean of your home",
        "Write a poem", "Learn a new language", "Master a new skill", "Volunteer at a local event",
        "Give up a bad habit", "Complete a 30-day fitness challenge", "Spend time in nature",
        "Attend a local event", "Try intermittent fasting", "Start a DIY project",
        "Host a dinner party", "Go on a solo trip", "Learn how to meditate", "Take a cooking challenge",
        "Watch a TED talk", "Join a community group", "Take a mental health course",
        "Do a week-long challenge", "Take a photography class", "Read a biography",
        "Try a new fitness class", "Get a fitness tracker", "Set a daily routine",
        "Try a new type of exercise", "Start a side hustle", "Plan a weekend getaway",
        "Create a vision board", "Start a morning routine", "Go on a weekend retreat",
        "Make your own smoothies", "Write a daily journal", "Visit a farmer's market"
    ];

    let randomGoalButton = document.getElementById("randomGoalButton");
    let currentGoalElement = document.getElementById("currentGoal");
    let doneButton = document.getElementById("doneButton");
    let notDoneButton = document.getElementById("notDoneButton");
    const doneList = document.getElementById("doneList");
    const notDoneList = document.getElementById("notDoneList");
    const saveGoalsButton = document.getElementById("saveGoalsButton");
    const clearDataButton = document.getElementById("clearDataButton");

    const addGoalInput = document.getElementById("newGoalInput");
    const addGoalButton = document.getElementById("addGoalButton");

    let doneGoals = JSON.parse(localStorage.getItem('doneGoals')) || [];
    let notDoneGoals = JSON.parse(localStorage.getItem('notDoneGoals')) || [];

    // Function to update the UI based on saved goals
    const updateGoalLists = () => {
        doneList.innerHTML = '';
        notDoneList.innerHTML = '';

        doneGoals.forEach(goal => {
            const li = document.createElement("li");
            li.textContent = goal;
            doneList.appendChild(li);
        });

        notDoneGoals.forEach(goal => {
            const li = document.createElement("li");
            li.textContent = goal;

            const moveToDoneButton = document.createElement("button");
            moveToDoneButton.textContent = "Move to Done";
            li.appendChild(moveToDoneButton);

            moveToDoneButton.addEventListener("click", () => {
                doneGoals.push(goal);
                notDoneGoals = notDoneGoals.filter(g => g !== goal);
                localStorage.setItem('doneGoals', JSON.stringify(doneGoals)); // Save to localStorage
                localStorage.setItem('notDoneGoals', JSON.stringify(notDoneGoals)); // Save to localStorage
                updateGoalLists(); // Refresh UI
            });

            // Adding Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            li.appendChild(deleteButton);

            deleteButton.addEventListener("click", () => {
                notDoneGoals = notDoneGoals.filter(g => g !== goal);
                localStorage.setItem('notDoneGoals', JSON.stringify(notDoneGoals)); // Save to localStorage
                updateGoalLists(); // Refresh UI
            });

            notDoneList.appendChild(li);
        });
    };

    // Load goals when the page loads
    updateGoalLists();

    randomGoalButton.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * goals.length);
        currentGoalElement.textContent = goals[randomIndex];
    });

    doneButton.addEventListener("click", () => {
        const goalText = currentGoalElement.textContent;
        if (goalText) {
            doneGoals.push(goalText);
            localStorage.setItem('doneGoals', JSON.stringify(doneGoals)); // Save to localStorage
            updateGoalLists(); // Refresh UI
            currentGoalElement.textContent = "";
        }
    });

    notDoneButton.addEventListener("click", () => {
        const goalText = currentGoalElement.textContent;
        if (goalText) {
            notDoneGoals.push(goalText);
            localStorage.setItem('notDoneGoals', JSON.stringify(notDoneGoals)); // Save to localStorage
            updateGoalLists(); // Refresh UI
            currentGoalElement.textContent = "";
        }
    });

    addGoalButton.addEventListener("click", () => {
        const newGoal = addGoalInput.value.trim();
        if (newGoal) {
            notDoneGoals.push(newGoal);
            localStorage.setItem('notDoneGoals', JSON.stringify(notDoneGoals)); // Save to localStorage
            updateGoalLists(); // Refresh UI
            addGoalInput.value = "";
        }
    });

    saveGoalsButton.addEventListener("click", () => {
        const data = {
            doneGoals: doneGoals,
            notDoneGoals: notDoneGoals
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "goals.json"; // Name of the file to be downloaded
        a.click();
        URL.revokeObjectURL(url);
    });

    clearDataButton.addEventListener("click", () => {
        doneGoals = [];
        notDoneGoals = [];
        localStorage.removeItem('doneGoals');
        localStorage.removeItem('notDoneGoals');
        updateGoalLists(); // Refresh UI
    });
});
