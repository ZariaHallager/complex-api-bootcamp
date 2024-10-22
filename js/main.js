document.getElementById('translateButton').addEventListener('click', function () {
    const textToTranslate = document.getElementById('textToTranslate').value;
    const translationApiUrl = `https://api.funtranslations.com/translate/minion.json?text=${encodeURIComponent(textToTranslate)}`;
    const gifApiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=vbT1r9qavnRIbg0TUC4XXeKNO16SSiN9&q=minions&limit=25&offset=';

    fetch(translationApiUrl)
        .then(response => response.json())
        .then(data => {
            const translatedText = data.contents.translated;
            document.getElementById('translationResult').innerText = translatedText;
            return fetch(gifApiUrl + Math.floor(Math.random() * 100));
        })
        .then(response => response.json())
        .then(data => {
            const gifUrl = data.data[Math.floor(Math.random() * data.data.length)].images.original.url;
            const minionGif = document.getElementById('minionGif');
            minionGif.src = gifUrl;
            minionGif.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('translationResult').innerText = 'Error fetching translation or GIF.';
        });
});

document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('textToTranslate').value = '';
    document.getElementById('translationResult').innerText = '';
    document.getElementById('minionGif').src = '';
    document.getElementById('minionGif').style.display = 'none';
});