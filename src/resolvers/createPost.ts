import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { createItem } from '../lib/helpers';
import { MutationCreatePostArgs, Post } from '../types/appsync';

export function request(
  ctx: Context<MutationCreatePostArgs>,
): DynamoDBPutItemRequest {
  // add timestamps
  const item = createItem(ctx.args.post);

  return {
    operation: 'PutItem',
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: util.dynamodb.toMapValues({
      publishDate: util.time.nowISO8601(),
      ...item,
    }),
  };
}

export function response(
  ctx: Context<MutationCreatePostArgs, object, object, object, Post>,
) {
  return ctx.result;
}
