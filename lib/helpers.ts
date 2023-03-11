import { Code } from 'aws-cdk-lib/aws-appsync';
import * as esbuild from 'esbuild';

export const bundleAppSyncResolver = (entryPoint: string): Code => {
  const result = esbuild.buildSync({
    entryPoints: [entryPoint],
    external: ['@aws-appsync/utils'],
    bundle: true,
    write: false,
    format: 'esm',
    target: 'es2020',
  });

  return Code.fromInline(result.outputFiles[0].text);
};
