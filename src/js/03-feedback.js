import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const refs = {
  FEED_BACK_MESSAGE: 'feed back msg',
  EMAIL_VALUE: 'email',
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onInput(evt) {
  const target = evt.target;
  if (target === refs.email) {
    onEmailInput(evt);
  } else if (target === refs.textarea) {
    onTextAreaInput(evt);
  }
}

function onEmailInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const emailValue = evt.target.value;
  localStorage.setItem(refs.EMAIL_VALUE, emailValue);
}

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const value = evt.target.value;
  localStorage.setItem(refs.FEED_BACK_MESSAGE, value);
}

function output(evt) {
  const savedMsg = localStorage.getItem(refs.FEED_BACK_MESSAGE);
  const savedEmail = localStorage.getItem(refs.EMAIL_VALUE);
  if (savedMsg) {
    refs.textarea.value = savedMsg;
  }
  if (savedEmail) {
    refs.email.value = savedEmail;
  }
}
function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.email.value === '' || refs.textarea.value === '') {
    return Notiflix.Notify.failure('Заповніть усі поля форми');
  }
  evt.target.reset();
  console.log('Local Storage obj: ', localStorage);
  localStorage.removeItem(refs.FEED_BACK_MESSAGE);
  localStorage.removeItem(refs.EMAIL_VALUE);
  console.log(formData);
}

output();
