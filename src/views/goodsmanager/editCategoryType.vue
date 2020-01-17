<!--suppress ALL -->
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
      <el-button type="primary" :loading="editloging" @click="editCategoryTypeHandler">
        提交
      </el-button>
      <el-button @click="editCancelhandler">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getGoodsCateTypeById,editGoodstype } from '@/api/goodsCategory'
export default {
  props: ['rowData'],
  data() {
    return {
      editloging: false,
      dataForm: {
        id: '',
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
  created() {
    this.initCategoryTypeById()
  },
  methods: {
    initCategoryTypeById() {
      const typeid = this.rowData.id
      getGoodsCateTypeById({ 'id': typeid }).then(res => {
        if(res.status){
          this.dataForm = {
            id: res.data.id,
            gTypename: res.data.gTypename,
            gTypecode: res.data.gTypecode,
            gTypedescr: res.data.gTypedescr
          }
        }
      }).catch(() => {

      })
    },
    editCategoryTypeHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
            this.editloging = true
            const pam = {
              id: this.dataForm.id,
              gTypename: this.dataForm.gTypename,
              gTypecode: this.dataForm.gTypecode,
              gTypedescr: this.dataForm.gTypedescr
            }
          editGoodstype(pam).then(res=>{
            this.editloging = false
            if(res.status){
              this.$tip.notify.open({
                type: 'success',
                message: `编辑商品分类成功`,
                showClose: true
              })
              this.$emit('editGoodsCateEmit', res.status)
            }else{
              this.$tip.notify.open({
                type: 'error',
                message: '编辑商品分类失败,失败原因[' + res.message + ']',
                showClose: true
              })
            }
          }).catch(()=>{
            this.editloging = false
          })
        }
      })
    },
    editCancelhandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消编辑吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('editCancelhandler')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
