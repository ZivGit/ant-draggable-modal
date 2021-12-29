export const mixin = {
    data() {
        return {
            left: 0,
            top: 0,
        }
    },
    mounted() {
        this.$nextTick(() => {
            switch (this.$options.name) {
                case 'AModal': {
                    const { visible, destroyOnClose } = this.$vnode.componentInstance
                    // 防止未定义 destroyOnClose 关闭弹窗时 DOM 未被销毁，指令被重复调用
                    if (!visible) return

                    const $container = document.querySelector('.draggable-modal')
                    const $modal = document.querySelector('.draggable-modal .ant-modal')
                    // const header = document.querySelector('.draggable-modal .ant-modal-header')

                    // 鼠标变成可移动的指示
                    $modal.style.cursor = 'move'

                    // 未定义 destroyOnClose 时，dom未被销毁，关闭弹窗再次打开，弹窗会停留在上一次拖动的位置
                    if (!destroyOnClose) {
                        this.left = $modal.left || 0
                        this.top = $modal.top || 0
                    }

                    // top 初始值为 offsetTop
                    // this.top = this.top || $modal.offsetTop
                    $modal.onmousedown = e => {
                        const startX = e.clientX
                        const startY = e.clientY
                        $container.onmousemove = event => {
                            const endX = event.clientX
                            const endY = event.clientY
                            $modal.left = (endX - startX) + this.left
                            $modal.top = (endY - startY) + this.top
                            $modal.style.left = $modal.left + 'px'
                            $modal.style.top = $modal.top + 'px'
                        }
                        document.onmouseup = () => {
                            this.left = $modal.left
                            this.top = $modal.top
                            $container.onmousemove = null
                            $container.onmouseup = null
                            $modal.releaseCapture && $modal.releaseCapture()
                        }
                        $modal.setCapture && $modal.setCapture()
                    }
                    break
                }
                default:
            }
        })
    }
}