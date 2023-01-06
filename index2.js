import format from 'date-fns/format';

document.addEventListener('DOMContentLoaded', checkHistoryContent);

function checkHistoryContent() {
  if (localStorage.getItem('history') != '') {
    document.querySelector('.infoBox').classList.add('d-none');
    generatePasswordHistoryTable();
    document.getElementById('historyTable').classList.remove('d-none');
    document.getElementById('clearHistoryButton').classList.remove('d-none');
  } else {
    return;
  }

  function generatePasswordHistoryTable() {
    let historyArray = JSON.parse(localStorage.getItem('history'));
    for (let i of historyArray) {
      let tr = document.createElement('tr');
      let table = document.querySelector('.table');
      table.append(tr);

      let td = document.createElement('td');
      td.classList.add('tdPadding');
      td.innerHTML = `${i.password}`;
      tr.prepend(td);

      let td2 = document.createElement('td');
      if (!i.siteName) {
        td2.innerHTML = 'unknown';
      } else {
        td2.innerHTML = `${i.siteName}`;
      }
      td.after(td2);

      let td3 = document.createElement('td');
      td3.innerHTML = `${format(new Date(i.date), 'dd MMMM yyyy kk:mm:ss')}`;
      td2.after(td3);
    }
  }

  document
    .querySelector('.clearHistory')
    .addEventListener('click', deleteHistory);

  function deleteHistory() {
    localStorage.setItem('history', '');
    document.getElementById('table').innerHTML = '';
    document.querySelector('.infoBox').classList.remove('d-none');
    document.getElementById('clearHistoryButton').classList.add('d-none');
  }
}
