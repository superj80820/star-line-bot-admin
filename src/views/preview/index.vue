<template>
  <div class="app-container">
    <el-form :inline="true" label-width="70px">
      <el-form-item label="女優尋找">
        <el-input v-model="search.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tag
      v-for="tag in avTag"
      :key="tag.name"
      closable
      :type="tag.type"
      @close="onCloseTag(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-row :gutter="20">
      <div class="portfolio-items">
        <div
          v-for="(img, index) in previewCard"
          :ref="'img'+index"
          :key="index"
          class="item"
        >
          <el-card class="box-card-component" style="margin-left:8px;">
            <div align="center">
              <img v-lazy="img.src" class="img-item">
              <h3>{{ `${img.id}-${img.name}` }}</h3>
              <div>
                <el-button type="primary" @click="toUpload(img)">上傳臉圖</el-button>
                <el-button type="success" @click="toUpdateInfo(img)">更新女優</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-pagination
          background
          :current-page.sync="currentPage"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="onChangePage"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import faceService from '../../api/faceService'
import _ from 'lodash'

export default {
  data() {
    return {
      currentPage: 1,
      imgs: [],
      search: {
        name: '',
        results: [],
        isNotSearchAnyone() {
          return this.results.length === 0
        },
        isExistName() {
          return this.results.filter(item => this.name).length !== 0
        },
        reset() {
          this.name = ''
          this.results = []
        }
      },
      infosCount: 0,
      faceServiceHandler: {}
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    avTag() {
      return (this.search.isNotSearchAnyone()) ? [] : [...this.search.results.map(item => ({ name: item.name, type: '' })), { name: '取消全部', type: 'danger' }]
    },
    previewCard() {
      return (this.search.isNotSearchAnyone()) ? this.imgs : this.search.results.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    },
    total() {
      return (this.search.isNotSearchAnyone()) ? this.infosCount : this.search.results.length
    }
  },
  mounted() {
    this.faceServiceHandler = faceService(this.token)
    this.getInfo(10, 0)
  },
  methods: {
    onCloseTag(tag) {
      if (tag.name === '取消全部') return this.search.reset()
      this.search.results = this.search.results.filter(item => item.name !== tag.name)
    },
    async onClickSearch() {
      const loading = this.$loading({ lock: true, text: '搜尋中' });

      (async() => {
        if (this.search.isExistName()) return
        const result = await this.faceServiceHandler.searchName(this.search.name)
        if (_.isEmpty(result.rows)) return window.alert('搜尋不到女優')
        console.log()
        this.search.results.push(...result.rows.map(item => ({
          name: item.name,
          src: item.preview,
          romanization: item.romanization,
          detail: item.detail,
          id: item.id
        })))
      })()

      loading.close()
    },
    onChangePage(page) {
      if (this.search.isNotSearchAnyone()) return this.getInfo(10, (page - 1) * 10)
    },
    async getInfo(limit, offset) {
      const loading = this.$loading({ lock: true, text: '載入照片中' })

      const result = await this.faceServiceHandler.getInfosWithPagination(limit, offset)
      this.infosCount = result.count
      this.imgs = result.rows
        .map(response => ({
          name: response.name,
          src: response.preview,
          romanization: response.romanization,
          detail: response.detail,
          id: response.id
        }))

      loading.close()
    },
    toUpload(img) {
      this.$router.push(
        { path: '/upload/index', query: { infoId: img.id, name: img.name }}
      )
    },
    toUpdateInfo(img) {
      this.$router.push(
        { path: '/info/index', query: { id: img.id, name: img.name, preview: img.src, romanization: img.romanization, detail: img.detail }}
      )
    }
  }
}
</script>

<style>
.img-item{
  width: 300px;
}
.content {
  display: flex;
  justify-content: center;
}
.portfolio-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  overflow: auto;
}
.item {
  width: 100%;
  padding: 1rem;
}
</style>
