import { on } from '@/libs/untils.js'
/**
 * tuozhuai
 */
export default {
	inserted: (el, binding, vnode) => {
		let triggerDom = document.querySelector(binding.value.trigger)
		triggerDom.style.cursor = 'move'
		let bodyDom = document.querySelector(binding.value.body)
		let pageX = 0
		let pageY = 0
		let transformX = 0
		let transformY = 0
		let canMove = false
		let that = vnode
		debugger
		const handleMousedown = e => {
			canMove = true
		}
		const handleMousemove = e => {
		let xOffset = e.pageX - pageX + transformX
		let yOffset = e.pageY - pageY + transformY
		const boundingClientRect = bodyDom.offsetParent.getBoundingClientRect()
		const halfWidth = parseInt(bodyDom.clientWidth) / 2
		const halfHeight = parseInt(bodyDom.clientHeight) / 2
		if (canMove) {
			bodyDom.style.top = Math.min(Math.max(e.pageY - boundingClientRect.y - halfHeight, 0), boundingClientRect.height - parseInt(bodyDom.clientHeight)) + 'px'
			bodyDom.style.left = Math.min(Math.max(e.pageX - boundingClientRect.x - halfWidth, 0), boundingClientRect.width - parseInt(bodyDom.clientWidth)) + 'px'
		
		}
		pageX = bodyDom.style.top
		pageY = bodyDom.style.left
		
  	}
	const handleMouseup = e => {
		debugger
		that.context.left = pageX
		that.context.top = pageY
		canMove = false
	}
	on(triggerDom, 'mousedown', handleMousedown)
	on(document, 'mousemove', handleMousemove)
	on(document, 'mouseup', handleMouseup)
  },
  update: (el, binding, vnode) => {
	// TODO 在虚拟 dom 更新的时候做一些操作 
	console.log('你被更新了')
	if (!binding.value.recover) return
	let bodyDom = document.querySelector(binding.value.body)
	// bodyDom.style.top = '0px'
	// bodyDom.style.left = '0px'
  }
}