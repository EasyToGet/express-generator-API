const { successHandle, errorHandle } = require('../service/handle');
const Posts = require('../models/post');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    successHandle(res, '取得成功', allPosts);
  },
  async createdPosts(req, res) {
    try {
      const data = req.body;
      if (data.content !== '') {
        const newPost = await Posts.create({
          name: data.name,
          tags: data.tags,
          type: data.type,
          content: data.content
        })
        successHandle(res, '新增成功', newPost);
      } else {
        errorHandle(res, '欄位是空的，請填寫');
      }
    } catch (error) {
      errorHandle(res, error.message);
    }
  },
  async deleteAll(req, res) {
    // 取出 req 的 Url，再判斷是否等於 '/posts/'
    if(req.originalUrl == '/posts/') {
      errorHandle(res, '欄位沒有正確，或沒有此 ID');
    } else {
      await Posts.deleteMany({});
      const deleteAll = await Posts.find();
      successHandle(res, '刪除成功', deleteAll);
    }
  },
  async deleteSingle(req, res) {
    try {
      const id = req.params.id;
      const deleteSingle = await Posts.findByIdAndDelete(id);
      if (deleteSingle) {
        const post = await Posts.find();
        successHandle(res, '刪除成功', post);
      } else {
        errorHandle(res, '查無此 ID');
      }
    } catch (error) {
      errorHandle(res, error.message);
    }
  },
  async patchPosts(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      if (!data.content) {
        return errorHandle(res, '欄位是空的，請填寫');
      }
      const patchPosts = await Posts.findByIdAndUpdate(id, {
        name: data.name,
        content: data.content,
        tags: data.tags,
        type: data.type
      },
      {
        new: true,
        runValidators: true
      });
      if (!patchPosts) {
        return errorHandle(res, '查無此 ID');
      }
      const post = await Posts.find();
      successHandle(res, '更新成功', post);
    } catch (error) {
      errorHandle(res, "欄位沒有正確，或沒有此 ID");
    }
  }
}

module.exports = posts;