'use strict'

const form = document.forms.reviewform
const usernameInput = form.querySelector('.form__input-name')
const usernameInputSave = form.querySelector('.form__input-name input')
const raitingInput = form.querySelector('.form__input-raiting')
const raitingInputSave = form.querySelector('.form__input-raiting input')

form.addEventListener('submit', handleFormSubmit)
form.addEventListener('input', handleFormInput)

usernameInputSave.value = localStorage.getItem('usernameInput')
raitingInputSave.value = localStorage.getItem('raitingInput')

function handleFormInput(event) {
  usernameInputSave.addEventListener('input', (e) => localStorage.setItem('usernameInput', e.target.value))
  raitingInputSave.addEventListener('input', (e) => localStorage.setItem('raitingInput', e.target.value))
}

function handleFormValidateName(element) {

  if (!element[1].length || !element[1].trim().length || (/^[0-9]/.test(element[1]))) {
    usernameInput.classList.add('input-name_error-one')
    usernameInput.addEventListener('keydown', (event) => {
      usernameInput.classList.remove('input-name_error-one')
    })
    console.error('Поле с именем пустое')
    return true
  }

  if (element[1].length < 3) {
    usernameInput.classList.add('input-name_error-two')
    usernameInput.addEventListener('keydown', (event) => {
      usernameInput.classList.remove('input-name_error-two')
    })
    console.error('Поле короткое')
    return true
  }
}

function handleFormValidateRaiting(element) {
  if (
    !/^[1-5]/.test(element[1]) ||
    element[1].length != 1
  ) {

    raitingInput.classList.add('input-raiting')
    raitingInput.addEventListener('keydown', (event) => {
      raitingInput.classList.remove('input-raiting')
    })
    console.error('Рейтинг указан неверно')
    return true
  }
}

function serializeForm(formNode) {
  const data = new FormData(formNode)
  handleFormValidate(data)
  return (data)
}

function handleFormValidate(data) {
  const items = Array.from(data.entries())
  if (handleFormValidateName(items[0])) return
  if (handleFormValidateRaiting(items[1])) return
  localStorage.clear('usernameInput')
  localStorage.clear('raitingInput')
  usernameInputSave.value = localStorage.getItem('usernameInput')
  raitingInputSave.value = localStorage.getItem('raitingInput')
  alert('Ваш отзыв отправлен успешно')
}

function handleFormSubmit(event) {
  event.preventDefault()
  serializeForm(form)
}

function serializeForm(formNode) {
  const data = new FormData(formNode)
  handleFormValidate(data)
  return (data)
}

function handleFormSubmit(event) {
  event.preventDefault()
  serializeForm(form)
}
