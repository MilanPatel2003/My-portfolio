
/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
navToggle = document.getElementById('nav_toggle'),
navClose = document.getElementById('nav_close')
/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if (navToggle) {
  navToggle.addEventListener("click", ()=>{
    navMenu.classList.add('show-sidebar')
  })
}
/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if (navClose) {
  navClose.addEventListener("click", ()=>{
    navMenu.classList.remove('show-sidebar')
  })
}

/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabcontent = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabcontent.forEach((tabcontents) => {
      tabcontents.classList.remove("skills_active");
    });

    target.classList.add("skills_active");

    tabs.forEach((tab) => {
      tab.classList.remove("skills_active");
    });

    tab.classList.add("skills_active");
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup(".work_container", {
  selectors: {
    target: ".work_card",
  },
  animation: {
    duration: 300,
  },
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll(".work_item");

function activeWork() {
  linkWork.forEach((element) => element.classList.remove("active-work"));
  this.classList.add("active-work");
}

linkWork.forEach((element) => element.addEventListener("click", activeWork));

/*===== Work Popup =====*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("work_button")) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector(".portfolio_popup").classList.toggle("open");
}

document
  .querySelector(".portfolio_popup-close")
  .addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
  document.querySelector(".pp_thumbnail  img").src =
    portfolioItem.querySelector(".work_img").src;
  document.querySelector(".portfolio_popup-subtitle span").innerHTML =
    portfolioItem.querySelector(".work_title").innerHTML;

    document.querySelector(".portfolio_popup-body").innerHTML =
    portfolioItem.querySelector(".portfolio_item-details").innerHTML;
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services_modal'),
modalBtns = document.querySelectorAll(".services_button"),
modalCloses = document.querySelectorAll('.services_modal-close')

let modal = function (modalClick) {
  modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modelBtn, i) =>{
  modelBtn.addEventListener('click', () =>{
    modal(i)
  })
})

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) =>{
      modalView.classList.remove('active-modal')
    })
  })
})

/*=============== SWIPER TESTIMONIAL ===============*/

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}
inputs.forEach((input) =>{
  input.addEventListener("focus",focusFunc)
  input.addEventListener("blur",blurFunc)


})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav_menu a[href="#${sectionId}"]`).classList.add("active-link");
    } else {
      document.querySelector(`.nav_menu a[href="#${sectionId}"]`).classList.remove("active-link");
    }
  });
}

/*=============== SHOW SCROLL UP ===============*/



particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#00f7ff" // Glowing blue color
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.8,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.4, // Increase speed for opacity animation
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 4, // Increase speed for size animation
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#00f7ff", // Glowing blue color
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2, // Increase speed for particle movement
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 2,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
