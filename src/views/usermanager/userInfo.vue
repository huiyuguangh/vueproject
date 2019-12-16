<!--suppress ALL -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-edit" @click="addUserInfo">
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
      <el-table-column label="用户登录名称">
        <template slot-scope="scope">
          {{ scope.row.uName }}
        </template>
      </el-table-column>
      <el-table-column label="用户手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nikeName }}
        </template>
      </el-table-column>
      <el-table-column label="用户角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.rolenamelist }}
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
    <el-dialog :visible.sync="adduserStatus"  v-if="adduserStatus" title="新增用户" :modalClose="false" :escapeClose="false" :before-close="AddUserViewClose">
      <add-user ref="addUserView" @addUserEmit="addUserCommit" @cancelhandler="cancelUserCommit"></add-user>
    </el-dialog>
    <el-dialog :visible.sync="edituserStatus" v-if="edituserStatus" title="编辑用户" :modalClose="false" :escapeClose="false" :before-close="editUserViewClose">
      <edit-user ref="editUserView" :rowUser="rowUser" @editUserHandler="editUserCommit" @editCacelHandler="editcacel"></edit-user>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUserInfo,delUserById } from '@/api/user'
import { parseTimeFomate } from '@/utils'
import addUser from './addUser'
import editUser from './editUser'
export default {
  data() {
    return {
      list: null,
      rowUser:{},
      listLoading: true,
      adduserStatus : false,
      edituserStatus : false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllUserInfo().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    formatTime(date) {
      return parseTimeFomate(date)
    },
    edit(row) {
      this.rowUser = row
      this.edituserStatus = true
    },
    addUserInfo() {
      this.adduserStatus = true
    },
    del(row) {
      this.$tip.msgBox.confirm({
        title: '提示',
        message: '确定要删除记录吗?',
        confirmText: '确定'
      }).then(() => {
          let id = row.id
        delUserById({'userId':id}).then(res =>{
          if(res.status){
            this.$tip.notify.open({
              type: 'success',
              message: `删除用户信息成功`,
              showClose: true
            })
            this.fetchData()
          }else{
            this.$tip.notify.open({
              type: 'error',
              message: '删除用户信息失败',
              showClose: true
            })
          }
        }).catch(()=>{})
      }).catch(() => {})
    },
    AddUserViewClose() {
      this.$refs.addUserView.cancelhandler()
    },
    cancelUserCommit() {
      this.adduserStatus = false
    },
    addUserCommit(status) {
        if(status){
          this.adduserStatus = false
          this.fetchData()
        }
    },
    editUserViewClose() {
      this.$refs.editUserView.cancelhandler()
    },
    editcacel() {
      this.edituserStatus = false
    },
    editUserCommit(status) {
      if(status){
        this.edituserStatus = false
        this.fetchData()
      }
    }

  },
  components:{
    addUser,
    editUser
  }
}
</script>
