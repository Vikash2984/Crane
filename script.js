const animationManager = {
  init: function () {
    this.buildElements()
    this.startIntervalCounter()
  },
  getRandomInt: (min, max, string = true) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    if (string) {
      return String(Math.floor(Math.random() * (max - min)) + min)
    }
    return Math.floor(Math.random() * (max - min)) + min
  },

  buildElements: () => {
    const sparkElements = document.querySelectorAll(".spark")
    const weldElements = document.querySelectorAll(".weld-container")

    sparkElements.forEach((spark, index) => {
      // create weld item first
      const sibling = weldElements[index]
      const baseAnimationDelay = animationManager.getRandomInt(1, 15)
      const weld = document.createElement("div")
      weld.classList = "weld"
      weld.style.animationDelay = String(baseAnimationDelay) + "s"
      sibling.appendChild(weld)

      // sparks start here
      const sparkCount = 25
      for (var i = 0; i <= sparkCount; i++) {
        const sparkDiv = animationManager.generateSpark(baseAnimationDelay)
        spark.appendChild(sparkDiv)
      }
    })
  },
  generateSpark: (delay) => {
    const sparkDiv = document.createElement("div")
    // set standard properties
    sparkDiv.classList = "particle"
    sparkDiv.style.top = animationManager.getRandomInt(25, 35) + "px"
    sparkDiv.style.left = animationManager.getRandomInt(0, 5) + "px"
    sparkDiv.style.width = animationManager.getRandomInt(1, 2) + "px"
    sparkDiv.style.height = animationManager.getRandomInt(4, 7) + "px"
    // make some uniqness
    if (animationManager.getRandomInt(1, 3) == 2) {
      sparkDiv.classList = sparkDiv.classList + " negative-X"
    } else {
      sparkDiv.classList = sparkDiv.classList + " positive-X"
    }
    //create a base delay
    const combinedDelay = animationManager.getRandomInt(0, 9) / 10 + Number.parseFloat(delay)
    sparkDiv.style.animationDelay = String(combinedDelay) + "s"
    return sparkDiv
  },
  startIntervalCounter: () => {
    setInterval(() => {
      const materialSVG = document.getElementById("material-group")
      materialSVG.classList.toggle("hidden")
    }, 45000)
  },
}
document.addEventListener("DOMContentLoaded", (evt) => {
  animationManager.init()
})
