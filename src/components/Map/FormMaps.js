import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
  } from 'react-google-maps';
import { Card, CardBody } from 'reactstrap';

  const FormMaps = withScriptjs(
    withGoogleMap(props => {
        return (
            <GoogleMap
              defaultZoom={8}
              center={{
                lat: parseFloat(props.center.latitude),
                lng: parseFloat(props.center.longitude),
              }}
              defaultCenter={{
                lat: parseFloat(props.center.latitude),
                lng: parseFloat(props.center.longitude),
              }}
              onClick={props.onClick}
            >
              {props.positions.map((item, i) => (
                <Marker
                  //icon={markerImg}
                  key={i}
                  position={{
                    lat: parseFloat(item.latitude),
                    lng: parseFloat(item.longitude),
                  }}
                  onMouseOver={() => {
                    const findIndex = props.items.findIndex(el => el.id === item.id);
                    // console.log(findIndex)
                    props.setPosition(findIndex);
                    // props.setCenter({
                    //   latitude: parseFloat(item.latitude),
                    //   longitude: parseFloat(item.longitude),
                    // });
                  }}
                  onMouseOut={() => props.setPosition(-1)}
                >
                  {props.position === i && (
                    <InfoWindow>
                        <label className="font-weight-bold">{item.place}</label>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          );
    })
  );

  export default FormMaps