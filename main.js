//Функція для додавання пари до списку
let addPairButton = document.getElementById('add-pair');
let inputPair = document.getElementById('input-pair');

function addPair() {
    let trimValueOfInput = inputPair.value.trim();
    let regex = trimValueOfInput.match(/^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/);
    if (regex) {
        let formattedPair = `${regex[1]}=${regex[2]}`;
        // console.log(formattedPair); // Для перевірки результату
        let listItem = document.createElement('li');
        listItem.innerText = formattedPair;

        // Подія для вибору елемента списку якщо є клас selected то видаляє якщо нема то добавляє
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('selected');
        });

        let pairsList = document.getElementById('pairs-list');
        pairsList.appendChild(listItem);

    } else {
        alert('Неправильний формат. Введіть пару у форматі name=value.');
    }
    inputPair.value = '';
}

addPairButton.onclick = addPair;

// Обробник для натискання Enter у полі введення
inputPair.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addPair();
    }
});

//Функція для сортування
function sortList(index) {
    let pairsList = document.getElementById('pairs-list');
    let items = Array.from(pairsList.getElementsByTagName('li'));

    items.sort((name, value) => {
        let nameItem = name.innerText.split('=')[index];
        let valueItem = value.innerText.split('=')[index];
        return nameItem.localeCompare(valueItem);
    });
    pairsList.innerHTML = '';
    items.forEach(item => pairsList.appendChild(item));
}

//Для кожної кнопки прив'язується обробник події onclick
let sortNameButton = document.getElementById('sort-name');
sortNameButton.onclick = function sortByName() {
    sortList(0); // Викликає sortList з індексом 0 (ім'я)
};
let sortValueButton = document.getElementById('sort-value');
sortValueButton.onclick = function sortByValue() {
    sortList(1); // Викликає sortList з індексом 1 (значення)
};

//Функція видалення вибраних лішок
let deleteSelectedButton = document.getElementById('delete-selected');
deleteSelectedButton.onclick = function deleteSelected() {
    let selectedItems = document.querySelectorAll('#pairs-list .selected');
    selectedItems.forEach(item => {
        item.remove();
    });
};
