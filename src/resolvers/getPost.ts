import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';
import { Post, QueryGetPostArgs } from '../types/appsync';

export function request(
  ctx: Context<QueryGetPostArgs>,
): DynamoDBGetItemRequest {
  console.log('ctx.args.id', ctx.args.id);

  return {
    operation: 'GetItem',
    key: {
      id: util.dynamodb.toDynamoDB(ctx.args.id),
    },
  };
}

export function response(
  ctx: Context<QueryGetPostArgs, object, object, object, Post>,
) {
  return ctx.result;
}
