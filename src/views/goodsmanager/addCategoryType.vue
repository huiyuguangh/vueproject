<template>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="140px" style="width: 500px; margin-left:50px;">
    <el-form-item label="商品类型名称" prop="gTypename">
      <el-input v-model="dataForm.gTypename" placeholder="请输入商品类型名称" maxlength="20" />
    </el-form-item>
    <el-form-item label="商品类型编码" prop="gTypecode">
      <el-input v-model="dataForm.gTypecode" type="number" placeholder="请输入商品类型编码" maxlength="20" />
    </el-form-item>
    <el-form-item label="商品类型说明" prop="gTypedescr">
      <el-input v-model="dataForm.gTypedescr" type="textarea" :rows="4" placeholder="请输入商品类型说明" maxlength="200" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="addloging" @click="addCategoryTypeHandler">
        提交
      </el-button>
      <el-button @click="cancelhandler">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addGoodsType } from '@/api/goodsCategory'
export default {
  data() {
    return {
      addloging: false,
      dataForm: {
        gTypename: '',
        gTypecode: '',
        gTypedescr: ''
      },
      rules: {
        gTypename: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入商品类型名称'
          }
        ],
        gTypecode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入商品类型编码'
          }
        ],
        gTypedescr: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入商品类型说明'
          }
        ]
      }
    }
  },
  methods: {
    addCategoryTypeHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.addloging = true
          const param = {
            gTypename: this.dataForm.gTypename,
            gTypecode: this.dataForm.gTypecode,
            gTypedescr: this.dataForm.gTypedescr
          }
          addGoodsType(param).then(res => {
            this.addloging = false
            if (res.status) {
              this.$tip.notify.open({
                type: 'success',
                message: `新增商品分类信息成功`,
                showClose: true
              })
              this.$emit('addGoodsCateEmit', res.status)
            } else {
              this.$tip.notify.open({
                type: 'error',
                message: '新增商品分类信息失败',
                showClose: true
              })
            }
          }).catch(() => {
            this.addloging = false
          })
        }
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
    }
  }
}
</script>

<style scoped>

</style>
