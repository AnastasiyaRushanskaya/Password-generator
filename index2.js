let historyArray = JSON.parse(localStorage.getItem('history'));
// console.log(historyArray);
// JSON.parse(historyArray);

for (let i of historyArray) {
  let historyInfo = document.createElement('div');
  historyInfo.classList.add('py-2');
  historyInfo.innerHTML = `${i.password} : ${i.siteName} : ${new Date(i.date)}`;
  let div = document.getElementById('passwordHistory');
  //   console.log(div.innerHTML);
  div.prepend(historyInfo);
  console.log(i.password + ' : ' + i.siteName + ' : ' + new Date(i.date));
}

for (let i of historyArray) {
  let tr = document.querySelector('.tr');
  let td = document.createElement('td');
  td.innerHTML = `${i.password}`;
  tr.prepend(td);

  let td2 = document.createElement('td');
  td2.innerHTML = `${i.siteName}`;
  td.after(td2);

  let td3 = document.createElement('td');
  td3.innerHTML = `${new Date(i.date)}`;
  td2.after(td3);
}
