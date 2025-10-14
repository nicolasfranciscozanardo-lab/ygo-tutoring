// Example API endpoint (replace with the real one)
const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

document.getElementById('fetch-btn').addEventListener('click', () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Process data as needed
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('output').textContent = 'Error fetching data: ' + error;
        });
});
