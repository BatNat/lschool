/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

window.addEventListener('DOMContentLoaded', () => {
  let cookiesList = getAllCookies();

  renderTable(cookiesList);
});

function getAllCookies() {
  if (!document.cookie) return;

  let cookiesList = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');

      prev[name] = value;

      return prev;
  }, {});

  return cookiesList;
}

let renderTable = (list) => {

  listTable.innerHTML = '';

  for (let item in list) {
      listTable.appendChild(createNewRow(item, list[item]));
  }

};

function createNewRow(name, value) {
  let newRow = document.createElement('tr');
  let nameTD = document.createElement('td');
  let valueTD = document.createElement('td');
  let deleteTD = document.createElement('td');
  let deleteBtn = document.createElement('button');

  nameTD.innerHTML = name;
  valueTD.innerHTML = value;
  deleteTD.appendChild(deleteBtn);
  deleteBtn.textContent = 'удалить';

  deleteBtn.addEventListener('click', () => {
      deleteCookie();
  });

  listTable.appendChild(newRow);
  newRow.appendChild(nameTD);
  newRow.appendChild(valueTD);
  newRow.appendChild(deleteTD);

  return newRow;
}

function setCookie(name, value, expires) {

  let cookie = `${name}=${value}; expires=${expires || new Date().getDate + 1}`;

  document.cookie = cookie;
}

function deleteCookie() {
  if (event.target.tagName === 'BUTTON') {
      let removeElement = event.target.parentNode.parentNode,
          cookieName = removeElement.firstElementChild.innerText,
          date = new Date(0);

      document.cookie = `${cookieName}=; expires=${date.toUTCString()}`;
      listTable.removeChild(removeElement);
  }
}

function filterTable() {
  let filter = filterNameInput.value;
  let cookies = getAllCookies();

  for (let name in cookies) {
      if (!name.includes(filter) && !cookies[name].includes(filter)) {
          delete cookies[name];
      }
  }

  renderTable(cookies);
}

filterNameInput.addEventListener('keyup', filterTable);

addButton.addEventListener('click', () => {
  setCookie(addNameInput.value, addValueInput.value);
  filterTable();
});

