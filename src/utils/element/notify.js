import {
  Message
} from 'element-ui'

const notify = {
  open({
    type = 'info',
    message = '',
    duration = 2000,
    showClose = false,
    onClose = () => {}
  }) {
    Message({
      type,
      message,
      duration,
      showClose,
      onClose
    })
  },
  close() {
    Message.close()
  }
}

/**
 * 通知
 */
export default notify
