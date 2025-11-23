document.addEventListener('DOMContentLoaded', function () {
    const jsonInput = document.getElementById('json-input');
    const jsonRenderer = document.getElementById('json-renderer');
    const btnJsonViewer = document.getElementById('btn-json-viewer');

    btnJsonViewer.addEventListener('click', function () {
        try {
            const input = JSON.parse(jsonInput.value);
            jsonRenderer.innerHTML = '';
            jsonRenderer.appendChild(createJsonTree(input));
        } catch (error) {
            alert("Cannot parse JSON: " + error);
        }
    });

    function createJsonTree(data) {
        const ul = document.createElement('ul');
        ul.className = Array.isArray(data) ? 'json-array' : 'json-object';

        const openBracket = document.createElement('span');
        openBracket.textContent = Array.isArray(data) ? '[' : '{';
        ul.appendChild(openBracket);

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const li = document.createElement('li');
                const keySpan = document.createElement('span');
                keySpan.className = 'json-key';
                keySpan.textContent = `"${key}": `;

                const value = data[key];

                if (typeof value === 'object' && value !== null) {
                    const toggle = document.createElement('span');
                    toggle.className = 'json-toggle';
                    toggle.addEventListener('click', function() {
                        this.classList.toggle('collapsed');
                        const nestedList = this.nextElementSibling;
                        if (nestedList) {
                            nestedList.style.display = nestedList.style.display === 'none' ? 'block' : 'none';
                        }
                    });

                    li.appendChild(toggle);
                    li.appendChild(keySpan);
                    const nestedTree = createJsonTree(value);
                    nestedTree.style.display = 'block'; // Initially expanded
                    li.appendChild(nestedTree);

                } else {
                    li.appendChild(keySpan);
                    const valueSpan = document.createElement('span');
                    valueSpan.className = 'json-value json-' + (typeof value);
                    valueSpan.textContent = JSON.stringify(value);
                    li.appendChild(valueSpan);
                }

                ul.appendChild(li);
            }
        }

        const closeBracket = document.createElement('span');
        closeBracket.textContent = Array.isArray(data) ? ']' : '}';
        ul.appendChild(closeBracket);

        return ul;
    }

    btnJsonViewer.click();
});
