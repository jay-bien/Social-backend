import { createPost } from './create-post';
import { readPost, readPosts } from './read-post';
import { updatePost } from './update-post';
import { removePost } from './remove-post';


const postController = {
    createPost,
    readPost,
    readPosts,
    updatePost,
    removePost
}
export default postController;