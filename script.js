function displayResults(results) {
    const resultContainer = document.getElementById('result-container');

    // Clear previous results
    resultContainer.innerHTML = '';

    if (results.length > 0) {
        // Add a class to remove the placeholder
        resultContainer.classList.add('has-results');
        
        // Append new results (example code, adjust as needed)
        results.forEach(result => {
            const resultBox = document.createElement('div');
            resultBox.className = 'result-box';
            resultBox.innerHTML = `<h2>${result.title}</h2><p>${result.description}</p>`;
            resultContainer.appendChild(resultBox);
        });
    } else {
        // Show placeholder if no results
        resultContainer.classList.remove('has-results');
    }
}





const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultContainer = document.getElementById('result-container');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
                headers: {
                    'X-Api-Key': '0C0Kqwnl57Aag2frNVJkaw==oTPc603sQuwTGCzK' // Replace with your actual API key
                }
            });
            const data = await response.json();

            if (data.length > 0) {
                const resultHTML = data.map((item) => {
                    return `
                        <div class="result-box">
                            <h2>${item.name}</h2>
                            <p>Calories: ${item.calories}</p>
                            <p>Fat: ${item.fat_total_g}g (Total), ${item.fat_saturated_g}g (Saturated)</p>
                            <p>Protein: ${item.protein_g}g</p>
                            <p>Carbohydrates: ${item.carbohydrates_total_g}g</p>
                            <p>Sugar: ${item.sugar_g}g</p>
                            <p>Fiber: ${item.fiber_g}g</p>
                            <p>Sodium: ${item.sodium_mg}mg</p>
                            <p>Potassium: ${item.potassium_mg}mg</p>
                        </div>
                    `;
                }).join('');
                resultContainer.innerHTML = resultHTML;
            } else {
                resultContainer.innerHTML = 'No results found.';
            }
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
            resultContainer.innerHTML = 'Error: Unable to fetch data. Please try again.';
        }
    } else {
        resultContainer.innerHTML = 'Please enter a search query.';
    }
});


