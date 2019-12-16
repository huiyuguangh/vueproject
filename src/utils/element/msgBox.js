import {
  MessageBox
} from 'element-ui'

const msgBox = {
  confirm({
    title = '提示',
    message = '提示内容',
    type = 'info',
    cancelText = '取消',
    confirmText = '确定'
  }) {
    return MessageBox.confirm(message, title, {
      type: type,
      cancelButtonText: cancelText,
      confirmButtonText: confirmText
    })
  }
}

export default msgBox
