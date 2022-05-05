const { successHandle, errorHandle } = require('../service/handle');
const Posts = require('../models/post');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    successHandle(res, '取得成功', allPosts);
  },
}

module.exports = posts;