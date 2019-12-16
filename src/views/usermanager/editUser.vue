<!--suppress ALL -->
<template>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="140px" style="width: 500px; margin-left:50px;">
    <el-form-item label="用户登录名称" prop="uName">
      <el-input v-model="dataForm.uName" maxlength="20" />
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
      <el-button type="primary" :loading="editloging" @click="editUserHandler">
        提交
      </el-button>
      <el-button @click="cancelhandler">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getUserInfoById, editUser } from '@/api/user'
import { getUserRoleList } from '@/api/userRoleManager'
export default {
  name: 'EditUser',
  props: ['rowUser'],
  data() {
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
      editloging: false,
      uploadLoading: false,
      rolelist: [],
      dataForm: {
        id: '',
        uName: '',
        uPhone: '',
        nikeName: '',
        avatar: '',
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
    this.initUserInfo()
  },
  methods: {
    initRoleList() {
      getUserRoleList().then(res => {
        if (res.status) {
          this.rolelist = res.data
        }
      }).catch(() => {
      })
    },
    initUserInfo() {
      const uid = this.rowUser.id
      getUserInfoById({ uid: uid }).then(res => {
        if (res.status) {
            this.dataForm = {
              id : res.data.id,
              uName : res.data.uName,
              nikeName : res.data.nikeName,
              uPhone : res.data.uPhone,
              avatar : res.data.avatar,
              rolecodelist : res.data.rolelist
            }
        }
      }).catch(() => {})
    },
    editUserHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.editloging = true
          let param = {
            id : this.dataForm.id,
            uName : this.dataForm.uName,
            nikeName : this.dataForm.nikeName,
            uPhone: this.dataForm.uPhone,
            avatar : this.dataForm.avatar,
            rolelist : this.dataForm.rolecodelist
          }
          editUser(param).then(res =>{
            this.editloging = false
            if (res.status) {
              this.$tip.notify.open({
                type: 'success',
                message: `编辑用户成功`,
                showClose: true
              })
              this.$emit('editUserHandler', res.status)
            } else {
              this.$tip.notify.open({
                type: 'error',
                message: '编辑用户失败,失败原因[' + res.message + ']',
                showClose: true
              })
            }
          }).catch(() =>{
            this.editloging = false
          })
        }
      })
    },
    cancelhandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消编辑吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('editCacelHandler')
      }).catch(() => {})
    },
    isCellPhone(val) {
      return !this.$reg.regPhone.test(val)
    }
  }
}
</script>

<style scoped>

</style>
