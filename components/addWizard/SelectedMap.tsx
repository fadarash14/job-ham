import React, { useState, useRef, useEffect, useCallback } from "react";
//@ts-ignore
import {
  MapContainer as Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import { object, string } from "prop-types";
// import L from "leaflet";

export default function SelectedMap(props: { lat: number; long: number }) {
  const refMarker = useRef(null);
  const L = require("leaflet");

  // I did not checked that this component is working properly or not

  return (
    <Map
      className={"map"}
      center={[props.lat, props.long]}
      zoom={15}
      id="leaflet-map"
      style={{ height: "100%", borderRadius: "12px", width: "100%" }}
      //@ts-ignore
      onMove={(e: any) => e.stopPropagation()}
    >
      <TileLayer
        //@ts-ignore
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        //@ts-ignore
        icon={L.icon({
          iconUrl: "../../../../icons/map.png",
          iconSize: [30, 30],
        })}
        position={[props.lat, props.long]}
        ref={refMarker}
      ></Marker>
    </Map>
  );
}
