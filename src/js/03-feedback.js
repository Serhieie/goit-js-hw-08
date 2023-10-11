import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const FEED_BACK_MESSAGE = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

const { form, textarea, email } = refs;

const formDataObject = {
  email: email.value,
  feedback: textarea.value,
};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

const savedFormData = JSON.parse(localStorage.getItem(FEED_BACK_MESSAGE));
if (savedFormData) {
  email.value = savedFormData.email;
  textarea.value = savedFormData.feedback;
  formDataObject.email = savedFormData.email;
  formDataObject.feedback = savedFormData.feedback;
}

function onInput(evt) {
  if (evt.target === email) {
    formDataObject.email = evt.target.value;
  } else if (evt.target === textarea) {
    formDataObject.feedback = evt.target.value;
  }
  localStorage.setItem(FEED_BACK_MESSAGE, JSON.stringify(formDataObject));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (email.value === '' || textarea.value === '') {
    return Notiflix.Notify.failure('Заповніть усі поля форми');
  }
  console.log(formDataObject);
  localStorage.removeItem(FEED_BACK_MESSAGE);
  evt.target.reset();
  formDataObject.email = '';
  formDataObject.feedback = '';
}
