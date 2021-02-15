const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

const text = document.querySelector('.fancy')
const strText = text.textContent;
const splitText = strText.split('');
text.textContent = '';

for(let i = 0; i < splitText.length; i++){
    text.innerHTML += '<span>' + splitText[i] + '</span>'
}

let char =0;
let timer = setInterval(onTick, 50);

function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++
    if(char === splitText.length){
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}


openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

$( function() {
    $( "#dialog1" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fade",
        duration: 1000
      }
    });
 
    $( ".yes" ).on( "click", function() {
      $( "#dialog1" ).dialog( "open" );
    });
  } );

  $( function() {
    $( "#dialog2" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fade",
        duration: 1000
      }
    });
 
    $( ".no" ).on( "click", function() {
      $( "#dialog2" ).dialog( "open" );
    });
  } );

// const openPopUpButtons = document.querySelectorAll('[data-pop-up-target]');
// const closePopUpButtons = document.querySelectorAll('[data-close-button]');
// const overlay = document.getElementById('overlay');

// openPopUpButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const popUp = document.querySelector(button.dataset.popUpTarget)
//         openPopUp(popUp);
//     });
// });

// overlay.addEventListener('click', () => {
//     const popUps = document.querySelectorAll('.pop-up.active')
//     popUps.forEach(popUp => {
//         closePopUp(popUp);
//     });

// });


// closePopUpButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const popUp = button.closest('.pop-up')
//         closePopUp(popUp);
//     });
// });

// function openPopUp(popUp) {
//     if (popUp == null) return
//     popUp.classList.add('active')
//     overlay.classList.add('active')
// }

// function closePopUp(popUp) {
//     if (popUp == null) return
//     popUp.classList.remove('active')
//     overlay.classList.remove('active')
// }