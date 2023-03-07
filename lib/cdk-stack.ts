import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'typescript-resolvers-demo',
      schema: appsync.SchemaFile.fromAsset('schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
    });

    const demoTable = new dynamodb.Table(this, 'PostTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    const demoDS = api.addDynamoDbDataSource('postDataSource', demoTable);

    const defaultPipelineCode = appsync.Code.fromInline(`
    // The before step
    export function request(...args) {
      return {}
    }

    // The after step
    export function response(ctx) {
      return ctx.prev.result
    }
  `);

    // create post
    const getPost = new appsync.AppsyncFunction(this, 'GetPost', {
      name: 'getPost',
      api,
      dataSource: demoDS,
      code: appsync.Code.fromAsset('build/getPost.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    new appsync.Resolver(this, 'GetPostResolver', {
      api,
      typeName: 'Query',
      fieldName: 'getPost',
      code: defaultPipelineCode,
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getPost],
    });

    // create post
    const createPost = new appsync.AppsyncFunction(this, 'CreatePost', {
      name: 'createPost',
      api,
      dataSource: demoDS,
      code: appsync.Code.fromAsset('build/createPost.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    new appsync.Resolver(this, 'CreatePostResolver', {
      api,
      typeName: 'Mutation',
      fieldName: 'createPost',
      code: defaultPipelineCode,
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [createPost],
    });

    // update post
    const updatePost = new appsync.AppsyncFunction(this, 'UpdatePost', {
      name: 'updatePost',
      api,
      dataSource: demoDS,
      code: appsync.Code.fromAsset('build/updatePost.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    new appsync.Resolver(this, 'PipelineResolver', {
      api,
      typeName: 'Mutation',
      fieldName: 'updatePost',
      code: defaultPipelineCode,
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [updatePost],
    });
  }
}
