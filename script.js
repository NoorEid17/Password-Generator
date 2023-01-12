var characterLengthSlider = document.getElementById("myRange");
var characterLengthDisplay = document.getElementById("character-length");
var generateButton = document.getElementById("generate-btn");
var passwordResult = document.getElementById("password-result");
var clipboardButton = document.getElementById("clipboard");

characterLengthDisplay.innerHTML = characterLengthSlider.value; // Display the default slider value

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

// Update the current slider value (each time you drag the slider handle)
characterLengthSlider.oninput = function () {
  characterLengthDisplay.innerHTML = this.value;
};

const defaultOptions = {
  length: 8,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
};

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

const generatePassword = ({
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
} = defaultOptions) => {
  const charsets = [
    includeLowercase && lowercaseLetters,
    includeUppercase && uppercaseLetters,
    includeNumbers && numbers,
    includeSymbols && symbols,
  ].filter(Boolean);

  var password = "";

  while (password.length < length) {
    for (const set of charsets) {
      password += set.charAt(Math.floor(length * Math.random()));
    }
  }

  password = password.shuffle();
  return password.substring(0, length);
};

generateButton.onclick = () => {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var checkedOne = Array.prototype.slice
    .call(checkboxes)
    .some((x) => x.checked);

  if (!checkedOne) {
    return;
  }

  const options = {
    includeLowercase: document.getElementById("include-lower").checked,
    includeUppercase: document.getElementById("include-upper").checked,
    includeNumbers: document.getElementById("include-numbers").checked,
    includeSymbols: document.getElementById("include-symbols").checked,
    length: characterLengthSlider.value,
  };
  const password = generatePassword(options);
  console.log(options);
  passwordResult.textContent = password;
};

clipboardButton.onclick = () =>
  navigator.clipboard.writeText(passwordResult.textContent);
