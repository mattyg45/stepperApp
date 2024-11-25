document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-bar');
    const form = document.getElementById('quick-input-form');
    const dropdown = document.getElementById('search-dropdown');
    
    let previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];

    function updateDropdown() {
        dropdown.innerHTML = ''; 
        previousSearches.forEach(term => {
            const option = document.createElement('option');
            option.value = term;
            option.textContent = term;
            dropdown.appendChild(option);
        });

        if (previousSearches.length > 0) {
            dropdown.classList.add('show');
        } else {
            dropdown.classList.remove('show');
        }
    }

    dropdown.addEventListener('change', function () {
        searchInput.value = dropdown.value;
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm && !previousSearches.includes(searchTerm)) {
            previousSearches.push(searchTerm);
            localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
            updateDropdown();
        }
    });

    updateDropdown();
});
