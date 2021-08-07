import fetch from 'node-fetch';
import * as writeYamlFile from 'write-yaml-file';
import openapiTS, { SchemaObject } from 'openapi-typescript';
import * as fs from 'fs';

async function downloadJson(): Promise<void> {
  const result = fetch(
    'https://studio-ws.apicur.io/sharing/a3f1a4a5-21ba-447d-849d-f6babb881956?content=true'
  );

  result
    //Store the downloaded information as json
    .then((res) => res.json())
    //Write the json openapi as yaml
    .then((json) => {
      writeYamlFile('api.yaml', json);
    })
    //Convert OAS yaml to typescript interfaces
    .then(() => {
      return openapiTS('api.yaml', {
        formatter(node: SchemaObject) {
          if (node.format === 'date') {
            return 'Date';
          }
        },
        prettierConfig: '.prettierrc',
      });
    })
    //Save typescript interfaces as file
    .then((res) => {
      fs.writeFile('./src/interface/api.ts', res, (err) => {
        if (err) {
          console.log('Error, please try again');
        }
      });
    });
}

downloadJson();
