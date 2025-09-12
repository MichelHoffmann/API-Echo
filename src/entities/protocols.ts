export interface UserPropsInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: PostPropsInterface[];
  friendIds: string[];
}

export interface PostPropsInterface {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: LikePropsInterface[];
  comments: CommentPropsInterface[];
}

export interface CommentPropsInterface {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: LikePropsInterface[];
}

export interface LikePropsInterface {
  id: string;
  authorId: string;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}
