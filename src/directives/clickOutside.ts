import { type App, type DirectiveBinding } from 'vue'

interface HTMLElementWithClickOutsideEvent extends HTMLElement {
  clickOutsideEvent?: EventListener
}

const clickOutsideDirective = {
  beforeMount(el: HTMLElementWithClickOutsideEvent, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElementWithClickOutsideEvent) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}

export default {
  install(app: App) {
    app.directive('click-outside', clickOutsideDirective)
  }
}
