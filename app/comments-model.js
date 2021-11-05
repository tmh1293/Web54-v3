const fs = require('fs');
const uuid = require('uuid');

const createComment = async (content) => {
    try {
      const jsonComments = await fs.promises.readFile('comments.json', { encoding: 'utf-8'});
      const comment = JSON.parse(jsonComments);
  
      const newComment = {
        id: uuid.v1(),
        ...content
      }
  
      const allData = [...comment, newComment];
      await fs.promises.writeFile(
        'comments-model.json', 
        JSON.stringify(allData)
      );
  
      return newComment;
    } catch (err) {
      console.log(err);
      return null;
    }
}

const deleteComment = async (id) => {
    try {
        const jsonComments = await fs.promises.readFile('comments.json', { encoding: 'utf-8'});
        const comments = JSON.parse(jsonComments);
    
        const newComments = comments.filter(comment => comment.id !== id);
        await fs.promises.writeFile(
          'posts.json', 
          JSON.stringify(newComments)
        );
        
        return true;
    
      } catch (err) {
        console.log(err);
        return false;
      }
}
//load comment theo bài posts
const getComment = async (id) => {
    try {
      const jsonComments = await fs.promises.readFile('comments.json', { encoding: 'utf-8'});
      const comments = JSON.parse(jsonComments);
  
      const foundComment = comments.filter(comment => comment.postId === id);
  
      return foundComment ? foundComment : null;
    } catch (err) {
      console.log(err);
      return null;
    }
}

module.exports = { 
    createComment,
    deleteComment,
    getComment,
}
