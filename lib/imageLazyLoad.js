
import { throttle } from 'yu-util'

function imageLazyLoad (Vue, options) {
  let io = null
  const imgs = []
  options = typeof options === 'object' ? options : {}
  const clientHeight = document.documentElement.clientHeight

  if (window.IntersectionObserver) {
    io = new IntersectionObserver(entries => {
		  entries.forEach(entrie => {
		    const element = entrie.target
		    const dataSrc = element.getAttribute('data-src')
		    entrie.isIntersecting && (element.src = dataSrc)
		    new RegExp(dataSrc).test(element.src) && io.unobserve(element)
		  })
    })
  } else {
    window.addEventListener('load', () => {
      if (options.root) {
        (function fn () {
          const root = document.querySelector(options.root)
          root && rootScroll(root, imgs, clientHeight)
          !root && setTimeout(fn, 20)
        })()
      } else {
        rootScroll(window, imgs, clientHeight)
      }
    })
  }

  Vue.directive('Lazy', {
	  inserted (el, binding) {
	    el.setAttribute('data-src', binding.value)
	    io && io.observe(el)
      !io && load(imgs, el, clientHeight)
	  }
  })
}

function rootScroll (root, imgs, clientHeight) {
  root.addEventListener('scroll',
    throttle(function () {
      imgs.forEach(img => {
        const rect = img.getBoundingClientRect()
        if (rect.top < clientHeight && rect.bottom > 0) {
          img.src = img.getAttribute('data-src')
        }
      })
    }, 500)
  )
}

function load (imgs, el, clientHeight) {
  const contains = document.body.contains.bind(document.body);
  (function fn () {
    if (contains(el)) { // 判断el是否已插入body
      imgs.push(el)
      const rect = el.getBoundingClientRect()
      if (rect.top < clientHeight && rect.bottom > 0) {
        el.src = el.getAttribute('data-src')
      }
    } else {
      setTimeout(fn, 20)
    }
  })()
}

export default imageLazyLoad
