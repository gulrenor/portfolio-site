function openModal($el) {
  $el.classList.add('is-active')
}

function closeModal($el) {
  $el.classList.remove('is-active')
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal)
  })
}


document.querySelectorAll('.js-modal-trigger' || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target
  const $target = document.getElementById(modal)

  $trigger.addEventListener('click', () => {
    openModal($target)
  })
})

// Add a click event on various child elements to close the parent modal
document.querySelectorAll('.modal-close' || []).forEach(($close) => {
  const $target = $close.closest('.modal')

  $close.addEventListener('click', () => {
    closeModal($target)
  })
})
