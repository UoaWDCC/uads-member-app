import fetch from "node-fetch";
import * as writeYamlFile from "write-yaml-file";

async function downloadJson(): Promise<void> {
  const result = fetch(
    "https://studio-ws.apicur.io/sharing/a3f1a4a5-21ba-447d-849d-f6babb881956?content=true"
  );

  result
    .then((res) => res.json())
    .then((json) => {
      writeYamlFile.sync("api.yaml", json);
    });
}

downloadJson();
