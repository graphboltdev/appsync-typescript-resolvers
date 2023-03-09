import { DynamoDBGetItem, util } from '@aws-appsync/utils';
import { QueryGetPostArgs } from '../types/appsync';
import { Context } from '../types/types';

export function request(ctx: Context<QueryGetPostArgs>): DynamoDBGetItem {
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
