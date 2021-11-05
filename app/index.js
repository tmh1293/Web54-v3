const express = require('express');
const path = require('path');
const postCRUD = require('./postCRUD');
const apiComment = require('./comments-model');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.get('/get-all-posts', async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send({
    data: allPosts
  })
});

app.get('/posts', async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send({
    data: allPosts
  })
});


app.get('/get-detail-post', async (req, res) => {
  const foundPost = await postCRUD.getPost(1);
  res.send({
    data: foundPost
  })
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const foundPost = await postCRUD.getPost(String(id));
  res.send({
    data: foundPost
  })
});


app.get('/create-post', async (req, res) => {
  const dataPost = {
    imageUrl: 'example.jpg',
    title: 'example',
    description: 'example',
    createdBy: 'example@gmail.com'
  }
  const newPost = await postCRUD.createPost(dataPost);
  res.send({
    data: newPost
  })
});

app.post('/posts', async (req, res) => {
  const dataPost = req.body;

  const newPost = await postCRUD.createPost(dataPost);
  res.send({
    data: newPost
  })
});

app.get('/update-post', async (req, res) => {
  const dataUpdate = {
    imageUrl: 'example.jpg',
    title: 'example 2',
  }
  const updatePost = await 
    postCRUD
    .updatePost(
      '6d25bf80-3b22-11ec-ab45-c9665b6edad7', dataUpdate);
  res.send({
    data: updatePost
  })
});

app.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const dataUpdate = req.body;
  const updatePost = await postCRUD.updatePost(postId, dataUpdate);

  res.send({
    data: updatePost
  })
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const deleteStatus = await postCRUD.deletePost(id);
  res.send({
    data: deleteStatus
  })
});

app.get('/', (req, res)=> {
  res.sendFile(path.resolve(__dirname,'public/index.html'))
})

app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const comments = await apiComment.getComment(id);
  res.send({
    data: comments
  })
})

app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const deleteStatus = await apiComment.deleteComment(id);
  res.send({
    data: deleteStatus
  })
});

app.post('/posts', async (req, res) => {
  const dataComment = req.body;

  const newComment = await apiComment.createComment(dataComment);
  res.send({
    data: newComment
  })
});


app.listen(9000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server running on port 9000');
})