import fetch from 'node-fetch';
import * as writeYamlFile from 'write-yaml-file';
import openapiTS from 'openapi-typescript';
import * as fs from 'fs';
import prettier from 'prettier';

async function downloadJson(): Promise<void> {
  const result = fetch(
    'https://studio-ws.apicur.io/sharing/a3f1a4a5-21ba-447d-849d-f6babb881956?content=true'
  );

  result
    .then((res) => res.json())
    .then((json) => {
      writeYamlFile('api.yaml', json);
    })
    .then(() => {
      openapiTS('api.yaml').then((res) => {
        fs.writeFile('./src/interface/api.ts', res, (err) => {
          if (err) {
            console.log('Error, please try again');
          }
        });
      });
    });
}

downloadJson();
