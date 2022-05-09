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
  },
  async deleteAll(req, res) {
    await Posts.deleteMany({});
    const deleteAll = await Posts.find();
    successHandle(res, '刪除成功', deleteAll);
  },
  async deleteSingle(req, res) {
    try {
      const id = req.params.id;
      const deleteSingle = await Posts.findByIdAndDelete(id);
      if (deleteSingle) {
        successHandle(res, '刪除成功', deleteSingle);
      } else {
        errorHandle(res, '欄位沒有正確，或沒有此 ID');
      }
    } catch (error) {
      errorHandle(res, error.message);
    }
  },
  async patchPosts(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const patchPosts = await Posts.findByIdAndUpdate(id, {
        name: body.name,
        tags: body.tags,
        type: body.type,
        content: body.content
      },
      { 
        new: true,
        runValidators: true
      });
      if (patchPosts) {
        successHandle(res, '更新成功', patchPosts);
      } else {
        errorHandle(res, '欄位沒有正確，或沒有此 ID');
      }
    } catch (error) {
      errorHandle(res, error.message);
    }
  }
}

module.exports = posts;