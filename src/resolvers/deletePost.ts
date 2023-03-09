import { DynamoDBDeleteItemRequest, util } from '@aws-appsync/utils';
import { MutationDeletePostArgs } from '../types/appsync';
import { Context } from '../types/types';

export function request(
  ctx: Context<MutationDeletePostArgs>,
): DynamoDBDeleteItemRequest {
  return {
    operation: 'DeleteItem',
    key: {
      id: util.dynamodb.toDynamoDB(ctx.args.id),
    },
  };
}

export function response(ctx: Context<MutationDeletePostArgs>) {
  return ctx.result;
}
