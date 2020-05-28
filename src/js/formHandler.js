// Form Handler
let form = document.getElementById('contact-form')
let formStatus = document.createElement('div')
formStatus.setAttribute('class', 'form-status alert')
form.appendChild(formStatus);

form.onsubmit = (e) => {
  e.preventDefault()

  // Gather form data into a FormData object
  let formdata = new FormData(form)

  let xhr = new XMLHttpRequest()
  xhr.open(form.method, form.action, true)
  xhr.send(formdata)

  // Callback
  xhr.onloadend = (response) => {
    if (response.target.status === 200) {
      formStatus.className += ' success'
      formStatus.innerHTML = response.target.responseText
    } else {
      formStatus.className += ' error'
      formStatus.innerHTML = "Something went wrong when submitting your form. Please try again."
    }
  }
}