import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
const parents: {
  [key: string]: any;
} = require("../../../dictionaries/parents.json");
const catIDs: {
  [key: string]: any;
} = require("../../../dictionaries/withId.json");
import useUrlMaker from "../../../hooks/useUrlMaker";
import useUrlValues from "../../../hooks/useUrlValues";
import { Category as CategoryType, Filter } from "../../../types";
import { search_keys_to_set_get } from "../../../utils/searchConfig";
import SideBarContext from "../context/SideBarContext";
import { log } from "util";
const filtersDictionary: {
  [key: string]: any;
} = require("../../../dictionaries/filters.json");

export default function CategoryBuilderSkeleton(
  Wrapper: FunctionComponent<
    PropsWithChildren<
      | {
          links: CategoryType[];
          active: number;
          current: number;
          bacToPrent: Function;
          onClickLayer: Function;
          onClickParent: Function;
          onClickLastLayer: Function;
        }
      | any
    >
  >
) {
  const MyComponent = (props: PropsWithChildren<any>) => {
    const [links, setLinks] = useState<CategoryType[]>([]);
    const [isActive, setActive] = useState(-1);
    const [, setSelectedCategory] = useUrlMaker();
    const values = useUrlValues([search_keys_to_set_get["category"]]);
    const [current, setCurrent] = useState<number>(0);
    const { setCurrentFilters } = useContext(SideBarContext);

    useEffect(() => {
      //@ts-ignore
      const initial_category = values?.category ? values.category?.id : 0;
      let current_cat = catIDs[initial_category.toString()];

      if (current_cat) {
        const sub = current_cat["subs"];

        if (sub.length === 0) {
          let address = current_cat["address"].toString().split(":");
          setCurrent(parseInt(address[address.length - 2]));
          setActive(initial_category);
        } else {
          setCurrent(parseInt(String(initial_category)));
        }
        if (setCurrentFilters) {
          //@ts-ignore
          let _selected_filter: string[] = [];
          if (initial_category !== 0) {
            catIDs[initial_category.toString()]["filters"]
              ?.sort((a: Filter, b: Filter) => {
                return a.ordernumber - b.ordernumber;
              })
              ?.map((ob: { filter_id: number }) => {
                if (
                  typeof filtersDictionary[String(ob.filter_id)] !== "undefined"
                )
                  _selected_filter.push(
                    filtersDictionary[String(ob.filter_id)]["key"]
                  );
              });
            setCurrentFilters(_selected_filter);
          } else {
            setCurrentFilters([]);
          }
        }
      } else {
        if (setCurrentFilters) {
          setCurrentFilters([]);
        }
      }
    }, [values, setCurrentFilters]);

    useEffect(() => {
      let links = [];
      //
      if (current !== 0) {
        /*find category address to parents and child to build links*/

        const category_address = catIDs[current.toString()]["address"];
        let sliced = category_address.toString().split(":");
        for (let i = sliced.length - 1; i >= 1; i--) {
          links.push(catIDs[sliced[i]]);
        }
        //  ;
      }
      setLinks(links);
      /*find category address to parents and child to build links*/
    }, [current]);

    useEffect(() => {
      /*find set active category in search url*/
      //@ts-ignore
      if (isActive !== -1 && isActive !== values?.category?.id) {
        if (catIDs[isActive.toString()]) {
          setSelectedCategory({
            [search_keys_to_set_get["category"]]: catIDs[isActive.toString()],
          });
        } else if (isActive === 0) {
          setSelectedCategory({ [search_keys_to_set_get["category"]]: null });
        }
      }
    }, [isActive]);

    function onClickParent(cat: CategoryType) {
      setCurrent(cat.id);
      setActive(cat.id);
    }

    function onClickLayer(n: number) {
      setCurrent(links[n].id);
      setActive(links[n].id);
    }

    function onClickLastLayer(s: CategoryType) {
      s.subs.length > 0 ? setCurrent(s.id) : void 0;
      setActive(s.id);
    }

    function bacToPrent() {
      setCurrent(0);
      setActive(0);
    }

    return (
      <Wrapper
        links={links}
        current={current}
        active={isActive}
        bacToPrent={bacToPrent}
        onClickLayer={onClickLayer}
        onClickParent={onClickParent}
        onClickLastLayer={onClickLastLayer}
        {...props}
      />
    );
  };
  return MyComponent;
}
