import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";

function TopLLamadas(){

    const [earningChartData, setearningChartData] = useState([31,40,36,51,49,72,69, 56, 68, 82, 68, 76])

    const options = {
        chart: {
          toolbar: "false",
          dropShadow: {
            enabled: !0,
            color: "#000",
            top: 18,
            left: 7,
            blur: 8,
            opacity: 0.2,
          },
        },
        dataLabels: {
          enabled: !1,
        },
        colors: ["#556ee6"],
        stroke: {
          curve: "smooth",
          width: 3,
        },
    };
    const [seletedMonth, setSeletedMonth] = useState("jan");
    const series = [
        {
          name: "Series 1",
          data: [...earningChartData],
        },
      ];

    return (
        <>
          <Col xs="12" xl="8">
                <Card>
                <CardBody>
                    <div className="clearfix">
                    <div className="float-end">
                        <div className="input-group input-group-sm">
                        <select
                            className="form-select form-select-sm"
                            value={seletedMonth}
                            onChange={(e) => setSeletedMonth(e.target.value)}
                        >
                            <option value="jan">Jan</option>
                            <option value="dec">Dec</option>
                            <option value="nov">Nov</option>
                            <option value="oct">Oct</option>
                        </select>
                        {/* <div className="input-group-append"> */}
                        <label className="input-group-text">Month</label>
                        {/* </div> */}
                        </div>
                    </div>
                    <h4 className="card-title mb-4">Llamadas</h4>
                    </div>

                    <Row>
                    <Col lg="4">
                        <div className="text-muted">
                        <div className="mb-4">
                            <p>Este mes</p>
                            <h4>2453</h4>
                            <div>
                            <span className="badge badge-soft-success font-size-12 me-1">
                                {" "}
                                + 0.2%{" "}
                            </span>{" "}
                            From previous period
                            </div>
                        </div>

                        <div>
                            <Link to="#" className="btn btn-primary  btn-sm">
                            View Details{" "}
                            <i className="mdi mdi-chevron-right ms-1"></i>
                            </Link>
                        </div>

                        <div className="mt-4">
                            <p className="mb-2">Último mes</p>
                            <h5>281</h5>
                        </div>
                        </div>
                    </Col>

                    <Col lg="8">
                        <div id="line-chart" dir="ltr">
                        <ReactApexChart
                            series={series}
                            options={options}
                            type="line"
                            height={320}
                            className="apex-charts"
                        />
                        </div>
                    </Col>
                    </Row>
                </CardBody>
                </Card>
            </Col>
        </>
      );
}

export default TopLLamadas