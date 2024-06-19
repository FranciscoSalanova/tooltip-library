import addGlobalEventListener from "./util/addGlobalEventListener.js"

const DEFAULT_SPACING = 5
const POSITION_ORDER = ["top", "bottom", "left", "right"]
const POSITION_TO_FUNCTION_MAP = {
  top: positionTooltipTop,
  bottom: positionTooltipBottom,
  left: positionTooltipLeft,
  right: positionTooltipRight,
}

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
  const spacing = parseInt(element.dataset.spacing) || DEFAULT_SPACING
  const preferredPositions = element.dataset.positions.split("|")
  const positions = preferredPositions.concat(POSITION_ORDER)

  for (let i = 0; i < positions.length; i++) {
    const func = POSITION_TO_FUNCTION_MAP[positions[i]]

    if (func && func(tooltip, elementRect, spacing)) return
  }
}

function positionTooltipTop(tooltip, elementRect, spacing) {
  const tooltipRect = tooltip.getBoundingClientRect()

  tooltip.style.top = `${elementRect.top - tooltipRect.height - spacing}px`
  tooltip.style.left = `${
    elementRect.left + elementRect.width / 2 - tooltipRect.width / 2
  }px`

  const bounds = isOutOfBounds(tooltip, spacing)

  if (bounds.top) {
    resetTooltipPosition(tooltip)
    return false
  }

  if (bounds.right) {
    tooltip.style.right = `${spacing}px`
    tooltip.style.left = "initial"
  }

  if (bounds.left) {
    tooltip.style.left = `${spacing}px`
  }

  return true
}

function positionTooltipBottom(tooltip, elementRect, spacing) {
  const tooltipRect = tooltip.getBoundingClientRect()

  tooltip.style.top = `${elementRect.bottom + spacing}px`
  tooltip.style.left = `${
    elementRect.left + elementRect.width / 2 - tooltipRect.width / 2
  }px`

  const bounds = isOutOfBounds(tooltip, spacing)

  if (bounds.bottom) {
    resetTooltipPosition(tooltip)
    return false
  }

  if (bounds.right) {
    tooltip.style.right = `${spacing}px`
    tooltip.style.left = "initial"
  }

  if (bounds.left) {
    tooltip.style.left = `${spacing}px`
  }

  return true
}

function positionTooltipLeft(tooltip, elementRect, spacing) {
  // const tooltipRect = tooltip.getBoundingClientRect()
  // tooltip.style.top = `${elementRect.top - tooltipRect.height - spacing}px`
  // tooltip.style.left = `${
  //   elementRect.left + elementRect.width / 2 - tooltipRect.width / 2
  // }px`
  // const bounds = isOutOfBounds(tooltip, spacing)
  // if (bounds.top) {
  //   resetTooltipPosition(tooltip)
  //   return false
  // }
  // if (bounds.right) {
  //   tooltip.style.right = `${spacing}px`
  //   tooltip.style.left = "initial"
  // }
  // if (bounds.left) {
  //   tooltip.style.left = `${spacing}px`
  // }
  // return true
}

function positionTooltipRight(tooltip, elementRect, spacing) {
  // const tooltipRect = tooltip.getBoundingClientRect()
  // tooltip.style.top = `${elementRect.bottom + spacing}px`
  // tooltip.style.left = `${
  //   elementRect.left + elementRect.width / 2 - tooltipRect.width / 2
  // }px`
  // const bounds = isOutOfBounds(tooltip, spacing)
  // if (bounds.bottom) {
  //   resetTooltipPosition(tooltip)
  //   return false
  // }
  // if (bounds.right) {
  //   tooltip.style.right = `${spacing}px`
  //   tooltip.style.left = "initial"
  // }
  // if (bounds.left) {
  //   tooltip.style.left = `${spacing}px`
  // }
  // return true
}

function isOutOfBounds(element, spacing) {
  const rect = element.getBoundingClientRect()
  const container = tooltipContainer.getBoundingClientRect()

  return {
    left: rect.left <= container.left + spacing,
    right: rect.right >= container.right - spacing,
    top: rect.top <= container.top + spacing,
    bottom: rect.bottom >= container.bottom - spacing,
  }
}

function resetTooltipPosition(element) {
  element.style.left = "initial"
  element.style.right = "initial"
  element.style.top = "initial"
  element.style.bottom = "initial"
}
