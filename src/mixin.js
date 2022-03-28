export const mixin = {
    data() {
        return {
            draggableModalLeft: 0,
            draggableModalTop: 0,
        }
    },
    watch: {
        'visible'(val) {
            if (this.$options.name === 'AModal' && val) {
                setTimeout(() => {
                    this.visibleHookhandler()
                }, 50)
            }
        },
    },
    methods: {
        visibleHookhandler() {
            const $modal = this.$mount().$el.querySelector('.draggable-modal .ant-modal')
            const $modalHandle = this.$mount().$el.querySelector('.draggable-modal .ant-modal-header') || this.$mount().$el.querySelector('.draggable-modal .ant-modal-body')
            const $modalBtns = this.$mount().$el.querySelector('.draggable-modal .ant-modal-confirm-btns, .draggable-modal .ant-modal-footer')

            // 若：无特定 className，则：终止执行
            if (!$modal) return

            // 鼠标变成可移动的指示
            $modalHandle.style.cursor = 'move'
            $modalBtns.style.cursor = 'default'

            const { destroyOnClose } = this.$vnode.componentInstance
            // 未定义 destroyOnClose 时，dom未被销毁，关闭弹窗再次打开，弹窗会停留在上一次拖动的位置
            if (!destroyOnClose) {
                this.draggableModalLeft = $modal.left || 0
                this.draggableModalTop = $modal.top || 0
            }

            // 若：鼠标落到按钮上
            $modalBtns.onmousedown = e => {
                // 则：JS阻止冒泡
                e.stopPropagation()
            }

            // top 初始值为 offsetTop
            // this.top = this.top || $modal.offsetTop
            $modalHandle.onmousedown = e => {
                const startX = e.clientX
                const startY = e.clientY
                document.onmousemove = event => {
                    const endX = event.clientX
                    const endY = event.clientY
                    $modal.left = (endX - startX) + this.draggableModalLeft
                    $modal.top = (endY - startY) + this.draggableModalTop
                    $modal.style.transform = `translate(${$modal.left}px, ${$modal.top}px)`
                }
                document.onmouseup = () => {
                    this.draggableModalLeft = $modal.left
                    this.draggableModalTop = $modal.top
                    document.onmousemove = null
                    document.onmouseup = null
                    $modalHandle.releaseCapture && $modalHandle.releaseCapture()
                }
                $modalHandle.setCapture && $modalHandle.setCapture()
            }
        }
    },
    mounted() {
        if (this.$options.name === 'AModal' && this.visible) {
            this.$nextTick().then(() => this.visibleHookhandler())
        }
    },
}