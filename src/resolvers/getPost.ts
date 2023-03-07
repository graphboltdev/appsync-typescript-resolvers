import { DynamoDBGetItem, util } from '@aws-appsync/utils';
import { Context, IGetPostInput } from '../types';

export function request(ctx: Context<IGetPostInput>): DynamoDBGetItem {
  return {
    operation: 'GetItem',
    key: {
      id: util.dynamodb.toDynamoDB(ctx.args.id),
    },
  };
}

export function response(ctx: Context) {
  ctx.stash.event = {
    detailType: 'postUpdated',
    detail: {
      id: ctx.result.id,
    },
  };
  return ctx.result;
}
