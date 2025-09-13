import type { Post } from "../entities/post.js";
import type { CommentPropsInterface } from "../entities/protocols.js";

export interface PostRepository {
  create(post: Post): Promise<Post>;

  addComment(comment: CommentPropsInterface, postId: string): Promise<void>;

  deleteComment(commentId: string, postId: string): Promise<void>;

  addLike(userId: string, postId: string): Promise<void>;

  removeLike(userId: string, postId: string): Promise<void>;

  addLikeComment(
    userId: string,
    commentId: string,
    postId: string
  ): Promise<void>;

  removeLikeComment(
    userId: string,
    commentId: string,
    postId: string
  ): Promise<void>;
}
