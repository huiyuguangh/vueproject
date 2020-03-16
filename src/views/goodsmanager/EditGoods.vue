<template>
  <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="140px" style="width: 500px; margin-left:50px;">
    <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="dataForm.goodsName" placeholder="请输入商品名称" maxlength="20" />
    </el-form-item>
    <el-form-item label="商品类型" prop="goodsTypeCode">
      <el-select v-model="dataForm.goodsTypeCode" placeholder="请选择商品类型">
        <el-option v-for="item in goodstypelist" :key="item.gTypecode" :label="item.gTypename" :value="item.gTypecode" />
      </el-select>
    </el-form-item>
    <el-form-item label="商品价格(元)" prop="goodsPrice">
      <el-input v-model="dataForm.goodsPrice" placeholder="请输入商品价格" maxlength="20" />
    </el-form-item>
    <el-form-item label="商品标题" prop="goodsTitle">
      <el-input v-model="dataForm.goodsTitle" placeholder="请输入商品标题" maxlength="40" />
    </el-form-item>
    <el-form-item label="商品介绍" prop="goodsDescr">
      <el-input v-model="dataForm.goodsDescr" type="textarea" :rows="4" placeholder="请输入商品商品介绍" maxlength="200" />
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
import { getGoodsInfoById, editGoodsInfo } from '@/api/goods'
import { getGoodsTypeList } from '@/api/goodsCategory'
export default {
  props: ['editData'],
  data() {
    const checkPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品价格'))
      } else if (this.isPrice(value)) {
        callback(new Error('商品价格格式必须为整数或者小数'))
      } else {
        callback()
      }
    }
    return {
      goodstypelist: [],
      editloging: false,
      dataForm: {
        id: '',
        goodsName: '',
        goodsTypeCode: '',
        goodsPrice: '',
        goodsTitle: '',
        goodsPhoto: '',
        goodsDescr: ''
      },
      rules: {
        goodsName: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入商品名称'
          }
        ],
        goodsTypeCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请选择商品类型'
          }
        ],
        goodsPrice: [
          {
            required: true,
            trigger: 'blur',
            validator: checkPrice
          }
        ],
        goodsTitle: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入商品标题'
          }
        ],
        goodsDescr: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入商品介绍说明'
          }
        ]
      }
    }
  },
  created() {
    this.initGoodsType()
    this.initEditGoodsInfo()
  },
  methods: {
    // 查询商品类型列表
    initGoodsType() {
      getGoodsTypeList().then(res => {
        if (res.status) {
          this.goodstypelist = res.data
        }
      }).catch(() => {

      })
    },
    // 根据商品id查询需要编辑的商品信息
    initEditGoodsInfo() {
      const editGoodsId = this.editData.id
      getGoodsInfoById({ 'id': editGoodsId }).then(res => {
        if (res.status) {
          this.dataForm = {
            id: res.data.id,
            goodsName: res.data.goodsName,
            goodsTypeCode: res.data.goodsTypeCode,
            goodsPrice: res.data.goodsPrice,
            goodsTitle: res.data.goodsTitle,
            goodsDescr: res.data.goodsDescr
          }
        }
      }).catch(() => {

      })
    },
    // 点击确定按钮编辑商品
    addCategoryTypeHandler() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.editloging = true
          editGoodsInfo(this.dataForm).then(res => {
            this.editloging = false
            if (res.status) {
              this.$tip.notify.open({
                type: 'success',
                message: `编辑商品成功`,
                showClose: true
              })
              this.$emit('editGoodsEmit', res.status)
            }else{
              this.$tip.notify.open({
                type: 'error',
                message: '编辑商品分类失败,失败原因[' + res.message + ']',
                showClose: true
              })
            }
          }).catch(() => {
            this.editloging = false
          })
        }
      })
    },
    // 取消编辑商品信息
    cancelhandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消编辑吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('editCancelHandler')
      }).catch(() => {})
    },
    // 价格格式验证
    isPrice(value) {
      return !this.$reg.regPrice.test(value)
    }
  }
}
</script>

<style scoped>

</style>
