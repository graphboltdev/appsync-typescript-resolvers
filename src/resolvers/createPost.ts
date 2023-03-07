import { DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { createItem } from '../lib/helpers';
import { Context, ICreatePostInput, IPost } from '../types';

export function request(
  ctx: Context<ICreatePostInput>,
): DynamoDBPutItemRequest {
  // add timestamps
  const item = createItem<IPost>(ctx.args.post);

  return {
    operation: 'PutItem',
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: util.dynamodb.toMapValues(item),
  };
}

export function response(ctx: Context) {
  return ctx.result;
}
