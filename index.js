document
  .querySelector('#form')
  .addEventListener('submit', submitPasswordGenerator);

function submitPasswordGenerator(event) {
  event.preventDefault();

  let formData = new FormData(event.target);

  let numbers = formData.get('numbers');
  let symbols = formData.get('symbols');
  let uppercaseLetters = formData.get('uppercaseLetters');
  let lowercaseLetters = formData.get('lowercaseLetters');
  let passwordLength = formData.get('passwordLength');

  if (!numbers && !symbols && !uppercaseLetters && !lowercaseLetters) {
    showError();
    return;
  }

  let generatedArr = generatePasswordArr(formData);
  let password;
  do {
    password = generatePassword(passwordLength, generatedArr);
  } while (checkPassword(formData, password));

  showPassword(password);
  clearCopyButton();
  showSavePasswordBox();
  clearYesNoSelection();
  hideSiteNameBox();
}

function showError() {
  document.querySelector('.yourpassword').innerHTML =
    'choose at least one option';
  document.querySelector('.yourpassword').classList.add('error');
  document.querySelector('.yourpassword').classList.remove('borderBottomCol1');
  clearCopyButton();
}

function generatePasswordArr(formData) {
  let passwordArr = [];

  let objValues = {
    numbers() {
      for (let i = 48; i < 58; i++) {
        passwordArr.push(String.fromCodePoint(i));
      }
    },
    symbols() {
      for (let i = 33; i < 48; i++) {
        passwordArr.push(String.fromCodePoint(i));
      }
    },
    uppercaseLetters() {
      for (let i = 65; i < 91; i++) {
        passwordArr.push(String.fromCodePoint(i));
      }
    },
    lowercaseLetters() {
      for (let i = 97; i < 123; i++) {
        passwordArr.push(String.fromCodePoint(i));
      }
    },
  };

  for (let [key, value] of formData.entries()) {
    if (value && key !== 'passwordLength') {
      objValues[key]();
    }
  }

  let compareRandom = () => Math.random() - 0.5;

  passwordArr.sort(compareRandom);
  return passwordArr;
}

function generatePassword(passwordLength, generatedArr) {
  let randomInteger = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += generatedArr[randomInteger(0, generatedArr.length - 1)];
  }
  return password;
}

function checkPassword(formData, password) {
  let values = {
    numbers() {
      return /\d/.test(password);
    },
    uppercaseLetters() {
      return /[A-Z]/.test(password);
    },
    lowercaseLetters() {
      return /[a-z]/.test(password);
    },
    symbols() {
      return /[!"#$%&'()*+,-./]/.test(password);
    },
  };
  let checkValues = [];
  for (let [key, value] of formData.entries()) {
    if (value && key !== 'passwordLength') {
      checkValues.push(values[key]());
    }
  }

  return checkValues.includes(false);
}

function showPassword(password) {
  document.querySelector('.yourpassword').classList.remove('error');
  document.querySelector('.yourpassword').classList.add('borderBottomCol1');
  document.querySelector('.yourpassword').innerHTML = password;
}

document
  .getElementById('buttoncopy')
  .addEventListener('click', copyToClipboard);

function copyToClipboard() {
  let copiedText = document.getElementById('password').innerText;
  let elem = document.createElement('textarea');
  elem.value = copiedText;
  elem.setAttribute('readonly', '');
  elem.style.position = 'absolute';
  elem.style.left = '-9999px';
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);

  changeImg();
}

function changeImg() {
  let svgActive = document.querySelector('.bi-clipboard-check');
  let svgPassive = document.querySelector('.bi-clipboard');
  svgPassive.classList.add('d-none');
  svgActive.classList.remove('d-none');
}

function clearCopyButton() {
  let svgActive = document.querySelector('.bi-clipboard-check');
  let svgPassive = document.querySelector('.bi-clipboard');
  svgActive.classList.add('d-none');
  svgPassive.classList.remove('d-none');
}

function highlightSelection() {
  let inputs = document.querySelectorAll('.form-check-input');

  for (let input of inputs) {
    input.onclick = function () {
      input.parentNode.classList.toggle('selecteditem');
    };
  }
}

highlightSelection();

function showSavePasswordBox() {
  let savePasswordBox = document.querySelectorAll('.savePasswordBox');
  for (let elem of savePasswordBox) {
    elem.classList.remove('d-none');
  }
  document.querySelector('.saveBox').classList.add('boarderTop');
}

document.getElementById('yes').addEventListener('input', showSiteNameBox);

function showSiteNameBox() {
  let showSiteNameBox = document.querySelectorAll('.siteNameBox');
  for (let elem of showSiteNameBox) {
    elem.classList.remove('d-none');
  }
  showSavedPasswordsButton();
}

document.getElementById('no').addEventListener('input', hideSiteNameBox);

function hideSiteNameBox() {
  let showSiteNameBox = document.querySelectorAll('.siteNameBox');
  for (let elem of showSiteNameBox) {
    elem.classList.add('d-none');
  }
  showSavedPasswordsButton();
}

function showSavedPasswordsButton() {
  document.getElementById('viewSavedPassowrds').classList.remove('d-none');
}

function clearYesNoSelection() {
  document.getElementById('no').checked = false;
  document.getElementById('yes').checked = false;
}

document.querySelector('.savePassword').addEventListener('click', savePassword);

function savePassword() {
  changeSavePasswordButton();
  let passwordData = {
    password: `${document.getElementById('password').innerHTML}`,
    siteName: `${document.getElementById('siteName').value}`,
    date: new Date(),
  };

  let historyArray = localStorage.getItem('history')
    ? JSON.parse(localStorage.getItem('history'))
    : [];
  localStorage.clear();
  historyArray.push(passwordData);
  let jsonArray = JSON.stringify(historyArray);
  localStorage.setItem('history', jsonArray);
}

function changeSavePasswordButton() {
  let button1 = document.querySelector('.hide');
  button1.classList.add('d-none');
  let button2 = document.querySelector('.display');
  button2.classList.remove('d-none');
}
