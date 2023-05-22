import Map from "react-map-gl";

export const ManagementMap = () => {

    return (
        <Map
            mapboxAccessToken={"pk.eyJ1Ijoia29sb215YWthIiwiYSI6ImNsaHdmdWx4aTAycjYzbXBoMnV5bmgydmoifQ.Cxqs8slOAnvHNA2pWRTQYw"}
            initialViewState={{
                longitude: 37.618423,
                latitude: 55.751244,
                zoom: 14
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    );
};