<template>
  <div class="page lists-show">  <!--最外层容器-->
    <nav>
      <div class="nav-group">  <!--移动端的苹果图标-->
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span> <!--标题-->
        <span class="count-list">{{todo.count}}</span> <!--数目-->
      </h1>
      <div class="nav-group right"> <!-- 右边的删除，锁定图标容器-->
        <div class="options-web">
          <a class="nav-item"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <a class="nav-item">
            <span class="icon-trash"></span>
          </a>
        </div>
      </div>
      <div class="form todo-new input-symbol">
        <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
        <input type="text"
               v-model="text" placeholder="请输入" @keyup.enter="onAdd" :disable="todo.locked"/>
        <span class="content-scrollable list-items"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!--容器下半部分-->
      <div v-for="item in items">
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>

<script>
  import item from './item'
  import {getTodo, addRecord} from '../api/api'

  export default {
    components: {
      item
    },
    watch: {
      '$route.params.id'() {
        this.init()
      }
    },
    data() {
      return {
        todo: {},
        items: [],
        text: '' // 新增待办单项绑定的值
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        const ID = this.$route.params.id
        getTodo({id: ID}).then(resp => {
          let {id, title, count, isDelete, locked, record} = resp.data.todo
          this.items = record
          this.todo = {
            id: id,
            title: title,
            count: count,
            locked: locked,
            isDelete: isDelete,
            // record: record,
          }
        })
      },
      onAdd() {
        const ID = this.$route.params.id
        addRecord({id: ID, text: this.text}).then(res => {
          this.text = ''
          this.init()
        })

        // this.items.push({
        //   checked: false, text: this.text, isDelete: false
        // })
        // this.text = ''
      },
    }
  }
</script>

<style lang="less">
  @import '../common/style/nav.less';
  @import '../common/style/form.less';
  @import '../common/style/todo.less';
</style>
