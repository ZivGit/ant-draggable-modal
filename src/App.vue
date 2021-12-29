<template>
  <div id="app">
    <div class="container" ref="container">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <a-modal :visible="visible" title="Modal 2" v-drag-modal>ModalText</a-modal>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    openModal(role, options) {
      const defaultProps = {
        class: 'draggable-modal',
        icon: () => null,
        width: 350,
        // destroyOnClose: true,
        centered: true,
        getContainer: () => this.$refs.container,
      }
      switch (role) {
        case 'confirm':
          Object.assign(defaultProps, {
            okText: 'Yes',
            cancelText: 'No',
          })
          break
      }
      Modal[`${role}`]({
        ...defaultProps,
        ...options,
      })
  },
  },
  mounted() {
    this.openModal('confirm', {
      title: 'Title',
      content: h => ([
        h('em', 'ModalText'),
      ]),
      okText: 'Submit',
      cancelText: 'Cancel',
      onCancel: () => {},
      onOk: () => {
        this.visible = true
      },
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  position: relative;
  width: 500px;
  margin: 0 auto;
}
.ant-modal-mask,
.ant-modal-wrap {
  position: absolute;
}
</style>
