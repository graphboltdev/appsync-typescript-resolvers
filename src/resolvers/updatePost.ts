import { Context, DynamoDBUpdateItemRequest, util } from '@aws-appsync/utils';
import { generateUpdateExpressions, updateItem } from '../lib/helpers';
import { MutationUpdatePostArgs } from '../types/appsync';

export function request(
  ctx: Context<MutationUpdatePostArgs>,
): DynamoDBUpdateItemRequest {
  const { id, ...post } = ctx.args.post;
  const updatedPost = updateItem(post);

  return {
    operation: 'UpdateItem',
    key: {
      id: util.dynamodb.toDynamoDB(id),
    },
    update: generateUpdateExpressions(updatedPost),
    condition: {
      expression: 'attribute_exists(#id)',
      expressionNames: {
        '#id': 'id',
      },
    },
  };
}

export function response(ctx: Context<MutationUpdatePostArgs>) {
  return ctx.result;
}
