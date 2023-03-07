import { Context as AppSyncContext } from '@aws-appsync/utils';

export type Context<Args = any, Source = any> = Omit<
  AppSyncContext,
  'args' | 'arguments' | 'source'
> & {
  args: Args;
  arguments: Args;
  source: Source;
};

export interface IPost {
  title: string;
  content: string;
}

export interface IUpdatePost extends IPost {
  id: string;
}

export interface IGetPostInput {
  id: string;
}

export interface ICreatePostInput {
  post: IPost;
}

export interface IUpdatePostInput {
  post: IUpdatePost;
}
