export const mixin = {
    data() {
        return {
            left: 0,
            top: 0,
        }
    },
    watch: {
        'visible': {
            handler(val) {
                if (val) {
                    setTimeout(() => {
                        this.visiblehookHandler()
                    }, 10)
                }
            },
            immediate: true
        },
    },
    methods: {
        visiblehookHandler() {
            this.$nextTick(function() {
                switch (this.$options.name) {
                    case 'AModal': {
                        const $modalRoot = document.querySelector('.draggable-modal')
                        const $modal = document.querySelector('.draggable-modal .ant-modal')
                        const $btns = document.querySelector('.draggable-modal .ant-modal-confirm-btns')
                        // const $header = document.querySelector('.draggable-modal .ant-modal-header')

                        // 若：无特定 className，则：终止执行
                        if (!$modalRoot) return

                        // 鼠标变成可移动的指示
                        $modal.style.cursor = 'move'
                        $btns.style.cursor = 'default'

                        const { destroyOnClose } = this.$vnode.componentInstance
                        // 未定义 destroyOnClose 时，dom未被销毁，关闭弹窗再次打开，弹窗会停留在上一次拖动的位置
                        if (!destroyOnClose) {
                            this.left = $modal.left || 0
                            this.top = $modal.top || 0
                        }

                        // 若：鼠标落到按钮上
                        $btns.onmousedown = e => {
                            // 则：JS阻止冒泡
                            e.stopPropagation()
                        }

                        // top 初始值为 offsetTop
                        // this.top = this.top || $modal.offsetTop
                        $modal.onmousedown = e => {
                            const startX = e.clientX
                            const startY = e.clientY
                            $modalRoot.onmousemove = event => {
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
                                $modalRoot.onmousemove = null
                                $modalRoot.onmouseup = null
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
    },
    mounted() {}
}