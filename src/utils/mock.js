import Mock from 'mockjs'

const baseAPI = process.env.VUE_APP_BASE_API

export function mock() {
  Mock.mock(`${baseAPI}/api/user/login`, {
    user: {
      username: 'test',
      email: 'test@gmail.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTlhYTk5ZGE0Zjk2MDAyYTNiZTFhYiIsInVzZXJuYW1lIjoieW9yayIsImV4cCI6MTU3Njg2OTA0NSwiaWF0IjoxNTcxNjg1MDQ1fQ.adf5i2mei08rNpmgQbp3qCOOAFDdwKY6ODwKsnGw0kQ'
    }
  })
  Mock.mock(`${baseAPI}/api/faceService/info`, [
    {
      id: 1,
      name: 'AIKA',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/TZSL4ub.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 2,
      name: 'Julia',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/zTEZPEV.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 3,
      name: 'RION',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/k6vZewy.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 4,
      name: 'Risa',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/DUmdFlu.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 5,
      name: 'yano-purple',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/2zwV0U7.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 6,
      name: 'あかねりこ',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/rjyUsFH.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 7,
      name: 'あべみかこ',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/SnK2OH6.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 8,
      name: 'あやみ旬果',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/dYnrjqr.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 9,
      name: 'きみと歩実',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/VKZC0bE.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 10,
      name: 'ジェマ',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/r1Y59t0.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 11,
      name: 'なるみ杏奈',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/KT3Gn3a.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 12,
      name: 'ひなた澪',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/Z2wgLTY.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 13,
      name: 'ひなみれん',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/F1pAFHh.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 14,
      name: 'ふわり結愛',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/hqGXfLo.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 15,
      name: 'みつ葉',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/3wXF9Zi.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 16,
      name: 'みやび',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/8eBnd2k.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 17,
      name: 'メイメイ',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/M3CCYAU.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 18,
      name: 'めぐり',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/nTQa443.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 19,
      name: 'れおな',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/4rMgWYt.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 20,
      name: '一ノ瀬梓',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/942CmVK.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 21,
      name: '一之瀨亞美里',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/vdyUHV1.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 22,
      name: '一条みお',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/sbWqLgR.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 23,
      name: '一條綺美香',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/chTlrYw.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 24,
      name: '七沢みあ',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/O9OohIy.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    },
    {
      id: 25,
      name: '七瀬あいり',
      romanization: null,
      detail: '',
      preview: 'https://i.imgur.com/WmlyQL5.jpg',
      createdAt: '2019-10-18T00:02:31.000Z',
      updatedAt: '2019-10-18T00:02:31.000Z'
    }
  ])
}
