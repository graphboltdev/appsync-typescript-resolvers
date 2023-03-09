import { Context as AppSyncContext } from '@aws-appsync/utils';

export type Context<Args = any, Source = any> = Omit<
  AppSyncContext,
  'args' | 'arguments' | 'source'
> & {
  args: Args;
  arguments: Args;
  source: Source;
};
