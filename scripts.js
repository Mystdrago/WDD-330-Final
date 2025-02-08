document.getElementById("fetchQuotes").addEventListener("click", fetchQuotes);
document.getElementById("fetchActivities").addEventListener("click", fetchActivities);

async function fetchQuotes() {
    const quotesList = document.getElementById("quotesList");
    quotesList.innerHTML = "<li>Loading...</li>";

    try {
        const response = await fetch("https://api.quotable.io/random?count=9");
        const data = await response.json();
        quotesList.innerHTML = "";
        
        for (let i = 0; i < 9; i++) {
            let quoteText = data.content || "No quote available";
            let listItem = document.createElement("li");
            listItem.textContent = quoteText;
            quotesList.appendChild(listItem);
        }
    } catch (error) {
        console.error("API failed, loading from local JSON.");
        loadLocalQuotes();
    }
}

async function fetchActivities() {
    const activitiesList = document.getElementById("activitiesList");
    activitiesList.innerHTML = "<li>Loading...</li>";

    try {
        activitiesList.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const response = await fetch("https://www.boredapi.com/api/activity/");
            const data = await response.json();
            
            let activityText = data.activity || "No activity found";
            let listItem = document.createElement("li");
            listItem.textContent = activityText;
            activitiesList.appendChild(listItem);
        }
    } catch (error) {
        console.error("API failed, loading from local JSON.");
        loadLocalActivities();
    }
}

// Fallback: Load quotes from local JSON
async function loadLocalQuotes() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();
        const quotesList = document.getElementById("quotesList");
        quotesList.innerHTML = "";

        data.quotes.forEach(quote => {
            let listItem = document.createElement("li");
            listItem.textContent = quote;
            quotesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to load local JSON.");
        document.getElementById("quotesList").innerHTML = "<li>Failed to load quotes.</li>";
    }
}

// Fallback: Load activities from local JSON
async function loadLocalActivities() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();
        const activitiesList = document.getElementById("activitiesList");
        activitiesList.innerHTML = "";

        data.activities.forEach(activity => {
            let listItem = document.createElement("li");
            listItem.textContent = activity;
            activitiesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to load local JSON.");
        document.getElementById("activitiesList").innerHTML = "<li>Failed to load activities.</li>";
    }
}
