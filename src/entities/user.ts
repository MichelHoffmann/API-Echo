import type { PostPropsInterface, UserPropsInterface } from "./protocols.js";

export class User {
  private constructor(readonly props: UserPropsInterface) {}

  static create(props: UserPropsInterface) {
    if (!props.id) {
      throw new Error("User must have an id");
    }
    if (!props.name || props.name.length < 3) {
      throw new Error("User name must be at least 3 characters long");
    }
    if (!props.email || !props.email.includes("@")) {
      throw new Error("Invalid email address");
    }
    if (!props.password || props.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    const newUser = {
      ...props,
      posts: [],
      friendIds: [],
    };
    return new User(newUser);
  }

  storePost(postProps: PostPropsInterface) {
    if (!postProps.id) {
      throw new Error("Post must have an id");
    }
    if (!postProps.authorId) {
      throw new Error("Post must have an authorId");
    }
    if (this.props.id !== postProps.authorId) {
      throw new Error("You can only update your own posts");
    }
    if (!postProps.content || postProps.content.length <= 1) {
      throw new Error("Post content cannot be empty");
    }
    if (!postProps.createdAt) {
      throw new Error("Post must have a creation date");
    }
    this.props.posts?.push(postProps);
  }

  deletePost(postId: string) {
    if (!postId) {
      throw new Error("Post id is required");
    }
    const post = this.props.posts?.find((post) => post.id === postId);
    if (!post) {
      throw new Error("This post doesn't exist");
    }
    if (this.props.id !== post.authorId) {
      throw new Error("You can only delete your own posts");
    }
    this.props.posts! = this.props.posts!.filter((post) => post.id !== postId);
  }

  getAllPosts() {
    return [...this.props.posts!];
  }

  addFriend(friendId: string) {
    if (!friendId) {
      throw new Error("Friend id is required");
    }
    const isAlreadyFriend = this.props.friendIds?.includes(friendId);
    if (isAlreadyFriend) {
      throw new Error("This user is already your friend");
    }
    this.props.friendIds!.push(friendId);
  }

  removeFriend(friendId: string) {
    if (!friendId) {
      throw new Error("Friend id is required");
    }
    const isFriend = this.props.friendIds!.includes(friendId);
    if (!isFriend) {
      throw new Error("This user is not your friend");
    }
    this.props.friendIds = this.props.friendIds!.filter((id) => id !== friendId);
  }
}
