import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';
import { QueryGetPostArgs } from '../types/appsync';

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

export function response(ctx: Context<QueryGetPostArgs>) {
  return ctx.result;
}
