const { successHandle, errorHandle } = require('../service/handle');
const Posts = require('../models/post');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    successHandle(res, '取得成功', allPosts);
  },
  async createdPosts(req, res) {
    try {
      const body = req.body;
      if (body.content !== '') {
        const newPost = await Posts.create({
          name: body.name,
          tags: body.tags,
          type: body.type,
          content: body.content
        })
        successHandle(res, '新增成功', newPost);
      } else {
        errorHandle(res, '欄位沒有正確，或沒有此 ID');
      }
    } catch (error) {
      errorHandle(res, error.message);
    }
  }
}

module.exports = posts;