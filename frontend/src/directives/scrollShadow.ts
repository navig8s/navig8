import { Directive } from 'vue'
import { isNil } from 'ramda'

const stateKey = Symbol('SCROLL_SHADOW_STATE')

type HTMLElementWithAState = HTMLElement & {
  [stateKey: symbol]: { unAttach: () => void } | undefined
}

type Boundaries = Partial<{
  left: HTMLSpanElement
  right: HTMLSpanElement
  top: HTMLSpanElement
  bottom: HTMLSpanElement
}>

const handleViewChange = (
  element: HTMLElement | undefined,
  checkTrue: () => boolean,
  checkFalse: () => boolean,
) => {
  if (!isNil(element)) {
    if (checkFalse() && element.style.display === 'block') {
      element.style.setProperty('display', 'none')
    } else if (checkTrue() && element.style.display === 'none') {
      element.style.setProperty('display', 'block')
    }
  }
}

const onChange = (element: HTMLElement, boundaries: Boundaries) => () => {
  handleViewChange(
    boundaries.top,
    () => element.scrollTop > 0,
    () => element.scrollTop === 0,
  )
  handleViewChange(
    boundaries.bottom,
    () => element.scrollHeight - element.scrollTop > element.offsetHeight,
    () => element.scrollHeight - element.scrollTop === element.offsetHeight,
  )
  handleViewChange(
    boundaries.left,
    () => element.scrollLeft > 0,
    () => element.scrollLeft === 0,
  )

  handleViewChange(
    boundaries.right,
    () => Math.floor(element.scrollWidth - element.scrollLeft) > Math.ceil(element.offsetWidth),
    () => Math.floor(element.scrollWidth - element.scrollLeft) <= Math.ceil(element.offsetWidth),
  )
}

const shadowSpan = (styles: Partial<CSSStyleDeclaration> = {}) => {
  const span = document.createElement('span')
  const basicStyles: Partial<CSSStyleDeclaration> = {
    position: 'absolute',
    display: 'none',
    opacity: '.6',
  }

  Object.assign(span.style, basicStyles, styles)

  return span
}
const topSpan = () =>
  shadowSpan({
    top: '0',
    left: '0',
    right: '0',
    height: '.6rem',
    backgroundImage: 'linear-gradient(var(--gray-300), var(--surface-50))',
  })
const bottomSpan = () =>
  shadowSpan({
    bottom: '0',
    left: '0',
    right: '0',
    height: '.6rem',
    backgroundImage: 'linear-gradient(var(--surface-50), var(--gray-300))',
  })
const leftSpan = () =>
  shadowSpan({
    top: '0',
    left: '0',
    bottom: '0',
    width: '.6rem',
    backgroundImage: 'linear-gradient(90deg, var(--gray-300), var(--surface-50))',
  })
const rightSpan = () =>
  shadowSpan({
    top: '0',
    bottom: '0',
    right: '0',
    width: '.6rem',
    backgroundImage: 'linear-gradient(90deg, var(--surface-50), var(--gray-300))',
  })

export const attachShadow = (element: HTMLElement, horizontal = false, vertical = false) => {
  const boundaries: Boundaries = {}
  const changeHandler = onChange(element, boundaries)

  const container = document.createElement('div')
  element.parentElement!.appendChild(container)
  container.appendChild(element)

  if (horizontal || !vertical) {
    container.appendChild((boundaries.left = leftSpan()))
    container.appendChild((boundaries.right = rightSpan()))
    element.style.setProperty('overflow-x', 'auto')
  }
  if (vertical || !horizontal) {
    container.appendChild((boundaries.top = topSpan()))
    container.appendChild((boundaries.bottom = bottomSpan()))
    element.style.setProperty('overflow-y', 'auto')
  }

  container.style.setProperty('position', 'relative')
  element.addEventListener('scroll', changeHandler)
  const resizeObserver = new ResizeObserver(changeHandler)
  resizeObserver.observe(element)
  changeHandler()

  const unAttach = () => {
    element.removeEventListener('scroll', changeHandler)
    resizeObserver.disconnect()
    for (const boundary of Object.values(boundaries)) element.removeChild(boundary)
  }

  ;(element as HTMLElementWithAState)[stateKey] = { unAttach }

  return {
    unAttach: () => {
      ;(element as HTMLElementWithAState)[stateKey]?.unAttach()
    },
  }
}

export const scrollShadow: Directive = {
  mounted(el, { modifiers }) {
    const { unAttach } = attachShadow(el, modifiers.horizontal, modifiers.vertical)

    el[stateKey] = { unAttach }
  },
  beforeUnmount(el) {
    ;(el as HTMLElementWithAState)[stateKey]?.unAttach()
  },
}