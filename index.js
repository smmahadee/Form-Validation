const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submit = document.querySelector('.form button');

// Show error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList = 'form-control error';
  const small = formControl.querySelector(`.small`);
  small.innerText = `${getRequiredField(input)} ${message}`;
};

// Show success message
const showSuccess = (input) => {
  input.parentElement.classList = 'form-control success';
};

// Chech email
const checkEmail = (emailInput) => {
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  if (emailInput.value.trim() == '') {
    showError(emailInput, 'is required');
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, 'is not valid');
  } else {
    showSuccess(emailInput);
  }
};

// Get Required field
const getRequiredField = (input) =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

// Check Required function
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() == '') {
      showError(input, 'is required');
    } else {
      showSuccess(input);
    }
  });
};

// Check length
const checkLength = (input, min, max) => {
  if (input.value.trim() == '') {
    checkRequired([input]);
  } else if (input.value.length < min) {
    showError(input, `must be at least ${min} character`);
  } else if (input.value.length > max) {
    showError(input, `must be under ${max} character`);
  } else {
    showSuccess(input);
  }
};

// Password match checking function
const isPasswordMatch = (pass1, pass2) => {
  if (!pass1.value.trim() || !pass2.value.trim()) {
    checkRequired([pass1, pass2]);
  } else if (pass1.value === pass2.value) {
    showSuccess(pass2);
  } else {
    showError(pass2, "didn't match");
  }
};

// Add event listener

submit.addEventListener('click', function (e) {
  e.preventDefault();

  checkRequired([email, password2]);
  checkLength(username, 3, 8);
  checkLength(password, 8, 25);

  checkEmail(email);
  isPasswordMatch(password, password2);
});
