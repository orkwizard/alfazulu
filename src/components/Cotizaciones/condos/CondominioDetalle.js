import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Modal, ModalHeader, Row } from "reactstrap";
import { CONDOS_DETAIL } from "../../../helpers/sunapi_url";
import useGetTokenSunApi from "../../../hooks/useGetTokenSunApi";
import GalleryPhotos from "../../common/GalleryPhotos";
import TarifaCondominios from "./TarifaCondominios";

export default function CondominioDetalle({open, setOpen, condo}){
    const tokenSunApi = useGetTokenSunApi();
    const [item, setItem] = useState(null)

    useEffect(() => {
        const appiVersion = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}`;
        const urlService = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${appiVersion}${CONDOS_DETAIL}`;
    
        async function fecthCondoDetail(){
            try {
                const data = {
                    ...condo.extraData,
                    apiName: condo.source,
                    chain: '',
                    id: condo.id
                }

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
                setItem(condosData)
            } catch (error) {
                console.log(error)
            }
        }
            
        if(open) fecthCondoDetail(); 
        if(!open){
            setItem(null)
        }
    }, [open])    


    return (
        <Modal
          isOpen={open}
          role="dialog"
          autoFocus={true}
          centered
          data-toggle="modal"
          fullscreen
          toggle={() => setOpen(!open)}
          backdrop="static"
          keyboard={false}
        >
          <div>
            <ModalHeader
              className="border-bottom-0"
              toggle={() => setOpen(!open)}
            ></ModalHeader>
          </div>
          <div className="modal-body">
            {
                item === null ? 'Loading' :
                <Container>
                    <Row>
                        <Col xs="12" md="12" className="mb-4">
                          <h3 className="mb-0">{item?.name}</h3>
                          <label className="text-black-50 fs-6">
                            <i className="fas fa-map-marker-alt text-primary"></i>
                            {`${item.address?.addressName ?? ''} ${item.address?.street ?? ''} ${item.address?.city ?? ''} ${item.address?.stateCode ?? ''} ${item.address?.country ?? ''}`}
                          </label>
                        </Col>
                    </Row>
                    <GalleryPhotos images={item.photos}/>
                    <div className="mb-4"></div>
                    <TarifaCondominios rates={item.rates}/>
                </Container>
            }            
          </div>
        </Modal>
    )
}