import addGlobalEventListener from "./util/addGlobalEventListener.js"

const tooltipContainer = document.createElement("div")
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

addGlobalEventListener("mouseover", "[data-tooltip]", (e) => {
  const tooltip = createToolTipElement(e.target.dataset.tooltip)
  tooltipContainer.append(tooltip)
  positionTooltip(tooltip, e.target)

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

function positionTooltip(tooltip, element) {
  const elementRect = element.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()

  tooltip.style.top = `${elementRect.top - tooltipRect.height}px`
  tooltip.style.left = `${
    elementRect.left + elementRect.width / 2 - tooltipRect.width / 2
  }px`

  const bounds = isOutOfBounds(tooltip)
}

function isOutOfBounds(element) {
  const rect = element.getBoundingClientRect()
  const container = tooltipContainer.getBoundingClientRect()

  return {
    left: rect.left < container.left,
    right: rect.right > container.right,
    top: rect.top < container.top,
    bottom: rect.bottom > container.bottom,
  }
}
