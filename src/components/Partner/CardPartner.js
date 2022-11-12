import { useState } from "react"
import { Collapse, Label } from "reactstrap"
import classnames from "classnames";
import useGetMembresia from "../../hooks/useGetMembresia";

export default function CardPartner({partner}){
    const [open, setOpen] = useState(false)
    const membresia = useGetMembresia(partner.idMembresia)
    return (
        <div
            className="accordion"
            id="accordionFlushExample"
            >
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFlushOne">
                    <button
                        className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !open }
                        )}
                        type="button"
                        onClick={() => setOpen(!open)}
                        style={{ cursor: "pointer" }}
                    >
                        {`${partner?.informacionPersonal?.nombre} ${partner?.informacionPersonal?.segundoNombre} 
                        ${partner?.informacionPersonal?.primerApellido} ${partner?.informacionPersonal?.segundoApellido}`}
                    </button>
                    </h2>

                    <Collapse
                    isOpen={open}
                    className="accordion-collapse"
                    >
                    {membresia && 
                    <div className="accordion-body">
                        <div><Label><strong>Membresía: </strong>{membresia.tipoMembresia?.nombre ?? '-'}</Label></div>
                        <div><Label><strong>Número contrato: </strong>{membresia.numeroContrato ?? '-'}</Label></div>
                    </div>}
                    </Collapse>
                </div>
            </div>
    )
}