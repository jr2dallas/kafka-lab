import { execSync } from 'node:child_process';

execSync(
  [
    'npx @openapitools/openapi-generator-cli generate',
    '-i ./openapi/api.yaml',
    '-g typescript-axios',
    '-o ./src/api/generated',
    '--additional-properties=supportsES6=true,useSingleRequestParameter=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=model'
  ].join(' '),
  { stdio: 'inherit' }
);
