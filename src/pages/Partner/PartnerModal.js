import { withTranslation } from "react-i18next";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function PartnerList({t, showModal, setShowModal}){
    const toggle = () => {
        setShowModal(false);
    };
    return(
        <Modal isOpen={showModal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h5" className='modal-header-text-primary'>
                Details
            </ModalHeader>
            <ModalBody>
                <div className="row mb-4">
                    <label className="col-sm-3 col-form-label form-label font-weight-semibold">
                        Company
                    </label>
                    <div className="col-sm-9">
                        <label className="col-form-label fw-100">
                            Holidays Launge
                        </label>                        
                    </div>
                </div>
                <div className="row mb-4">
                    <label className="col-sm-3 col-form-label form-label font-weight-semibold">Language</label>
                    <div className="col-sm-9">
                        <label className="col-form-label form-label fw-100">English</label>                        
                    </div>
                </div>
                <div className="row mb-4">
                    <label className="col-sm-3 col-form-label form-label font-weight-semibold">País</label>
                    <div className="col-sm-9">
                        <label className="col-form-label form-label fw-100">Estados Unidos</label>                        
                    </div>
                </div>
                <div className="row mb-4">
                    <label className="col-sm-3 col-form-label form-label font-weight-semibold">Email</label>
                    <div className="col-sm-9">
                        <label className="col-form-label form-label fw-100">ejemplo@ejemplo.com</label>                        
                    </div>
                </div>
                <div className="row mb-4">
                    <label className="col-sm-3 col-form-label form-label font-weight-semibold">Last comment</label>
                    <div className="col-sm-9">
                        <label className="col-form-label form-label fw-100">Date: 12/12/2021 <br /> UserName: Name</label>                        
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )

}

export default withTranslation()(PartnerList)