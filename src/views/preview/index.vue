<template>
  <div class="app-container">
    <div>
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="女優尋找">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
    <div class="portfolio-items">
      <div
        v-for="(img, index) in imgs"
        v-show="imgShow(img)"
        :ref="'img'+index"
        :key="index"
        class="item"
      >
        <el-card class="box-card-component" style="margin-left:8px;">
          <div align="center">
            <img v-lazy="img.src" class="img-item">
            <h3>{{ img.name }}</h3>
            <div>
              <el-button type="primary" @click="toUpload(img)">上傳臉圖</el-button>
              <el-button type="success" @click="toUpdateInfo(img)">更新女優</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      imgs: [],
      form: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: '載入照片中'
    })
    axios({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_API}/api/faceService/info`,
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
      .then((response) => {
        this.imgs = response.data
          .map((response) => {
            return {
              name: response.name,
              src: response.preview,
              romanization: response.romanization,
              detail: response.detail,
              id: response.id
            }
          })
        loading.close()
      })
  },
  methods: {
    imgShow(img) {
      if (this.form.name === '') return true
      const re = new RegExp(this.form.name, 'g')
      return img.name.match(re)
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
    },
    onCancel() {
    },
    onSubmit() {
    }
  }
}

// flex ref: https://codepen.io/helloandyb/pen/XejqEE
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
