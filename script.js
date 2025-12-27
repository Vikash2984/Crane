const hamburger = document.querySelector(".hamburger")
const floatingNavbar = document.querySelector(".floating-navbar")
const navLinksItems = document.querySelectorAll(".nav-link")
const logo = document.querySelector(".logo")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  floatingNavbar.classList.toggle("active")
})

navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active")
    floatingNavbar.classList.remove("active")
  })
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navElement = document.querySelector("nav")
      const headerOffset = (navElement ? navElement.offsetHeight : 80) - 79.7
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

if (logo) {
  logo.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

const themeToggle = document.getElementById("theme-toggle")
const htmlElement = document.documentElement
const icon = themeToggle.querySelector("i")

const savedTheme = localStorage.getItem("theme") || "light"
htmlElement.setAttribute("data-theme", savedTheme)
if (savedTheme === "dark") {
  icon.className = "uil uil-sun"
} else {
  icon.className = "fas fa-moon"
}

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  htmlElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  if (newTheme === "dark") {
    icon.className = "uil uil-sun"
  } else {
    icon.className = "fas fa-moon"
  }

  themeToggle.style.transform = "rotate(720deg)"

  setTimeout(() => {
    themeToggle.style.transform = ""
  }, 300)

  hamburger.classList.remove("active")
  floatingNavbar.classList.remove("active")
})

const reveal = () => {
  const reveals = document.querySelectorAll(".reveal")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active")
    }
  })
}

window.addEventListener("scroll", reveal)
reveal()

const startCounters = () => {
  const counters = document.querySelectorAll(".counter")
  const speed = 200

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target")
      const count = +counter.innerText
      const increment = target / speed

      if (count < target) {
        counter.innerText = Math.ceil(count + increment)
        setTimeout(updateCount, 1)
      } else {
        counter.innerText = target
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount()
        observer.unobserve(counter)
      }
    })

    observer.observe(counter)
  })
}

const aboutSection = document.querySelector(".about")
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    startCounters()
    observer.unobserve(aboutSection)
  }
})

observer.observe(aboutSection)

const carousel = document.querySelector(".carousel")
const carouselItems = document.querySelectorAll(".carousel-item")
const prevButton = document.querySelector(".carousel-button.prev")
const nextButton = document.querySelector(".carousel-button.next")

let currentIndex = 0
const totalItems = carouselItems.length

function getItemsPerSlide() {
  return window.innerWidth >= 768 ? 3 : 1
}

function updateCarousel() {
  const itemsPerSlide = getItemsPerSlide()
  const slideWidth = 100 / itemsPerSlide

  carousel.innerHTML = ""
  const clonedItems = []
  for (let i = 0; i < itemsPerSlide * 2 + totalItems; i++) {
    clonedItems.push(carouselItems[i % totalItems].cloneNode(true))
  }
  clonedItems.forEach((item) => carousel.appendChild(item))

  carousel.style.transform = `translateX(-${(currentIndex + itemsPerSlide) * slideWidth}%)`
}

function showNextItem() {
  const itemsPerSlide = getItemsPerSlide()
  currentIndex++
  carousel.style.transition = "transform 0.5s ease"
  updateCarousel()

  if (currentIndex >= totalItems) {
    currentIndex = 0
    setTimeout(() => {
      carousel.style.transition = "none"
      updateCarousel()
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease"
      }, 50)
    }, 500)
  }
}

function showPrevItem() {
  const itemsPerSlide = getItemsPerSlide()
  currentIndex--
  carousel.style.transition = "transform 0.5s ease"

  if (currentIndex < 0) {
    updateCarousel()
    currentIndex = totalItems - 1
    setTimeout(() => {
      carousel.style.transition = "none"
      updateCarousel()
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease"
      }, 50)
    }, 500)
  } else {
    updateCarousel()
  }
}

nextButton.addEventListener("click", () => {
  stopAutoScroll()
  showNextItem()
  startAutoScroll()
})

prevButton.addEventListener("click", () => {
  stopAutoScroll()
  showPrevItem()
  startAutoScroll()
})

let autoScrollInterval

function startAutoScroll() {
  autoScrollInterval = setInterval(showNextItem, 2000)
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval)
}

startAutoScroll()

if (window.innerWidth >= 768) {
  carousel.addEventListener("mouseenter", stopAutoScroll)
  carousel.addEventListener("mouseleave", startAutoScroll)
} else {
  carousel.addEventListener("touchstart", stopAutoScroll)
}

let touchStartX = 0
let touchEndX = 0

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
  stopAutoScroll()
})

carousel.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
  startAutoScroll()
})

function handleSwipe() {
  if (touchEndX < touchStartX) {
    showNextItem()
  }
  if (touchEndX > touchStartX) {
    showPrevItem()
  }
}

window.addEventListener("resize", () => {
  stopAutoScroll()
  updateCarousel()
  startAutoScroll()
})

updateCarousel()

const animationManager = {
  init: function () {
    this.buildElements()
    this.startIntervalCounter()
  },
  getRandomInt: (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  buildElements: () => {
    const sparkElements = document.querySelectorAll(".spark")
    const weldElements = document.querySelectorAll(".weld-container")
    sparkElements.forEach((spark, index) => {
      const sibling = weldElements[index]
      const baseAnimationDelay = animationManager.getRandomInt(1, 15)
      const weld = document.createElement("div")
      weld.classList = "weld"
      weld.style.animationDelay = baseAnimationDelay + "s"
      sibling.appendChild(weld)

      const sparkCount = 25
      for (var i = 0; i <= sparkCount; i++) {
        const sparkDiv = animationManager.generateSpark(baseAnimationDelay)
        spark.appendChild(sparkDiv)
      }
    })
  },
  generateSpark: (delay) => {
    const sparkDiv = document.createElement("div")
    sparkDiv.classList = "particle"
    sparkDiv.style.top = animationManager.getRandomInt(25, 35) + "px"
    sparkDiv.style.left = animationManager.getRandomInt(0, 5) + "px"
    sparkDiv.style.width = animationManager.getRandomInt(1, 2) + "px"
    sparkDiv.style.height = animationManager.getRandomInt(4, 7) + "px"
    sparkDiv.classList.add(animationManager.getRandomInt(1, 3) === 2 ? "negative-X" : "positive-X")
    const combinedDelay = animationManager.getRandomInt(0, 9) / 10 + delay
    sparkDiv.style.animationDelay = combinedDelay + "s"
    return sparkDiv
  },
  startIntervalCounter: () => {
    setInterval(() => {
      const materialSVG = document.getElementById("material-group")
      if (materialSVG) {
        materialSVG.classList.toggle("hidden")
      }
    }, 45000)
  },
}

document.addEventListener("DOMContentLoaded", (evt) => {
  animationManager.init()
})

const phoneLink = document.getElementById("phone-link")
const emailLink = document.getElementById("email-link")

function updateContactLinks() {
  const isMobile = window.innerWidth < 768
  if (phoneLink) {
    phoneLink.href = isMobile
      ? "tel:+918101370066"
      : "https://wa.me/918101370066?text=Hey%20there!%0AI'm%20reaching%20out%20via%20the%20Surya%20Steel%20website%20and%20would%20like%20to%20enquire%20about%20your%20products%20and%20services."
    phoneLink.target = isMobile ? "_self" : "_blank"
  }
  if (emailLink) {
    emailLink.href = isMobile
      ? "mailto:suryasteelasn@gmail.com?subject=Client%20Enquiry%20Mail%20-%20Surya%20Steel"
      : "https://mail.google.com/mail/?view=cm&fs=1&to=suryasteelasn@gmail.com&su=Client%20Enquiry%20Mail%20-%20Surya%20Steel"
    emailLink.target = isMobile ? "_self" : "_blank"
  }
}

updateContactLinks()
window.addEventListener("resize", updateContactLinks)