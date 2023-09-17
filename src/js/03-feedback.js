import throttle from 'lodash.throttle';

const FEED_BACK_MESSAGE = 'feed back msg';
const EMAIL_VALUE = 'email';
const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const email = document.querySelector('.feedback-form input');

const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 1000));

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
  sessionStorage.setItem(EMAIL_VALUE, emailValue);
}

function emailOutput(evt) {
  const savedEmail = sessionStorage.getItem(EMAIL_VALUE);
  if (savedEmail) {
    email.value = savedEmail;
  }
}

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const value = evt.target.value;
  localStorage.setItem(FEED_BACK_MESSAGE, value);
}

function textareaOutput(evt) {
  const savedMsg = localStorage.getItem(FEED_BACK_MESSAGE);
  if (savedMsg) {
    textarea.value = savedMsg;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  console.log('Session Storage obj: ', sessionStorage);
  console.log('Local Storage obj: ', localStorage);
  localStorage.removeItem(FEED_BACK_MESSAGE);
  sessionStorage.removeItem(EMAIL_VALUE);
  console.log(formData);
}

textareaOutput();
emailOutput();
