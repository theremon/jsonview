
function renderJsonTree(data, container) {
  container.innerHTML = ''; // Clear previous content

  const tree = createTree(data);
  container.appendChild(tree);
}

function createTree(data) {
  const ul = document.createElement('ul');
  ul.className = 'json-tree';

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const li = document.createElement('li');
      const keySpan = document.createElement('span');
      keySpan.className = 'key';
      keySpan.textContent = key + ': ';
      li.appendChild(keySpan);

      const value = data[key];
      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
            li.appendChild(createArrayTree(value));
        } else {
            li.appendChild(createTree(value));
        }
      } else {
        const valueSpan = document.createElement('span');
        valueSpan.className = 'value ' + (typeof value);
        valueSpan.textContent = value;
        li.appendChild(valueSpan);
      }
      ul.appendChild(li);
    }
  }
  return ul;
}

function createArrayTree(data) {
    const ol = document.createElement('ol');
    ol.className = 'json-array';
    data.forEach(item => {
        const li = document.createElement('li');
        if (typeof item === 'object' && item !== null) {
            li.appendChild(createTree(item));
        } else {
            const valueSpan = document.createElement('span');
            valueSpan.className = 'value ' + (typeof item);
            valueSpan.textContent = item;
            li.appendChild(valueSpan);
        }
        ol.appendChild(li);
    });
    return ol;
}


document.addEventListener('DOMContentLoaded', function () {
    const jsonInput = document.getElementById('json-input');
    const jsonRenderer = document.getElementById('json-renderer');
    const btnJsonViewer = document.getElementById('btn-json-viewer');

    btnJsonViewer.addEventListener('click', function () {
        try {
            const input = JSON.parse(jsonInput.value);
            jsonRenderer.style.display = 'block';
            renderJsonTree(input, jsonRenderer);
        } catch (error) {
            alert("Cannot parse JSON: " + error);
        }
    });

    btnJsonViewer.click();
});
