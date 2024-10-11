fetch('http://127.0.0.1:5000/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Process your data here
    })
    .catch(error => console.error('Error:', error));
