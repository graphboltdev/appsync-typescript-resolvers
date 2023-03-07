import { DynamoDBUpdateItemRequest, util } from '@aws-appsync/utils';
import { generateUpdateExpressions } from '../lib/helpers';
import { Context, IUpdatePostInput } from '../types';

export function request(
  ctx: Context<IUpdatePostInput>,
): DynamoDBUpdateItemRequest {
  const { id, ...post } = ctx.args.post;

  return {
    operation: 'UpdateItem',
    key: {
      id: util.dynamodb.toDynamoDB(id),
    },
    update: generateUpdateExpressions(post),
    condition: {
      expression: 'attribute_exists(#id)',
      expressionNames: {
        '#id': 'id',
      },
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
