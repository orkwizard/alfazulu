import { useState } from "react";
import { Alert, Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import { CONDOS_LIST, GET_DESTINOS_FILTER } from "../../../helpers/sunapi_url";
import useGetTokenSunApi from "../../../hooks/useGetTokenSunApi"
import SelectAjax from "../../common/SelectAjax";
import DatePicker from "react-datepicker";
import noImage from '../../../assets/images/no-image.png';
import moment from "moment";
import { formatNumber } from "../../../utils/Number/numberFormat";
import Pagination from 'rc-pagination';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/scss/pagination.scss"
import { getCadena } from "../../../utils/Filter/getCadena";
import { getPrecio } from "../../../utils/Filter/getPrecio";
import SimpleLoad from "../../Loader/SimpleLoad";
import { toast } from "react-toastify";
import { ERROR_SERVER } from "../../../constant/messages";
import MapView from "../../Map/MapView";
import CondominioDetalle from "./CondominioDetalle";


export default function CondominioCotizador(){
    const tokenSunApi = useGetTokenSunApi();
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [items, setItems] = useState([])
    const [itemsFilter, setItemsFilter] = useState([]);
    const [positions, setPositions] = useState([]);
    const [center, setCenter] = useState(null);
    const [position, setPosition] = useState(-1);
    const [destino, setDestino] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const [precioFilter, setPrecioFilter] = useState(true);
    const [nombreFilter, setNombreFilter] = useState('')
    const [minPrecio, setMinPrecio] = useState(0);
    const [maxPrecio, setMaxPrecio] = useState(100);
    const [rangePrecio, setRangePrecio] = useState({ min: 1, max: 100 });
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    const [errorDestino, setErrorDestino] = useState(false)
    const [errorFechas, setErrorFechas] = useState(false)

    //detalle de condo
    const [open, setOpen] = useState(false)
    const [condoDetalle, setCondoDetalle] = useState(null)

    const searchCondo = async (e) => {
        e.preventDefault();
        setItems([])
        setItemsFilter([])
        let hasError = false
        if(errorDestino || !destino){
            hasError = true;
            setErrorDestino(true)
        }
        if(errorFechas || !startDate || !endDate){
            hasError=true;
            setErrorFechas(true)
        }

        if(!hasError){
            setIsSubmiting(true)
            const appiVersion = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}`;
            const globalizador = `${process.env.REACT_APP_SUNAPI_APINAMECONDOS}`;
            const urlService = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${appiVersion}${CONDOS_LIST}?sources=${globalizador}`;
    
            const data = {
                destiny: destino.value,
                checkIn: moment(startDate).startOf('month').format('DD-MM-YYYY'),
                checkOut: moment(endDate).endOf('month').format('DD-MM-YYYY'),
                currency: 'USD',
                language: 'CAS',
                rooms: [
                    {
                    adults: 1,
                    children: {
                        ages: [],
                    },
                    },
                ],
            }
           // console.log(data)
    
    
            try {
                const response = await fetch(urlService, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenSunApi}`,
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const condosData = await response.json()
                //console.log(condosData)
                
                const condos = condosData.hotels
                const newCondos = [];
    
                // Recorre la lista de los condominios para dejar solo los no repetidos
                // eslint-disable-next-line array-callback-return
                condos.map(condo => {
                    const ar = newCondos.filter(c => c.id === condo.id);
                    if (ar.length === 0) newCondos.push(condo);
                });
    
                // Determinar si filtramos por ranking
                //if (data.f_stars != null && data.f_stars.length > 0) setStarFilter(true);
                // Determinar si filtramos por precio
                if (condosData.minPrice === condosData.maxPrice) setPrecioFilter(false);
    
                setItems(newCondos)
                setItemsFilter(newCondos);
                setMinPrecio(condosData.minPrice);
                setMaxPrecio(condosData.maxPrice);
                setRangePrecio({ min: condosData.minPrice, max: condosData.maxPrice });

                // obtiene la posicion de los condos para posicionar en el mapa
                setPositions(condos.filter(condo =>condo.address !== null && condo.address.geolocation !== null)
                                   .map(el => ({
                                        id: el.id,
                                        place: el.name,
                                        raiting: el.stars,
                                        latitude:
                                        el.address.geolocation !== null
                                            ? el.address.geolocation.latitude
                                            : null,
                                        longitude:
                                        el.address.geolocation !== null
                                            ? el.address.geolocation.longitude
                                            : null,
                                    })),
                );
                setCenter({
                    latitude: condos.filter(
                      ele =>
                        ele.name !== null &&
                        ele.address !== null &&
                        ele.address.geolocation !== null,
                    )[0].address.geolocation.latitude,
                    longitude: condos.filter(
                      ele =>
                        ele.name !== null &&
                        ele.address !== null &&
                        ele.address.geolocation !== null,
                    )[0].address.geolocation.longitude,
                  });

                setIsSubmiting(false)
                
            } catch (error) {
                setItems([])
                setItemsFilter([])
                setIsSubmiting(false)
                toast.error(ERROR_SERVER)
            }
        }        
    }

    //console.log(positions)

    // centra en el mapa la posición del condominio
    // const handleOnHoverItem = item => {
    //     setCenter(item.address.geolocation);
    //     const findIndex = items.findIndex(el => el.id === item.id);
    //     setPosition(findIndex);
    // };
    // Quita del mapa la posición del condominio
    // const handleOnHoverOutItem = () => {
    //     setPosition(-1);
    // };

    //handle filter condo
    const searchList = (valor, typeFilter) => {
        if (typeFilter === 'nombre') {
          if (valor !== '') {
            const arr = [...items];
            setItemsFilter(
              arr.filter(elem => getCadena(elem.name).includes(valor)),
            );
          } else {
            setItemsFilter(items);
          }
        }
    
        if (typeFilter === 'precio') {
          const { min } = valor;
          const { max } = valor;
          const arr = [...items];
          setItemsFilter(
            arr.filter(
              elem => getPrecio(elem.total) >= min && getPrecio(elem.total) <= max,
            ),
          );
        }
    };   

    const onHandleClickCondoDetalle = (condo) => {
        const extraData = {
            destiny: destino.value,
            checkIn: moment(startDate).startOf('month').format('DD-MM-YYYY'),
            checkOut: moment(endDate).endOf('month').format('DD-MM-YYYY'),
            currency: 'USD',
            language: 'CAS',
            rooms: [
                {
                adults: 1,
                children: {
                    ages: [],
                },
                },
            ],
        }
        condo.extraData = extraData
        setCondoDetalle(condo)
        setOpen(true)
    }

    return (
        <>
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <CardBody>
                            <Form
                                className="needs-validation"
                                id="tooltipForm"
                                onSubmit={searchCondo}
                            >
                                <Row>
                                    <Col xs="12" md="3">
                                        <Label htmlFor="destino" className="mb-0">Destiny:</Label>
                                        <SelectAjax
                                            token={tokenSunApi}
                                            value={destino}
                                            url={`${process.env.REACT_APP_SUNAPI_ENDPOINT}${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS_FILTER}?languageId={languageId}&q={inputValue}`}
                                            onChange={value => {
                                                if (value === null) setErrorDestino(true);
                                                else setErrorDestino(false);
                                
                                                setDestino(value);
                                            }}
                                            params={{
                                                languageId: 2,
                                            }}
                                        />
                                        {
                                    (errorDestino) &&
                                        <div className="invalid-tooltip" name="validate" id="validate1">Selecciona un destino</div>
                                    }
                                    </Col>
                                    <Col xs="12" md="3">
                                        <Label htmlFor="checkin" className="mb-0">Desde - Hasta:</Label>
                                        <DatePicker
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                const existNull = update.find(it=>it===null)
                                                if(existNull){
                                                    setErrorFechas(true)
                                                }else{
                                                    setErrorFechas(false)
                                                }
                                                setDateRange(update);
                                            }}
                                            isClearable={true}
                                            className="form-control"
                                            showMonthYearPicker
                                            showFullMonthYearPicker
                                            showFourColumnMonthYearPicker
                                            dateFormat="MMMM/yyyy"
                                            minDate={moment().startOf('month').toDate()}
                                        />
                                    { errorFechas &&
                                        <div className="invalid-tooltip" name="validate" id="validate1">Selecciona fechas válidas</div>
                                    }
                                    </Col>
                                    <Col xs="12" md="3">
                                        <Label htmlFor="checkin" className="mb-0 opacity-0">Desde - Hasta:</Label>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            className="w-100"
                                        >Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {
                isSubmiting &&
                <Row className="mt-5">
                    <Col xs="12" xl="12">
                        <SimpleLoad />
                    </Col>
                </Row> 
            }

            
            {!isSubmiting && <Row className="mt-5">
                <Col>
                    <Card className="shadow-sm">
                        <CardBody>
                            <Row>
                                {items.length > 0 && 
                                <Col xs="12" md="3" lg="3">
                                    <h5>Filtros</h5>
                                    <div className="mb-3">
                                        <Label>Nombre:</Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={nombreFilter}
                                            onChange={e=>{
                                                setNombreFilter(e.target.value)
                                                searchList(e.target.value, 'nombre');
                                            }}
                                        />
                                    </div>
                                    {precioFilter && <div className="mb-5 px-2 px-md-3">
                                        <Label className="mb-3">Precio:</Label>
                                        <InputRange
                                            maxValue={maxPrecio}
                                            minValue={minPrecio}
                                            value={rangePrecio}
                                            onChange={value => {
                                                setRangePrecio(value);
                                                searchList(value, 'precio');
                                            }}
                                            formatLabel={value => `${numberFormat2.format(value)} `}
                                        />
                                    </div>}
                                    <div className="mb-3 px-2 px-md-3">
                                            <MapView
                                                positionsList={positions}
                                                items={items}
                                                position={position}
                                                setPosition={setPosition}
                                                center={center}
                                                setCenter={setCenter} 
                                            />
                                    </div>
                                </Col>}

                                <Col xs="12" md="9" lg={{size: 8, offset: 1}}>
                                {itemsFilter.length === 0 && !isSubmiting && <Alert color="light" className="text-center">No existen elementos</Alert>}
                                {itemsFilter
                                    .slice(indexOfFirstPost, indexOfLastPost)
                                    .map((item, i) => (
                                        <Row className="align-items-center" key={i} onClick={e=>onHandleClickCondoDetalle(item)}>
                                            <Col xs="12" lg="3">
                                                <div className="text-center clicked">
                                                <img
                                                    src={item.urlPhoto ? item.urlPhoto : noImage}
                                                    fluid
                                                    className="card-img-max-height"
                                                    alt={item.name}
                                                />
                                                </div>
                                            </Col>
                                            <Col xs="12" lg="6">                                                
                                                <h3>{item.name}</h3>
                                                <label className="lh-1-1">
                                                {item.description != null && item.description.length > 180
                                                    ? `${item.description.substr(0, 180)}...`
                                                    : item.description}
                                                </label>
                                            </Col>
                                            <Col xs="12" lg="3">
                                                <div className="text-right">
                                                <div>
                                                    <span className="text-success fs-4">
                                                    {formatNumber(item.total)} USD{' '}
                                                    <small className="text-dark ft-1rem" />
                                                    </span>
                                                </div>
                                                <label className="lh-1 my-2">
                                                    <span className="text-lowercase">7 Noches</span>
                                                </label>
                                                <label className="d-block">Impuestos incluidos</label>
                                                </div>
                                            </Col>
                                            <hr className="my-1" />                                            
                                        </Row>  
                                    ))}

                                    {
                                        itemsFilter.length > 0 && 
                                        <Pagination
                                            onChange={page => setCurrentPage(page)}
                                            current={currentPage}
                                            total={itemsFilter.length}
                                            showLessItems
                                            showTitle
                                            pageSize={10}
                                            className="pagination"
                                            prevIcon={<i className="fas fa-chevron-left" />}
                                            nextIcon={<i className="fas fa-chevron-right" />}
                                            jumpPrevIcon={<i className="bx bx-dots-horizontal-rounded" />}
                                            jumpNextIcon={<i className="bx bx-dots-horizontal-rounded" />}
                                        />
                                    }
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>}
            <CondominioDetalle 
                open={open}
                setOpen={setOpen}
                condo={condoDetalle}
            />
        </>
    )
}
