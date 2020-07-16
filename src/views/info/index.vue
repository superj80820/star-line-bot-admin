<template>
  <div class="app-container">
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    >
    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :auto-crop-area="1"
            :src="imgSrc"
          />
        </div>
        <div class="actions" />
      </section>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="名子">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="羅馬拼音">
          <el-input v-model="form.romanization" />
        </el-form-item>
        <el-form-item label="附註">
          <el-input v-model="form.detail" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="syncFaceToken">同時上傳至辨識圖庫</el-checkbox>
          <el-button type="primary" @click="showFileChooser">選圖</el-button>
          <el-button type="success" @click="onCreate">創建</el-button>
          <el-button type="warning" @click="onUpload">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      imgSrc: `${process.env.BASE_URL}selectImageInfo.png`,
      syncFaceToken: true,
      full: true,
      id: '',
      form: {
        name: '',
        romanization: '',
        detail: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.form.name = this.$route.query.name
    this.form.romanization = this.$route.query.romanization
    this.form.detail = this.$route.query.detail
    this.imgSrc = this.$route.query.preview || this.imgSrc
    this.id = this.$route.query.id
  },
  methods: {
    reset() {
      this.$refs.cropper.reset()
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg)
    },
    setImage(e) {
      const file = e.target.files[0]

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }

        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    showFileChooser() {
      this.$refs.input.click()
    },
    onUpload() {
      const loading = this.$loading({
        lock: true,
        text: '上傳中'
      })
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('preview', blob, 'filename.png')
        formData.append('name', this.form.name)
        formData.append('romanization', this.form.romanization)
        formData.append('detail', this.form.detail)
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_BASE_API}/face-service/faces/info/${this.id}`,
          headers: {
            'Authorization': this.token
          },
          data: formData
        })
          .then((res) => {
            console.log(res)
            loading.close()
            this.$message('成功')
          })
          .catch((err) => {
            console.log(err)
            loading.close()
            this.$message('失敗')
          })
      }, 'image/jpeg')
    },
    uploadFaceToken() {
      const loading = this.$loading({
        lock: true,
        text: '上傳中'
      })
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('image', blob, 'filename.png')
        formData.append('infoId', this.id)
        axios({
          method: 'post',
          url: `${process.env.VUE_APP_BASE_API}/face-service/faces/face`,
          headers: {
            'Authorization': this.token
          },
          data: formData
        })
          .then((res) => {
            console.log(res)
            loading.close()
            this.$message('成功')
          })
          .catch((err) => {
            console.log(err)
            loading.close()
            this.$message('失敗')
          })
      }, 'image/jpeg')
    },
    onCreate() {
      const loading = this.$loading({
        lock: true,
        text: '上傳中'
      })
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('preview', blob, 'filename.png')
        formData.append('name', this.form.name)
        formData.append('romanization', this.form.romanization)
        formData.append('detail', this.form.detail)
        axios({
          method: 'post',
          url: `${process.env.VUE_APP_BASE_API}/face-service/faces/info`,
          headers: {
            'Authorization': this.token
          },
          data: formData
        })
          .then((res) => {
            console.log(res)
            this.id = res.data.id
            if (this.syncFaceToken) this.uploadFaceToken()
            loading.close()
            this.$message('成功')
          })
          .catch((err) => {
            console.log(err)
            loading.close()
            this.$message('失敗')
          })
      }, 'image/jpeg')
    }
  }
}
</script>

<style>
input[type="file"] {
  display: none;
}
</style>
