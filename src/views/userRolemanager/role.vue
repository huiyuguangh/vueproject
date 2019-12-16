<!--suppress ALL -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-edit" @click="addRole">
        新增
      </el-button>
    </div>
    <el-table
      ref="roleTable"
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
      <el-table-column label="权限名称">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="权限code" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ formatTime(scope.row.createTime) }}
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

    <el-dialog :visible.sync="adddialogStatus"  v-if="adddialogStatus" title="新增角色" :modalClose="false" :escapeClose="false" :before-close="AddRoleViewClose">
      <add-role ref="addRoleView" @addRoleHandler="addCommit" @cancelhandler="cancelCommit"></add-role>
    </el-dialog>
    <el-dialog :visible.sync="editdialogStatus" v-if="editdialogStatus" title="编辑角色"  :modalClose="false" :escapeClose="false" :before-close="editRoleViewClose">
        <edit-role-view ref="editRoleV" :editRow="editRow" @editRoleHandler="editCommit" @updateCacelHandler="cacelHandler"></edit-role-view>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRoleList } from '@/api/userRoleManager'
import { parseTimeFomate } from '@/utils'
import addRole from './addRole'
import editRoleView from './editRole'
import {delRoleById} from '@/api/userRoleManager'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      adddialogStatus : false,
      editdialogStatus : false,
      editRow:{}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllRoleList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    formatTime(date) {
      return parseTimeFomate(date)
    },
    edit(row) {
      this.editRow = row
      this.editdialogStatus = true
    },
    addRole() {
      this.adddialogStatus = true
    },
    del(row) {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要删除记录吗?',
        confirmText: '确定'
      }).then(() => {
        let roleId = row.id
        delRoleById({roleId:roleId}).then(res => {
          if(res.status){
            this.$tip.notify.open({
              type: 'success',
              message: `删除角色成功`,
              showClose: true
            })
            this.fetchData()
          }else{
            this.$tip.notify.open({
              type: 'error',
              message: '删除角色失败',
              showClose: true
            })
          }
        }).catch(() =>{})
      }).catch(() => {})
    },
    addCommit(status) {
      if(status){
        this.adddialogStatus = false
        this.fetchData()
      }
    },
    cancelCommit() {
      this.adddialogStatus = false
    },
    AddRoleViewClose() {
      this.$refs.addRoleView.cancelhandler()
    },
    editRoleViewClose(){
      this.$refs.editRoleV.updateCcancelHandler()
    },
    cacelHandler(){
      this.editdialogStatus = false
    },
    editCommit(status) {
      if(status){
        this.editdialogStatus = false
        this.fetchData()
      }
    }
  },
  components:{
    addRole,
    editRoleView
  }
}
</script>
