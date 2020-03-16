<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-bottom: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="addCategoryTypeMethod"
      >
        新增
      </el-button>
      <el-select v-model="gTypecode" placeholder="请选择商品类型" @change="chooseGoodsType">
        <el-option v-for="item in goodstypelist" :key="item.gTypecode" :label="item.gTypename" :value="item.gTypecode" />
      </el-select>
    </div>
    <el-table
      ref="goodstypeTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="商品编号" width="115">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          {{ scope.row.goodsName }}
        </template>
      </el-table-column>
      <el-table-column label="商品类型名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsTypename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsTypeCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsPrice }}
        </template>
      </el-table-column>
      <el-table-column label="商品标题" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsTitle }}
        </template>
      </el-table-column>
      <el-table-column label="商品图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.goodsPhoto" width="70" height="55">
        </template>
      </el-table-column>
      <el-table-column label="商品详细说明" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsDescr }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ formatTime(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="del(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="pageIndex"
        :page-size="pageSize"
        @current-change="current_change"
      />
    </div>
    <el-dialog v-if="addGoodsStatus" :visible.sync="addGoodsStatus" title="新增商品信息" :modal-close="false" :escape-close="false" :before-close="addGoodsViewClose">
      <AddGoods ref="addGoodsView" @AddGoodsEmit="addGoodsCommit" @cancelhandler="cacelHandlerCimmit" />
    </el-dialog>
    <el-dialog v-if="editGoodsStatus" :visible.sync="editGoodsStatus" title="编辑商品信息" :modal-close="false" :escape-close="false" :before-close="editGoodsViewClose">
      <EditGoods ref="editGoodsView" :edit-data="editData" @editGoodsEmit="editGoodsCommit" @editCancelHandler="editGoodsCancelCommit" />
    </el-dialog>
  </div>
</template>

<script>
import { parseTimeFomate } from '@/utils'
import { getGoodsInfoList, delGoodsInfoById } from '@/api/goods'
import { getGoodsType } from '@/api/goodsCategory'
import AddGoods from './AddGoods'
import EditGoods from './EditGoods'

export default {
  name: 'GoodsInfo',
  components: {
    AddGoods,
    EditGoods
  },
  data() {
    return {
      list: null,
      goodstypelist: [],
      gTypecode: '',
      listLoading: true,
      pageIndex: 1,
      pageSize: 2,
      total: 0,
      addGoodsStatus: false,
      editGoodsStatus: false,
      editData: {}
    }
  },
  created() {
    this.fetchData(this.pageIndex, this.gTypecode)
  },
  mounted() {
    this.initGoodsType()
  },
  methods: {
    // 获取商品类型集合方法
    initGoodsType() {
      getGoodsType().then(res => {
        if (res.status) {
          this.goodstypelist = res.data
        }
      }).catch(() => {
      })
    },
    // 页面初始化获取数据方法
    fetchData(pageIndex, goodstypecode) {
      this.listLoading = true
      getGoodsInfoList({
        'pageIndex': pageIndex,
        'pageSize': this.pageSize,
        'goodsTypeCode': goodstypecode
      }).then(response => {
        if (response.status) {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        }
      }).catch(() => {
      })
    },
    // 格式化时间方法
    formatTime(date) {
      return parseTimeFomate(date)
    },
    // 分页方法
    current_change(pageIndex) {
      this.pageIndex = pageIndex
      this.fetchData(this.pageIndex, this.gTypecode)
    },
    // 新增商品方法
    addCategoryTypeMethod() {
      this.addGoodsStatus = true
    },
    // 编辑商品方法
    edit(row) {
      this.editData = row
      this.editGoodsStatus = true
    },
    // 删除商品方法
    del(row) {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要删除记录吗?',
        confirmText: '确定'
      }).then(() => {
        const id = row.id
        delGoodsInfoById({ 'id': id }).then(res => {
          if (res.status) {
            this.$tip.notify.open({
              type: 'success',
              message: `删除商品信息成功`,
              showClose: true
            })
            this.fetchData(1, this.gTypecode)
          } else {
            this.$tip.notify.open({
              type: 'error',
              message: '删除商品信息失败',
              showClose: true
            })
          }
        }).catch(() => {})
      }).catch(() => {})
    },
    // 选择产品类型方法
    chooseGoodsType(code) {
      this.gTypecode = code
      this.pageIndex = 1
      this.fetchData(this.pageIndex, this.gTypecode)
    },
    // 取消新增商品
    cacelHandlerCimmit() {
      this.addGoodsStatus = false
    },
    // 取消编辑商品
    editGoodsCancelCommit() {
      this.editGoodsStatus = false
    },
    // 新增商品确定按钮
    addGoodsCommit(status) {
      if (status) {
        this.addGoodsStatus = false
        this.fetchData(this.pageIndex, this.gTypecode)
      }
    },
    // 关闭新智能弹出层方法
    addGoodsViewClose() {
      this.$refs.addGoodsView.cancelhandler()
    },
    // 关闭编辑弹出层方法
    editGoodsViewClose() {
      this.$refs.editGoodsView.cancelhandler()
    },
    // 编辑商品信息确定按钮回调方法
    editGoodsCommit(status) {
      if (status) {
        this.editGoodsStatus = false
        this.fetchData(this.pageIndex, this.gTypecode)
      }
    }
  }
}
</script>

<style scoped>

</style>
