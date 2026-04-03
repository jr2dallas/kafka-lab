import { execSync } from 'node:child_process';
import { existsSync, cpSync, mkdirSync } from 'node:fs';

const backendSpec = '../backend/src/main/resources/api.yml';
const fallbackSpec = '../backend/src/main/resources/api.yaml';
const source = existsSync(backendSpec) ? backendSpec : fallbackSpec;

if (!existsSync(source)) {
  throw new Error('OpenAPI contract not found. Expected ../backend/src/main/resources/api.yml or api.yaml');
}

mkdirSync('./openapi', { recursive: true });
cpSync(source, './openapi/api.yaml');

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
