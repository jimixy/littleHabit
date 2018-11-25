import vue from 'vue'
import toastComponent from './toast.vue'

const ToastConstructor = vue.extend(toastComponent)

function showToast(text, duration = 2000) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        show: true
      }
    }
  })
  document.body.appendChild(toastDom.$el)
  setTimeout(() => {
    toastDom.show = false
  }, duration)
}

function registryToast() {
  vue.prototype.$toast = showToast
}

export { registryToast, showToast }