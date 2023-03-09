import { DynamoDBQueryRequest, util } from '@aws-appsync/utils';
import { QueryGetPostArgs, QueryGetPostsArgs } from '../types/appsync';
import { Context } from '../types/types';

export function request(ctx: Context<QueryGetPostsArgs>): DynamoDBQueryRequest {
  return {
    operation: 'Query',
    index: 'byAuthor',
    query: {
      expression: '#authorName = :authorName',
      expressionNames: {
        '#authorName': 'authorName',
      },
      expressionValues: {
        ':authorName': util.dynamodb.toDynamoDB(ctx.args.author),
      },
    },
    scanIndexForward: false,
  };
}

export function response(ctx: Context<QueryGetPostArgs>) {
  return ctx.result;
}
