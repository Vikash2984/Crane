const animationManager = {
  init: function () {
    this.buildElements()
    this.startIntervalCounter()
    this.setupModeToggle()
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
      materialSVG.classList.toggle("hidden")
    }, 45000)
  },
  setupModeToggle: () => {
    const toggleButton = document.getElementById("mode-toggle")
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode")
        document.body.classList.toggle("dark-mode")
      })
    }
  },
}
document.addEventListener("DOMContentLoaded", (evt) => {
  animationManager.init()
})
