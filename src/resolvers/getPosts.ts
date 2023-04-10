import { Context, DynamoDBQueryRequest, util } from '@aws-appsync/utils';
import {
  QueryGetPostArgs,
  QueryGetPostsArgs,
  PostsResult,
} from '../types/appsync';

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

export function response(
  ctx: Context<QueryGetPostArgs, object, object, object, PostsResult>,
) {
  return ctx.result;
}
