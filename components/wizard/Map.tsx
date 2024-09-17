// import React, { useRef } from "react";
// import {
//   MapContainer as Map,
//   TileLayer,
//   Marker,
//   Popup,
//   Tooltip,
// } from "react-leaflet";
// const cityId: {
//   [key: string]: {
//     id: number;
//     name: string;
//     lat: number;
//     long: number;
//     areas: {
//       [key: string]: { id: number; name: string; lat: number; long: number };
//     };
//   };
// } = require("@/dictionaries/cityId.json");

// export default function MapReseller({ ...props }) {
//   const refMarker = useRef(null);
//   const L = require("leaflet");
//   let city = cityId[String(props.cityId)];
//   let area = city?.["areas"]?.[String(props.areaId)];

//   if (
//     (Boolean(props.pin) &&
//       props.pin !== "," &&
//       props.pin !== "undefined,undefined") ||
//     (props.lat && props.lng)
//   ) {
//     const LatLng = props.pin.split(",");
//     const lat = parseFloat(LatLng[0]);
//     const long = parseFloat(LatLng[1]);
//     return (
//       <Map
//         center={[lat, long]}
//         zoom={13}
//         id="leaflet-map"
//         style={{ height: "100%", borderRadius: "12px", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker
//           icon={L.icon({
//             iconUrl: "/icons/map.png",
//             iconSize: [30, 30],
//           })}
//           position={[lat, long]}
//           ref={refMarker}
//         ></Marker>
//       </Map>
//     );
//   } else {
//     if (city) {
//       if (
//         area &&
//         area !== undefined &&
//         area?.lat !== 0 &&
//         area?.lat !== null &&
//         area?.long !== 0 &&
//         area?.long !== null
//       ) {
//         return (
//           <Map
//             center={[area?.lat, area?.long]}
//             zoom={13}
//             id="leaflet-map"
//             style={{ height: "100%", borderRadius: "12px", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker
//               icon={L.icon({
//                 iconUrl: "/icons/map.png",
//                 iconSize: [30, 30],
//               })}
//               position={[area?.lat, area?.long]}
//               ref={refMarker}
//             >
//               <Tooltip offset={[0, 0]}>{area?.name}</Tooltip>
//             </Marker>
//           </Map>
//         );
//       } else {
//         return (
//           city.lat != 0 &&
//           city.lat != null &&
//           city.long != 0 &&
//           city.long != null && (
//             <Map
//               center={[city?.lat, city?.long]}
//               zoom={13}
//               id="leaflet-map"
//               style={{ height: "100%", borderRadius: "12px", width: "100%" }}
//             >
//               <TileLayer
//                 attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <Marker
//                 icon={L?.icon({
//                   iconUrl: "/icons/map.png",
//                   iconSize: [30, 30],
//                 })}
//                 position={[city?.lat, city?.long]}
//                 ref={refMarker}
//               >
//                 <Tooltip offset={[0, 0]}>{city?.name}</Tooltip>
//               </Marker>
//             </Map>
//           )
//         );
//       }
//     } else {
//       return (
//         <Map
//           center={[35.689198, 51.388973]}
//           zoom={13}
//           id="leaflet-map"
//           style={{ height: "100%", borderRadius: "12px", width: "100%" }}
//         >
//           <TileLayer
//             attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker
//             icon={L?.icon({
//               iconUrl: "../map.png",
//               iconSize: [30, 30],
//             })}
//             position={[35.689198, 51.388973]}
//             ref={refMarker}
//           >
//             <Tooltip offset={[0, 0]}>{"تهران"}</Tooltip>
//           </Marker>
//         </Map>
//       );
//     }
//   }
// }
import React, { useRef } from "react";
import { MapContainer as Map, TileLayer, Marker, Tooltip } from "react-leaflet";

const cityId = require("@/dictionaries/cityId.json");
const L = require("leaflet");

export default function MapReseller({ ...props }) {
  const refMarker = useRef(null);

  const getMapElement = (
    lat: number,
    long: number,
    iconUrl: string,
    name: string
  ) => (
    <Map
      center={[lat, long]}
      zoom={13}
      id="leaflet-map"
      style={{ height: "100%", borderRadius: "12px", width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={L.icon({
          iconUrl,
          iconSize: [30, 30],
        })}
        position={[lat, long]}
        ref={refMarker}
      >
        <Tooltip offset={[0, 0]}>{name}</Tooltip>
      </Marker>
    </Map>
  );

  if (
    (Boolean(props.pin) &&
      props.pin !== "," &&
      props.pin !== "undefined,undefined") ||
    (props.lat && props.lng)
  ) {
    const LatLng = props.pin.split(",");
    const lat = parseFloat(LatLng[0]);
    const long = parseFloat(LatLng[1]);
    return getMapElement(lat, long, "/icons/map.png", "");
  } else {
    let city = cityId[String(props.cityId)];
    let area = city?.["areas"]?.[String(props.areaId)];

    if (city) {
      if (
        area &&
        area !== undefined &&
        area?.lat !== 0 &&
        area?.lat !== null &&
        area?.long !== 0 &&
        area?.long !== null
      ) {
        return getMapElement(area.lat, area.long, "/icons/map.png", area.name);
      } else if (
        city.lat != 0 &&
        city.lat != null &&
        city.long != 0 &&
        city.long != null
      ) {
        return getMapElement(city.lat, city.long, "/icons/map.png", city.name);
      }
    }

    // Default map if no conditions are met
    return getMapElement(35.689198, 51.388973, "../map.png", "تهران");
  }
}
