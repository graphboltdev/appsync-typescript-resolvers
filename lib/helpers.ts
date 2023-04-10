import { Code } from 'aws-cdk-lib/aws-appsync';
import * as esbuild from 'esbuild';

export const bundleAppSyncResolver = (entryPoint: string): Code => {
  const result = esbuild.buildSync({
    entryPoints: [entryPoint],
    external: ['@aws-appsync/utils'],
    bundle: true,
    write: false,
    platform: 'node',
    target: 'esnext',
    format: 'esm',
    sourcemap: 'inline',
    sourcesContent: false,
  });

  return Code.fromInline(result.outputFiles[0].text);
};
