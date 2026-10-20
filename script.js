const form = document.getElementById('signupForm');
const statusEl = document.getElementById('formStatus');

const fieldMap = {
  firstName: document.getElementById('firstName'),
  age: document.getElementById('age'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  phone: document.getElementById('phone'),
  city: document.getElementById('city')
};

const setStatus = (message, type) => {
  statusEl.textContent = message;
  statusEl.className = `form-status ${type}`;
};

const markInvalid = (fieldName, isInvalid) => {
  const field = fieldMap[fieldName];
  if (!field) return;
  field.classList.toggle('invalid', isInvalid);
};

const validateField = (fieldName) => {
  const value = fieldMap[fieldName].value.trim();
  let isValid = true;

  switch (fieldName) {
    case 'firstName':
      isValid = value.length >= 2;
      break;
    case 'age':
      isValid = Number(value) > 0 && Number.isFinite(Number(value));
      break;
    case 'email':
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case 'password':
      isValid = value.length >= 8;
      break;
    case 'phone':
      isValid = /^(\+?\d[\d\s().-]{7,})$/.test(value);
      break;
    case 'city':
      isValid = value.length >= 2;
      break;
    default:
      isValid = Boolean(value);
  }

  markInvalid(fieldName, !isValid);
  return isValid;
};

Object.entries(fieldMap).forEach(([fieldName, field]) => {
  field.addEventListener('input', () => {
    validateField(fieldName);
    if (statusEl.textContent) {
      setStatus('', '');
    }
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const allFieldsValid = Object.keys(fieldMap).every((fieldName) => validateField(fieldName));

  if (!allFieldsValid) {
    setStatus('Please fill out every field correctly before continuing.', 'error');
    return;
  }

  const payload = Object.fromEntries(
    Object.entries(fieldMap).map(([key, field]) => [key, field.value.trim()])
  );

  console.log('Signed up successfully:', payload);
  setStatus('Account created successfully! Welcome aboard.', 'success');
  form.reset();
  Object.keys(fieldMap).forEach((fieldName) => markInvalid(fieldName, false));
});
