/**
 * 通用正则
 */

// 邮箱正则
const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
// 手机号正则
const regPhone = /^1(3|4|5|6|7|8)\d{9}$/
// 验证名称(中文,字母下划线,0-20位)
const regNickName = /^[A-Za-z0-9_\u4e00-\u9fa5]{0,20}$/
// 验证密码
const regPwd = /^[\w+]{6,20}$/
// 验证备案号
const recordNum = /^[\u4e00-\u9fa5]ICP[备证](\d{6}|\d{8})号(-\d{1,3}$){0,1}$/

const commRegEx = {
  regEmail,
  regPhone,
  regNickName,
  regPwd,
  recordNum
}

export default commRegEx
