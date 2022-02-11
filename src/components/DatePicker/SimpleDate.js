import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { InputGroup } from "reactstrap";

function SimpleDate(){


    return (
        <InputGroup>
            <Flatpickr
                className="form-control d-block"
                placeholder="dd-MM-YYYY"
                options={{
                altInput: true,
                altFormat: "d-m-Y",
                dateFormat: "d-m-Y"
                }}
            />
        </InputGroup>
    )

}

export default SimpleDate