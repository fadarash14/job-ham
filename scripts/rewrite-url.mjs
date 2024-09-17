import fetch from "node-fetch";
import { writeFile } from "fs";
fetch("http://delta.rahnama.com:7643/rahnamagql", {
  headers: {
    __agent: "Chrome",
    __agent_v: "91.0.4472.101",
    __os: "Linux",
    __os_v: "x86_64",
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    map_code: "999-99901-2601",
  },
  referrer: "http://delta.rahnama.com:7643/rahnamagql",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"operationName":null,"variables":{},"query":"{\\n  redirecturls {\\n    source_url\\n    target_url\\n  }\\n}\\n"}',
  method: "POST",
  mode: "cors",
})
  .then((r) => {
    return r.text();
  })
  .then(async (body) => {
    let redirects = JSON.parse(body);
    let list = redirects?.data?.redirecturls;
    /*just not existing rules should list below*/
    if (list) {
      let list_url = {};
      list.map((obj) => {
        if (obj["target_url"] !== "") {
          let src = obj["source_url"].replace(/(https?:\/\/)?[^\/]*\//, "/");
          let target = obj["target_url"].replace(/(https?:\/\/)?[^\/]*\//, "/");
          list_url[src] = target;
        }
      });

      writeFile(
        "../dictionaries/rewrites.json",
        JSON.stringify(list_url),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
    }
  });
