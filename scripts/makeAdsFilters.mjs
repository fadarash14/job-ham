import fetch from "node-fetch";
import path from "path";
import { writeFile, readFileSync } from "fs";

const simpleFilterPath = "../dictionaries/simple-filters.json";
const companyFilterPath = "../dictionaries/company-filters.json";

fetch("https://deltajob.rahnama.com/jobgql", {
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
  referrer: "https://deltajob.rahnama.com/jobgql",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"operationName":null,"variables":{},"query":"{\\n  advantages {\\n    id\\n    title\\n  } ages {\\n    id\\n    title\\n  }   experiences {\\n    id\\n    title\\n  }    fieldStudies {\\n    id\\n    title\\n  }   grades {\\n    id\\n    title\\n  }      industries {\\n    id\\n    title\\n  }    languages {\\n    id\\n    title\\n  }    organizationPosts {\\n    id\\n    title\\n  }      salaries {\\n    id\\n    title\\n  }   levels {\\n    id\\n    title\\n  }      skills {\\n    id\\n    title\\n  }     militaryServices {\\n    id\\n    title\\n  }    sizeCompanies {\\n    id\\n    title\\n  }   typeActivityCompanies {\\n    id\\n    title\\n  }     typeCooperations {\\n    id\\n    title\\n  }     typeOwnerShips {\\n    id\\n    title\\n  }    \\n}\\n"}',
  method: "POST",
  mode: "cors",
})
  .then((r) => {
    return r.text();
  })
  .then(async (body) => {
    let parsedBody = JSON.parse(body);
    let values = parsedBody?.data;
    let newSimpleFilters = {};
    let newCompanyFilters = {};
    try {
      // Read the JSON file synchronously
      const simpleFilterData = readFileSync(simpleFilterPath, "utf-8");
      const companyFilterData = readFileSync(companyFilterPath, "utf-8");
      // Parse the JSON content into a JavaScript object
      const jsonSimpleData = JSON.parse(simpleFilterData)?.filters;
      const jsonCompanyData = JSON.parse(companyFilterData)?.filters;
      newSimpleFilters.filters = jsonSimpleData.map((filter) => {
        const field = filter.field;
        if (field !== undefined && values[field] !== undefined) {
          filter.options = values[field];
        }
        return filter;
      });
      newCompanyFilters.filters = jsonCompanyData.map((filter) => {
        const field = filter.field;
        if (field !== undefined && values[field] !== undefined) {
          filter.options = values[field];
        }
        return filter;
      });
    } catch (error) {
      console.error("Error reading or parsing the JSON file:", error);
    }
    if (newSimpleFilters) {
      writeFile(
        "../dictionaries/simple-filters.json",
        JSON.stringify(newSimpleFilters),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
    }
    if (newCompanyFilters) {
      writeFile(
        "../dictionaries/company-filters.json",
        JSON.stringify(newCompanyFilters),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
    }
  });
