import type { CommentPropsInterface, PostPropsInterface } from "./protocols.js";

export class Post {
  private constructor(private props: PostPropsInterface) {}

  static create(props: PostPropsInterface) {
    if (!props.id) {
      throw new Error("Post must have an id");
    }
    if (!props.authorId) {
      throw new Error("Post must have an authorId");
    }
    if (!props.content || props.content.length === 0) {
      throw new Error("Post content cannot be empty");
    }
    if (!props.createdAt) {
      throw new Error("Post must have a creation date");
    }
    return new Post({
      ...props,
      likes: props.likes || [],
      comments: props.comments || [],
    });
  }

  addComment(commentProps: CommentPropsInterface) {
    if (!commentProps.id) {
      throw new Error("Comment must have an id");
    }
    if (!commentProps.postId) {
      throw new Error("Comment must have a postId");
    }
    if (!commentProps.authorId) {
      throw new Error("Comment must have an authorId");
    }
    if (!commentProps.content || commentProps.content.length === 0) {
      throw new Error("Comment content cannot be empty");
    }
    if (!commentProps.createdAt) {
      throw new Error("Comment must have a creation date");
    }
    this.props.comments.push(commentProps);
    return commentProps;
  }

  deleteComment(commentId: string, userId: string) {
    const postHasThisComment = this.props.comments.filter(
      (comment) => comment.id === commentId
    );
    if (postHasThisComment.length === 0) {
      throw new Error("Comment not found in this post");
    }
    if (postHasThisComment[0]?.authorId !== userId) {
      throw new Error("You can only delete your own comments");
    }
    this.props.comments = this.props.comments.filter(
      (comment) => comment.id !== commentId
    );
  }

  addLikePost(userId: string) {
    if (!userId) {
      throw new Error("User id is required to like a post");
    }
    const userAlreadyLiked = this.props.likes.filter(
      (like) => like.authorId === userId
    );
    if (userAlreadyLiked.length > 0) {
      throw new Error("You have already liked this post");
    }
    const newLike = {
      id: crypto.randomUUID(),
      authorId: userId,
      postId: this.props.id,
      createdAt: new Date(),
    };
    this.props.likes.push(newLike);
    return newLike;
  }

  removeLikePost(userId: string) {
    if (!userId) {
      throw new Error("User id is required to unlike a post");
    }
    const userAlreadyLiked = this.props.likes.filter(
      (like) => like.authorId === userId
    );
    if (userAlreadyLiked.length === 0) {
      throw new Error("You have not liked this post");
    }
    this.props.likes = this.props.likes.filter(
      (like) => like.authorId !== userId
    );
  }

  addLikeComment(userId: string, commentId: string) {
    if (!userId) {
      throw new Error("User id is required to like a comment");
    }
    if (!commentId) {
      throw new Error("Comment id is required to like a comment");
    }
    const comment = this.props.comments.find(
      (comment) => comment.id === commentId
    );
    if (!comment) {
      throw new Error("Comment not found in this post");
    }
    const userAlreadyLiked = comment.likes.find(
      (like) => like.authorId === userId
    );
    if (userAlreadyLiked) {
      throw new Error("You have already liked this comment");
    }
    const newLike = {
      id: crypto.randomUUID(),
      authorId: userId,
      commentId: comment.id,
      createdAt: new Date(),
    };
    comment.likes.push(newLike);
    return newLike;
  }

  removeLikeComment(userId: string, commentId: string) {
    if (!userId) {
      throw new Error("User id is required to unlike a comment");
    }
    if (!commentId) {
      throw new Error("Comment Id is required to unlike a comment");
    }
    const comment = this.props.comments.find((comment) => {
      return comment.id === commentId;
    });
    if (!comment) {
      throw new Error("Comment not found");
    }
    const userLikedThisComment = comment.likes.find((like) => {
      return like.authorId === userId;
    });
    if (!userLikedThisComment) {
      throw new Error("You have not liked this comment");
    }
    comment.likes = comment.likes.filter((like) => like.authorId !== userId);
    return userLikedThisComment;
  }

  getAllComments() {
    return [...this.props.comments];
  }

  getAllLikesInPost() {
    return [...this.props.likes];
  }

  getAllLikesInComment(commentId: string) {
    const comment = this.props.comments.find(
      (comment) => comment.id === commentId
    );
    if (!comment) {
      throw new Error("Comment not found");
    }
    return [...comment.likes];
  }
}
