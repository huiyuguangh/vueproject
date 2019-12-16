<template><el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="dataForm.roleName" maxlength="20" />
  </el-form-item>
  <el-form-item label="角色code" prop="roleCode">
    <el-input v-model="dataForm.roleCode" maxlength="20" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" :loading="addloging" @click="addRoleHandler">
      提交
    </el-button>
    <el-button @click="cancelhandler">
      取消
    </el-button>
  </el-form-item>
</el-form>

</template>

<script>
import { addRole } from '@/api/userRoleManager'
export default {
  name: 'AddRole',
  data() {
    return {
      addloging: false,
      dataForm: {
        roleName: '',
        roleCode: ''
      },
      rules: {
        roleName: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入角色名称'
          }
        ],
        roleCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入角色code'
          }
        ]
      }
    }
  },
  methods: {
    cancelhandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消新增吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('cancelhandler')
      }).catch(() => {})
    },
    addRoleHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.addloging = true
          addRole({ roleName: this.dataForm.roleName, roleCode: this.dataForm.roleCode }).then(res => {
            this.addloging = false
            if (res.status) {
              this.$tip.notify.open({
                type: 'success',
                message: `新增角色成功`,
                showClose: true
              })
              this.$emit('addRoleHandler', res.status)
            } else {
              this.$tip.notify.open({
                type: 'error',
                message: '新增角色失败',
                showClose: true
              })
            }
          }).catch(() => {
            this.addloging = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
