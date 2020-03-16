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
    <el-form-item ref="gPhotoRef" label="商品图片" prop="goodsPhoto">
      <el-upload
        ref="uploadref"
        class="upload-demo"
        drag
        action=""
        :http-request="uploadPhoto"
        :before-upload="beforeUploadPhoto"
        list-type="picture"
        :limit="parseInt('1')"
        :auto-upload="false"
        :on-exceed="onexeceed"
        :on-change="onchanges"
        :on-remove="onRemoveMethod"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB</div>
      </el-upload>
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
import { uploadGoodsPhoto, insertGoodsInfo } from '@/api/goods'
import { getGoodsTypeList } from '@/api/goodsCategory'
export default {
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
      filelist: [],
      goodstypelist: [],
      addloging: false,
      dataForm: {
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
        goodsPhoto: [
          {
            required: true,
            message: '请上传商品图片'
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
    // 选择图片成功之后去掉图片验证
    onchanges(file, fileList) {
      console.log(file)
      if (fileList.length > 0) {
        this.rules.goodsPhoto = []
        this.$refs.gPhotoRef.clearValidate()
      }
    },
    // 删除图片成功之后加上图片验证
    onRemoveMethod(file, fileList) {
      if (fileList.length === 0) {
        this.rules.goodsPhoto = [{
          required: true,
          message: '请上传商品图片'
        }]
      }
    },
    // 点击确定按钮新增商品
    addCategoryTypeHandler() {
      console.log(this.filelist)
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.addloging = true
          this.$refs.uploadref.submit()
        }
      })
    },
    // 取消新增商品信息
    cancelhandler() {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要取消新增吗?',
        confirmText: '确定'
      }).then(() => {
        this.$emit('cancelhandler')
      }).catch(() => {})
    },
    // 上传多次提示
    onexeceed() {
      this.$tip.notify.open({
        type: 'warning',
        message: '同时只能上传一个图片!',
        showClose: true
      })
    },
    // 上传图片之前判断图片格式大小
    beforeUploadPhoto(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.addloging = false
        this.$tip.notify.open({
          type: 'error',
          message: '上传图片只能是jpg格式!',
          showClose: true
        })
      }
      if (!isLt2M) {
        this.addloging = false
        this.$tip.notify.open({
          type: 'error',
          message: '上传图片大小不能超过 2MB!',
          showClose: true
        })
      }
      return isJPG && isLt2M
    },
    // 上传图片调用后台接口存储数据
    uploadPhoto(item) {
      const fileobj = item.file
      const fomdata = new FormData()
      fomdata.append('file', fileobj)
      uploadGoodsPhoto(fomdata).then(res => {
        if (res.status) {
          const photopath = res.data.photopath
          this.addGoodsInfo(photopath)
        } else {
          this.addloging = false
          this.$tip.notify.open({
            type: 'error',
            message: '上传商品图片失败',
            showClose: true
          })
        }
      }).catch((error) => { console.log(error) })
    },
    // 新增商品信息
    addGoodsInfo(photoPath) {
      this.dataForm.goodsPhoto = photoPath
      insertGoodsInfo(this.dataForm).then(res => {
        this.addloging = false
        if (res.status) {
          this.$tip.notify.open({
            type: 'success',
            message: `新增商品信息成功`,
            showClose: true
          })
          this.$emit('AddGoodsEmit', res.status)
        } else {
          this.addloging = false
          this.$tip.notify.open({
            type: 'error',
            message: '新增商品信息失败',
            showClose: true
          })
        }
      }).catch(() => {
        this.addloging = false
      })
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
