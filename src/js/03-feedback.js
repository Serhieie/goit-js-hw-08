import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const FEED_BACK_MESSAGE = 'feed back';
const EMAIL_VALUE = 'email';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

const { form, textarea, email } = refs;

let formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

function output(evt) {
  const savedMsg = localStorage.getItem(FEED_BACK_MESSAGE);
  const savedEmail = localStorage.getItem(EMAIL_VALUE);
  if (savedEmail) {
    email.value = savedEmail;
    formData[EMAIL_VALUE] = savedEmail;
  }
  if (savedMsg) {
    textarea.value = savedMsg;
    formData[FEED_BACK_MESSAGE] = savedMsg;
  }
}

output();

function onInput(evt) {
  const target = evt.target;
  if (target === email) {
    onEmailInput(evt);
  } else if (target === textarea) {
    onTextAreaInput(evt);
  }
}

function onEmailInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const emailValue = evt.target.value;
  localStorage.setItem(EMAIL_VALUE, emailValue);
}

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const value = evt.target.value;
  localStorage.setItem(FEED_BACK_MESSAGE, value);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (email.value === '' || textarea.value === '') {
    return Notiflix.Notify.failure('Заповніть усі поля форми');
  }
  console.log(formData);
  localStorage.removeItem(FEED_BACK_MESSAGE);
  localStorage.removeItem(EMAIL_VALUE);
  evt.target.reset();
  formData = {};
}
