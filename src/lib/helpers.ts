import {
  DynamoDBExpression,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  util,
} from '@aws-appsync/utils';

export type CreateItem<T> = T & {
  updatedAt: string;
  createdAt: string;
};

export function createItem<T extends object>(item: T): CreateItem<T> {
  return {
    ...item,
    createdAt: util.time.nowISO8601(),
    updatedAt: util.time.nowISO8601(),
  };
}

export type UpdateItem<T> = T & {
  updatedAt: string;
};

export function updateItem<T extends object>(item: T): UpdateItem<T> {
  return {
    ...item,
    updatedAt: util.time.nowISO8601(),
  };
}

export function generateUpdateExpressions(
  item: Record<string, unknown>,
): DynamoDBExpression {
  const updateItem = {
    ...item,
    updatedAt: util.time.nowISO8601(),
  };

  const updateExpression: string[] = [];
  const expressionNames: ExpressionAttributeNameMap = {};
  const expressionValues: ExpressionAttributeValueMap = {};

  for (const [key, value] of Object.entries(updateItem)) {
    updateExpression.push(`#${key} = :${key}`);
    expressionNames[`#${key}`] = key;
    expressionValues[`:${key}`] = util.dynamodb.toDynamoDB(value);
  }

  return {
    expression: `set ${updateExpression.join(', ')}`,
    expressionNames,
    expressionValues,
  };
}
