import addGlobalEventListener from "./util/addGlobalEventListener.js"

const tooltipContainer = document.createElement("div")
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

addGlobalEventListener("mouseover", "[data-tooltip]", (e) => {
  const tooltip = createToolTipElement(e.target.dataset.tooltip)
  tooltipContainer.append(tooltip)

  e.target.addEventListener(
    "mouseleave",
    () => {
      tooltip.remove()
    },
    { once: true }
  )
})

function createToolTipElement(text) {
  const tooltip = document.createElement("div")
  tooltip.classList.add("tooltip")
  tooltip.textContent = text
  return tooltip
}
