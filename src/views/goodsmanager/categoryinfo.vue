<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-edit" @click="addCategoryTypeMethod">
        新增
      </el-button>
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
      <el-table-column align="center" label="ID" width="115">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品类型名称">
        <template slot-scope="scope">
          {{ scope.row.gTypename }}
        </template>
      </el-table-column>
      <el-table-column label="商品类型编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gTypecode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型说明" align="center">
        <template slot-scope="scope">
          {{ scope.row.gTypedescr }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ formatTime(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
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
    <el-dialog v-if="addgtypeStatus" :visible.sync="addgtypeStatus" title="新增商品分类" :modal-close="false" :escape-close="false" :before-close="addGateTypeViewClose">
      <add-category-type ref="addCategoryTypeView" @addGoodsCateEmit="addGoodsTypeCommit" @cancelhandler="cancelHandlerCommit" />
    </el-dialog>
    <el-dialog v-if="editgtypeStatus" :visible.sync="editgtypeStatus" title="编辑商品分类" :modal-close="false" :escape-close="false" :before-close="editUserViewClose">
      <edit-category-type ref="editCategoryTypeView" :row-data="rowData" @editGoodsCateEmit="editGoodsTypeCommit" @editCancelhandler="editCancelCommit" />
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsTypeList, delGoodsTypeById } from '@/api/goodsCategory'
import addCategoryType from './addCategoryType'
import editCategoryType from './editCategoryType'
import { parseTimeFomate } from '@/utils'
export default {
  components: {
    addCategoryType,
    editCategoryType
  },
  data() {
    return {
      list: null,
      listLoading: true,
      addgtypeStatus: false,
      editgtypeStatus: false,
      rowData: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 页面初始化加载数据
    fetchData() {
      this.listLoading = true
      getGoodsTypeList().then(response => {
        if (response.status) {
          this.list = response.data
          this.listLoading = false
        }
      }).catch(() => {})
    },
    addCategoryTypeMethod() {
      this.addgtypeStatus = true
    },
    addGateTypeViewClose() {
      this.$refs.addCategoryTypeView.cancelhandler()
    },
    addGoodsTypeCommit(status) {
      if (status) {
        this.addgtypeStatus = false
        this.fetchData()
      }
    },
    cancelHandlerCommit() {
      this.addgtypeStatus = false
    },
    formatTime(date) {
      return parseTimeFomate(date)
    },
    edit(row) {
      this.rowData = row
      this.editgtypeStatus = true
    },
    editGoodsTypeCommit(status) {
      if (status) {
        this.editgtypeStatus = false
        this.fetchData()
      }
    },
    editCancelCommit() {
      this.editgtypeStatus = false
    },
    editUserViewClose() {
      this.$refs.editCategoryTypeView.editCancelhandler()
    },
    del(row) {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要删除记录吗?',
        confirmText: '确定'
      }).then(() => {
        const id = row.id
        delGoodsTypeById({ 'id': id }).then(res => {
          if (res.status) {
            this.$tip.notify.open({
              type: 'success',
              message: `删除商品分类成功`,
              showClose: true
            })
            this.fetchData()
          } else {
            this.$tip.notify.open({
              type: 'error',
              message: '删除商品分类失败',
              showClose: true
            })
          }
        }).catch(() => {})
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
