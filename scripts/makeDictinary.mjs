import fetch from "node-fetch";
import { writeFile } from "fs";
// const { object } = require("prop-types");

const apiUrl = "https://deltajob.rahnama.com/jobgql";

function list(key, val, array, f = null) {
  // alert('list')
  if (typeof array === "undefined") {
    return {};
  }
  let ls = {};
  if (Array.isArray(val)) {
    array.forEach((el, index) => {
      let v = {};

      val.map((i) => {
        v = { ...v, [i]: el[i] };
      });
      let k = el[key] ? el[key] : f ? el[f] : "null";
      ls = { ...ls, [k]: v };
    });
  } else {
    array.forEach((el, index) => {
      let k = el[key] ? el[key] : f ? el[f] : "null";

      ls = { ...ls, [k.replace(/(\r\n|\n|\r)/gm, "")]: el[val] };
    });
  }
  return ls;
}

const treeify = (arr, pid = "parent_id") => {
  if (arr == null || !Array.isArray(arr)) return [];
  const tree = [];
  const parents = [];
  const lookup = {};

  arr.forEach((o) => {
    lookup[o.id] = o;
    lookup[o.id].subs = [];
    lookup[o.id].address = o[pid] + ":" + o.id;
  });

  arr.forEach((o) => {
    if (o[pid]) {
      try {
        o["address"] =
          lookup[String(o[pid])] &&
          lookup[String(o[pid])]["address"] + ":" + o.id;
        if (lookup[o[pid]] != null) {
          lookup[o[pid]]["subs"].push({ ...o });
        }
      } catch (e) {
        console.log(o[pid], e);
      }
    } else {
      // console.log(o[pid])
      parents.push(o);
    }
    tree.push(o);
  });

  return [tree, parents, lookup];
};

const treeifyCity = (arr, pid = "parent_id") => {
  if (arr == null || !Array.isArray(arr)) return [];
  const tree = [];
  const lookup = {};
  arr.forEach((o) => {
    lookup[o.id] = o;
    lookup[o.id].children = [];
    lookup[o.id]["ostan"] = "";
  });

  arr.forEach((o) => {
    if (o[pid] !== 0) {
      if (lookup[o[pid]]) {
        lookup[o.id]["ostan"] = lookup[o[pid]]["slug"];
        lookup[o[pid]].children.push(o);
      }
    } else {
      tree.push(o);
    }
  });
  return [tree, lookup];
};

fetch(apiUrl, {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"operationName":null,"variables":{},"query":"{\\n  jobs {\\n    id\\n    title\\n     parent_id\\n  name\\n    metakeyword\\n    metadescription\\n      status\\n   address\\n layer\\n  ordernumber\\n   icon\\n  slug\\n has_child\\n  }\\n}\\n"}',
  method: "POST",
  mode: "cors",
})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (res.data) {
      const filteredJobs = res.data.jobs.filter((job) => job.status !== 2);
      const filteredData = {
        data: {
          jobs: filteredJobs,
        },
      };
      const rawData = JSON.stringify(filteredData);
      const categories = res.data.jobs;
      let [tree, parents, lookup] = treeify(categories);

      let c = list(
        "slug",
        [
          "id",
          "name",
          "title",
          "slug",
          "filters",
          "parent_id",
          "subs",
          "prefix",
          "metadescription",
          "metakeyword",
        ],
        tree,
        "name"
      );
      let category_with_name = {};
      Object.keys(c).map((_c) => {
        let val = c[_c];
        // console.log(_c)
        let key = _c.replace(/\s/g, "-");
        category_with_name[key] = val;
      });

      tree.map((category) => {
        let parents_ids = category.address.split(":");
        let parents_array_string = [];
        parents_ids
          .filter((i) => i != 0)
          .slice(0, parents_ids.length - 1)
          .map((parentId) => {
            parents_array_string.push(lookup[parentId]?.["name"]);
          });
        category["parentString"] = parents_array_string;
        if (category["slug"] == null) {
          category["slug"] = category["name"];
        }
      });

      let with_id = list(
        "id",
        [
          "id",
          "name",
          "slug",
          "filters",
          "address",
          "subs",
          "title",
          "parent_id",
          "prefix",
          "parentString",
        ],
        tree
      );

      let p = list(
        "id",
        ["id", "name", "slug", "filters", "address", "subs", "title", "prefix"],
        parents
      );
      writeFile(
        "../dictionaries/category.json",
        JSON.stringify(category_with_name),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
      writeFile(
        "../dictionaries/jobsRawData.json",
        rawData,
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
      writeFile(
        "../dictionaries/parents.json",
        JSON.stringify(p),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
      writeFile(
        "../dictionaries/withId.json",
        JSON.stringify(with_id),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
    }
  })
  .catch((e) => {
    console.log(e);
  });

fetch(apiUrl, {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
  },

  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"operationName":null,"variables":{},"query":"{\\n  filters {\\n    id\\n    label\\n        filter_id\\n    type\\n        key\\n    label\\n         is_required\\n               unit\\n        ordernumber\\n             is_header\\n        validation\\n    placeholder\\n    options {\\n      name\\n      option_id\\n      id\\n          value\\n    }\\n    key\\n    help\\n  }\\n}\\n"}',
  method: "POST",
  mode: "cors",
})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (res.data) {
      const filters = res.data.filters;
      let map_id_key = list("id", ["key"], filters);
      let _original = list(
        "id",
        [
          "id",
          "label",
          "type",
          "placeholder",
          "filter_id",
          "options",
          "key",
          "help",
          "ordernumber",
          "is_header",
          "is_required",
          "validation",
          "unit",
        ],
        filters
      );
      let filter_options_list = {};
      let filter_by_id = filters.map((fil) => {
        let _f = { ...fil };
        _f["filter_id"] = map_id_key[fil["filter_id"]]
          ? map_id_key[fil["filter_id"]]["key"]
          : "all";
        return _f;
      });

      filters.map((filter) => {
        let opt_list = list(
          "name",
          ["name", "option_id", "id", "value"],
          filter["options"]
        );
        filter_options_list[filter["key"]] = opt_list;
      });

      let f = list(
        "id",
        [
          "id",
          "label",
          "type",
          "placeholder",
          "filter_id",
          "options",
          "key",
          "help",
          "ordernumber",
          "is_required",
          "validation",
          "unit",
        ],
        filter_by_id
      );
      let changed_filter_id = filters.map((fil) => {
        let _f = { ...fil };
        _f["filter_id"] = f[fil["filter_id"]]
          ? f[fil["filter_id"]]["key"]
          : "all";
        return _f;
      });
      let f_by_k = list(
        "key",
        [
          "id",
          "label",
          "type",
          "placeholder",
          "filter_id",
          "options",
          "key",
          "help",
          "ordernumber",
          "is_required",
          "validation",
          "unit",
        ],
        changed_filter_id
      );

      writeFile(
        "../dictionaries/filters.json",
        JSON.stringify(f),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
      writeFile(
        "../dictionaries/filters_key.json",
        JSON.stringify(f_by_k),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
      writeFile(
        "../dictionaries/original.json",
        JSON.stringify(_original),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );

      writeFile(
        "../dictionaries/filter_map_opt.json",
        JSON.stringify(filter_options_list),
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
    }
  })
  .catch((e) => {
    console.log(e);
  });

fetch(apiUrl, {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"operationName":null,"variables":{},"query":"{\\n  cities {\\n    id\\n           slug\\n       parent_id\\n    name\\n         lat\\n   long\\n        areas {\\n      name\\n      id\\n          lat\\n   long\\n    }\\n  }\\n}\\n"}',
  method: "POST",
  mode: "cors",
  credentials: "omit",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const data = response.data.cities
      .filter((city) => city.parent_id == 0)
      .map((city) => {
        return {
          id: city.id,
          title: city.name,
        };
      });
    let clonedArray = response.data.cities.map((a) => {
      return { ...a };
    });

    let [tree, lookup] = treeifyCity(clonedArray, "parent_id");
    let citiesByID = list(
      "id",
      ["id", "name", "areas", "lat", "long", "parent_id", "ostan"],
      Object.values(lookup)
    );

    let cities = list(
      "slug",
      ["id", "name", "areas", "lat", "long", "parent_id", "ostan"],
      Object.values(lookup)
    );

    let treefied_cities = {};

    Object.values(tree).map((province) => {
      province.children.map((city) => {
        let a = list("name", ["name", "id", "lat", "long"], city.areas);
        let _a = {};
        Object.keys(a).map((area_name) => {
          let _tmp = area_name.replace(/[\s\uFEFF\xA0]/g, "");
          let _area_name = _tmp.replace("-", "");
          _a[_area_name] = { ...a[area_name] };
        });
        city.areas = _a;
      });
      let cities = {};
      province.children.map((city) => {
        let { children, ..._c } = city;
        cities[city.slug] = _c;
      });
      province.cities = cities;
      delete province.children;
      treefied_cities[province.slug] = province;
    });

    Object.entries(cities).map(([key, { areas, ...all }]) => {
      if (areas) {
        let a = list("name", ["name", "id", "lat", "long"], areas);
        let _a = {};
        Object.keys(a).map((area_name) => {
          let _tmp = area_name.replace(/[\s\uFEFF\xA0]/g, "");
          let _area_name = _tmp.replace("-", "");
          _a[_area_name] = { ...a[area_name] };
        });
        cities[key] = { ...all, areas: _a };
      }
    });

    writeFile(
      "../dictionaries/city.json",
      JSON.stringify(cities),
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
    writeFile(
      "../dictionaries/filterCity.json",
      JSON.stringify(data),
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );

    Object.entries(citiesByID).map(([key, { areas }]) => {
      if (areas) {
        let a = list("id", ["name", "id", "lat", "long"], areas);
        citiesByID[key]["areas"] = a;
      }
    });
    writeFile(
      "../dictionaries/cityId.json",
      JSON.stringify(citiesByID),
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );

    writeFile(
      "../dictionaries/parent_city.json",
      JSON.stringify(treefied_cities),
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
  })
  .catch((e) => {
    console.log(e);
  });
fetch(apiUrl, {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"operationName":null,"variables":{},"query":"{\\n  salaries {\\n    id\\n    title\\n   }\\n ages {\\n    id\\n    title\\n     }\\n organizationPosts {\\n    id\\n    title\\n     }\\n  languages {\\n    id\\n    title\\n     }\\n          experiences {\\n    id\\n    title\\n     }\\n        fieldStudies {\\n    id\\n    title\\n     }\\n   grades {\\n    id\\n    title\\n     }\\n    skills {\\n    id\\n    title\\n     }\\n    militaryServices {\\n    id\\n    title\\n     }\\n   typeActivityCompanies {\\n    id\\n    title\\n     }\\n     typeOwnerShips {\\n    id\\n    title\\n     }\\n   sex {\\n    id\\n    title\\n     }\\n   typeCooperations {\\n    id\\n    title\\n     }\\n   levels {\\n    id\\n    title\\n     }\\n   skills {\\n    id\\n    title\\n     }\\n }\\n"}',
  method: "POST",
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const filters = response.data;
    writeFile(
      "../dictionaries/cv-filters.json",
      JSON.stringify(filters),
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
  })
  .catch((e) => {
    console.log(e);
  });
