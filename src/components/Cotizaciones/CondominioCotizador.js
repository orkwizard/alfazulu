import { useState } from "react";
import { useEffect } from "react";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";
import { CONDOS_LIST, GET_DESTINOS_FILTER } from "../../helpers/sunapi_url";
import useGetTokenSunApi from "../../hooks/useGetTokenSunApi"
import SelectAjax from "../common/SelectAjax";
import DatePicker from "react-datepicker";
import noImage from '../../assets/images/no-image.png';
import moment from "moment";
import { formatNumber } from "../../utils/Number/numberFormat";

import "react-datepicker/dist/react-datepicker.css";


export default function CondominioCotizador(){
    const tokenSunApi = useGetTokenSunApi();
    const [items, setItems] = useState([])
    const [itemsFilter, setItemsFilter] = useState([]);
    const [destino, setDestino] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const [starFilter, setStarFilter] = useState(false);
    const [precioFilter, setPrecioFilter] = useState(true);
    const [condosTotal, setCondosTotal] = useState(0);

    const searchCondo = async () => {
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
        console.log(data)


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
            console.log(condosData)
            
            const condos = condosData.hotels
            const newCondos = [];

            // Recorre la lista de los condominios para dejar solo los no repetidos
            // eslint-disable-next-line array-callback-return
            condos.map(condo => {
                const ar = newCondos.filter(c => c.id === condo.id);
                if (ar.length === 0) newCondos.push(condo);
            });

            // Determinar si filtramos por ranking
            if (data.f_stars != null && data.f_stars.length > 0) setStarFilter(true);
            // Determinar si filtramos por precio
            if (data.minPrice === data.maxPrice) setPrecioFilter(false);

            setItems(condos)
            setItemsFilter(newCondos);
            //setMinPrecio(data.minPrice);
            //setMaxPrecio(data.maxPrice);
            //setValuePrecio({ min: data.minPrice, max: data.maxPrice });
            setCondosTotal(newCondos.length);
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        console.log(tokenSunApi)
        if(tokenSunApi){
             
        }

    }, [tokenSunApi])

   

    return (
        <>
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    searchCondo();
                                }}
                            >
                                <Row>
                                    <Col xs="12" md="3">
                                        <Label htmlFor="destino" className="mb-0">Destiny:</Label>
                                        <SelectAjax
                                            token={tokenSunApi}
                                            value={destino}
                                            url={`${process.env.REACT_APP_SUNAPI_ENDPOINT}${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS_FILTER}?languageId={languageId}&q={inputValue}`}
                                            onChange={value => {
                                                console.log(value)
                                                // if (value === null) setErrordestino(true);
                                                // else setErrordestino(false);
                                
                                                setDestino(value);
                                            }}
                                            params={{
                                                languageId: 2,
                                            }}
                                        />
                                    </Col>
                                    <Col xs="12" md="3">
                                        <Label htmlFor="checkin" className="mb-0">Desde - Hasta:</Label>
                                        <DatePicker
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                console.log(update)
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
                                    </Col>
                                    <Col xs="12" md="3" className="d-flex flex-column justify-content-end">
                                        <Button
                                            color="primary"
                                            type="submit"
                                        >Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <Card className="shadow-sm">
                        <CardBody>
                            <Row>
                                <Col xs="12" md="3" lg="4"></Col>
                                <Col xs="12" md="9" lg="8">
                                {itemsFilter
                                    .slice(indexOfFirstPost, indexOfLastPost)
                                    .map((item, i) => (
                                        <Row className="align-items-center" key={i}>
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
                                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
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
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
