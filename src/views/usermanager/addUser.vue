<template>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="140px" style="width: 500px; margin-left:50px;">
    <el-form-item label="用户登录名称" prop="uName">
      <el-input v-model="dataForm.uName" maxlength="20" />
    </el-form-item>
    <el-form-item label="用户登录密码" prop="uPasswd">
      <el-input type="password" v-model="dataForm.uPasswd" maxlength="20" />
    </el-form-item>
    <el-form-item label="重复用户登录密码" prop="retuPasswd">
      <el-input type="password" v-model="dataForm.retuPasswd" maxlength="20" />
    </el-form-item>
    <el-form-item label="手机号码" prop="uPhone">
      <el-input v-model="dataForm.uPhone" maxlength="20" />
    </el-form-item>
    <el-form-item label="用户昵称" prop="nikeName">
      <el-input v-model="dataForm.nikeName" maxlength="20" />
    </el-form-item>
    <el-form-item label="用户头像URL" prop="avatar">
      <el-input v-model="dataForm.avatar" maxlength="200" />
    </el-form-item>
    <el-form-item label="用户权限" prop="rolecodelist">
      <el-checkbox-group v-model="dataForm.rolecodelist">
        <el-checkbox v-for="role in rolelist" :key="role.id" :label="role.id">{{ role.roleName }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="addloging" @click="addUserHandler">
        提交
      </el-button>
      <el-button @click="cancelhandler">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getUserRoleList } from '@/api/userRoleManager'
import { addUser } from '@/api/user'
export default {
  name: 'AddUser',
  data() {
    const checkRetUpasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.dataForm.uPasswd) {
        callback('两次密码输入不一致')
      } else {
        callback()
      }
    }
    const checkphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (this.isCellPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      rolelist: null,
      addloging: false,
      dataForm: {
        uName: '',
        uPasswd: '',
        retuPasswd: '',
        uPhone: '',
        roleName: '',
        rolecodelist: []
      },
      rules: {
        uName: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户登录名称'
          }
        ],
        uPasswd: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户登录密码'
          }
        ],
        retuPasswd: [
          {
            required: true,
            trigger: 'blur',
            validator: checkRetUpasswd
          }
        ],
        uPhone: [
          {
            required: true,
            trigger: 'blur',
            validator: checkphone
          }
        ],
        nikeName: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户昵称'
          }
        ],
        avatar: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户头像url'
          }
        ],
        rolecodelist: [
          {
            required: true,
            trigger: 'blur',
            message: '请选择用户权限'
          }
        ]
      }
    }
  },
  created() {
    this.initRoleList()
  },
  methods: {
    initRoleList() {
      this.addloging = true
      getUserRoleList().then(res => {
        this.addloging = false
        if (res.status) {
          this.rolelist = res.data
        }
      }).catch(() => {
        this.addloging = false
      })
    },
    cancelhandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消新增吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('cancelhandler')
      }).catch(() => {})
    },
    addUserHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.addloging = true
          const param = {
            uName: this.dataForm.uName,
            uPasswd: this.dataForm.uPasswd,
            uPhone: this.dataForm.uPhone,
            nikeName: this.dataForm.nikeName,
            avatar: this.dataForm.avatar,
            rolelist: this.dataForm.rolecodelist
          }
          addUser(param).then(res => {
            this.addloging = false
            if (res.status) {
              this.$tip.notify.open({
                type: 'success',
                message: `新增用户信息成功`,
                showClose: true
              })
              this.$emit('addUserEmit', res.status)
            } else {
              this.$tip.notify.open({
                type: 'error',
                message: '新增用户信息失败',
                showClose: true
              })
            }
          }).catch(() => {
            this.addloging = false
          })
        }
      })
    },
    isCellPhone(val) {
      return !this.$reg.regPhone.test(val)
    }
  }
}
</script>

<style scoped>

</style>
