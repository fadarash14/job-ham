import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
//@ts-ignore
import {
  MapContainer as Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L, { LatLng } from "leaflet";
import AdsUploadContext from "../addWizard/AdsUploadContext";
import "leaflet/dist/leaflet.css";

export default function MapReseller({ ...props }) {
  const { lat, long, setLat, setLong } = useContext(AdsUploadContext);
  const refMarker = useRef(null);
  const L = require("leaflet");
  const center: LatLng | [number, number] = lat
    ? [lat, long]
    : !!props.lat
    ? [props.lat, props.long]
    : [35.689198, 51.388973];
  const [position, setPosition] = useState<LatLng | [number, number]>(center);

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        setPosition(e.target.getLatLng());
        setLat(String(e.target.getLatLng().lat));
        setLong(String(e.target.getLatLng().lng));
      },
    }),
    []
  );
  return (
    <>
      <Map
        center={center}
        zoom={13}
        id="leaflet-map"
        style={{ height: "100%", borderRadius: "12px", width: "100%" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        return (item.lat !== 0) &&
        <Marker
          icon={L.icon({
            iconUrl: "../../../../icons/map.png",
            iconSize: [30, 30],
          })}
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={refMarker}
        ></Marker>
      </Map>
    </>
  );
}
