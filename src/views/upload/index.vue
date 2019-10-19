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
            :src="imgSrc"
          />
        </div>
        <div class="actions" />
      </section>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item>
          準備開上傳 {{ form.name }} 的照片~
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="showFileChooser"
          >
            選圖
          </el-button>
          <el-button
            type="primary"
            @click="rotate(90)"
          >
            旋轉
          </el-button>
          <el-button
            type="primary"
            @click="reset"
          >
            重置
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="onSubmit"
          >
            上傳
          </el-button>
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
      name: '',
      infoId: '',
      cropImg: '',
      cropped: null,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.infoId = this.$route.query.infoId
    this.form.name = this.$route.query.name
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
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '上傳中'
      })
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('image', blob, 'filename.png')
        formData.append('infoId', this.infoId)
        axios({
          method: 'post',
          url: `${process.env.VUE_APP_BASE_API}/api/faceService/face`,
          headers: {
            'Authorization': `Bearer ${this.token}`
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
      })
    }
  }
}
</script>

<style>
input[type="file"] {
  display: none;
}

.content {
  display: flex;
  justify-content: center;
}

.cropper-area {
  width: 614px;
}

.actions {
  margin-top: 1rem;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
