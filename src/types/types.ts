import { Context as AppSyncContext } from '@aws-appsync/utils';

export type Context<
  TArgs extends Record<string, unknown> | unknown = any,
  TStash extends Record<string, unknown> = {},
  TPrev extends Record<string, unknown> | undefined = any,
  TSource extends Record<string, unknown> | undefined = any,
  TResult = any,
> = Omit<
  AppSyncContext,
  'args' | 'arguments' | 'source' | 'stash' | 'prev' | 'result'
> & {
  args: TArgs;
  arguments: TArgs;
  stash: TStash;
  prev: TPrev;
  source: TSource;
  result: TResult;
};
