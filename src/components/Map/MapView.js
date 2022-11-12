import FormMaps from "./FormMaps";

const MapView = ({
    positionsList,
    contanerHeight = `600px`,
    center,
    setCenter,
    position,
    setPosition,
    items,
}) => {
    return positionsList.length > 0 ? (
        <FormMaps
          items={items}
          center={center}
          setCenter={setCenter}
          positions={positionsList}
          position={position}
          setPosition={setPosition}
          isMarkerShown
          onClick={() => {}}
          onMarkerClick={null}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6jPmbF7m0sMTbGzqQg8ypu_TRmyzrJOg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: contanerHeight }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      ) : (
        <div className="jumbotron" style={{ height: 'auto' }}>
          <p className="lead text-center">No esta disponible el mapa</p>
        </div>
    );    
};

export default MapView