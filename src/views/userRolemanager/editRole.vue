<template>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="dataForm.roleName" maxlength="20" />
    </el-form-item>
    <el-form-item label="角色code" prop="roleCode">
      <el-input v-model="dataForm.roleCode" maxlength="20" disabled />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="uploadLoading" @click="editRoleHandler">
        提交
      </el-button>
      <el-button @click="updateCcancelHandler">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { editRoleById } from '@/api/userRoleManager'
export default {
  name: 'EditRole',
  props: ['editRow'],
  data() {
    return {
      uploadLoading: false,
      dataForm: {
        id: this.editRow.id,
        roleName: this.editRow.roleName,
        roleCode: this.editRow.roleCode
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
    updateCcancelHandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消编辑吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('updateCacelHandler')
      }).catch(() => {})
    },
    editRoleHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.uploadLoading = true
          editRoleById({ roleName: this.dataForm.roleName, roleCode: this.dataForm.roleCode, roleId: this.dataForm.id }).then(res => {
            this.uploadLoading = false
            if (res.status) {
              this.$tip.notify.open({
                type: 'success',
                message: `编辑角色成功`,
                showClose: true
              })
              this.$emit('editRoleHandler', res.status)
            } else {
              this.$tip.notify.open({
                type: 'error',
                message: '编辑角色失败,失败原因[' + res.message + ']',
                showClose: true
              })
            }
          }).catch(() => {
            this.uploadLoading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
