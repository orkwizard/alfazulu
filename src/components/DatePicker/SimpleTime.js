import { InputGroup } from "reactstrap"
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

function SimpleTime(){

    return (
        <InputGroup>
            <Flatpickr
                className="form-control d-block"
                placeholder="Select time"
                options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i"
                }}
            />
            <div className="input-group-append">
                <span className="input-group-text">
                <i className="mdi mdi-clock-outline" />
                </span>
            </div>
        </InputGroup>
    )
}

export default SimpleTime