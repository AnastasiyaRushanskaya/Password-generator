document
  .querySelector('#form')
  .addEventListener('submit', submitPasswordGenerator);

function submitPasswordGenerator(event) {
  event.preventDefault();

  let formData = new FormData(event.target);

  let numbers = formData.get('numbers');
  let symbols = formData.get('symbols');
  let uppercaseLetters = formData.get('uppercaseletters');
  let lowercaseLetters = formData.get('lowercaseletters');
  let passwordLength = formData.get('passwordLength');

  if (!numbers && !symbols && !uppercaseLetters && !lowercaseLetters) {
    showError();
    return;
  }

  let generatedArr = generatePasswordArr(
    numbers,
    symbols,
    uppercaseLetters,
    lowercaseLetters
  );

  let password = generatePassword(passwordLength, generatedArr);

  showPassword(password);
}

function showError() {
  document.querySelector('.yourpassword').innerHTML =
    'choose at least one option';
  document.querySelector('.yourpassword').classList.add('error');
}

function generatePasswordArr(
  numbers,
  symbols,
  uppercaseLetters,
  lowercaseLetters
) {
  let arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arrLowercase = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let arrUppercase = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let arrSymbols = ['!', '#', '@', '$', '%', '-', '+', '?', '='];

  let passwordArr = [];

  if (numbers) {
    passwordArr = passwordArr.concat(arrNumbers);
  }
  if (symbols) {
    passwordArr = passwordArr.concat(arrSymbols);
  }
  if (uppercaseLetters) {
    passwordArr = passwordArr.concat(arrUppercase);
  }
  if (lowercaseLetters) {
    passwordArr = passwordArr.concat(arrLowercase);
  }

  let compareRandom = () => Math.random() - 0.5;

  passwordArr.sort(compareRandom);

  return passwordArr;
}

function showError() {
  document.querySelector('.yourpassword').innerHTML =
    'choose at least one option';
  document.querySelector('.yourpassword').classList.add('error');
}

function generatePasswordArr(
  numbers,
  symbols,
  uppercaseLetters,
  lowercaseLetters
) {
  let arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arrLowercase = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let arrUppercase = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let arrSymbols = ['!', '#', '@', '$', '%', '-', '+', '?', '='];

  let passwordArr = [];

  if (numbers) {
    passwordArr = passwordArr.concat(arrNumbers);
  }
  if (symbols) {
    passwordArr = passwordArr.concat(arrSymbols);
  }
  if (uppercaseLetters) {
    passwordArr = passwordArr.concat(arrUppercase);
  }
  if (lowercaseLetters) {
    passwordArr = passwordArr.concat(arrLowercase);
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

function showPassword(password) {
  document.querySelector('.yourpassword').classList.remove('error');
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
  let svg2 = document.querySelector('.bi-clipboard-check');
  let svg1 = document.querySelector('.bi-clipboard');
  svg1.classList.toggle('d-none');
  svg2.classList.toggle('d-none');
}

function hightlightSelection() {
  let inputs = document.querySelectorAll('.form-check-input');

  for (let input of inputs) {
    input.onclick = function () {
      input.parentNode.classList.toggle('selecteditem');
    };
  }
}

hightlightSelection();
