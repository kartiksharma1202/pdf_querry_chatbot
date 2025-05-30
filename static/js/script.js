document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('querySection').style.display = 'block';
            document.getElementById('queryInput').dataset.text = data.text;
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('askButton').addEventListener('click', function () {
    const query = document.getElementById('queryInput').value;
    const text = document.getElementById('queryInput').dataset.text;

    fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text, query: query })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('response').innerText = data.response;
        }
    })
    .catch(error => console.error('Error:', error));
});