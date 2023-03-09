export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: string;
  AWSDateTime: string;
  AWSEmail: string;
  AWSIPAddress: string;
  AWSJSON: string;
  AWSPhone: string;
  AWSTime: string;
  AWSTimestamp: number;
  AWSURL: string;
};

export type Author = {
  __typename?: 'Author';
  createdAt: Scalars['AWSDateTime'];
  email: Scalars['AWSEmail'];
  name: Scalars['ID'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['AWSDateTime'];
};

export type AuthorsResult = {
  __typename?: 'AuthorsResult';
  items: Array<Author>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  updatedAt: Scalars['AWSDateTime'];
};

export type CreateAuthorInput = {
  email: Scalars['AWSEmail'];
  name: Scalars['ID'];
};

export type CreateCommentInput = {
  message: Scalars['String'];
  postId: Scalars['String'];
};

export type CreatePostInput = {
  authorName: Scalars['String'];
  content: Scalars['String'];
  publishDate?: InputMaybe<Scalars['AWSDate']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createComment: Comment;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  updatePost: Post;
};


export type MutationCreateAuthorArgs = {
  author: CreateAuthorInput;
};


export type MutationCreateCommentArgs = {
  comment: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  post: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  author: Author;
  authorName: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String'];
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['ID'];
  publishDate: Scalars['AWSDate'];
  title: Scalars['String'];
  updatedAt: Scalars['AWSDateTime'];
};

export type PostsResult = {
  __typename?: 'PostsResult';
  items: Array<Post>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: PostsResult;
  getAuthor?: Maybe<Author>;
  getAuthors: AuthorsResult;
  getPost: Post;
  getPosts: PostsResult;
};


export type QueryGetAuthorArgs = {
  name: Scalars['ID'];
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetPostsArgs = {
  author: Scalars['ID'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  publishDate?: InputMaybe<Scalars['AWSDate']>;
  title?: InputMaybe<Scalars['String']>;
};
