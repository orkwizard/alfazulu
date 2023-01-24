import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Table } from 'reactstrap';
import { formatNumber } from '../../../utils/Number/numberFormat';

export default function TarifaCondominios({rates}){
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    const { nav1, nav2 } = state;

    useEffect(() => {
        setState({
          nav1: slider1.current,
          nav2: slider2.current,
        });
      }, []);
    return (
        <>
        <h4>Tarifas</h4>
        <hr />

        <div className="slider-content">
      <Slider
        key={1}
        asNavFor={nav2}
        ref={slider => {
          slider1.current = slider;
        }}
        arrows
      >
        {rates.map((room, i) => (
          <div key={i}>
            <Table bordered>
              <thead>
                <tr className="table-title">
                  <th colSpan="4">
                    {
                        room.roomDescription.length > 1
                      ? 'Semanas'
                      : 'Semana' }
                    : {`${room.effectiveDate} al ${room.expireDate}`}
                  </th>
                </tr>
                <tr>
                  <th width="60%">Habitación</th>
                  <th width="40%" className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {room.roomDescription.map((desc, d) => (
                  <tr key={d}>
                    <td>
                      <div className="p-2 badge bg-dark fs-5">{desc.type}</div>
                      <br />
                      Capacidad máxima: {desc.maxCapacity} Personas
                    </td>
                    <td>
                      <div className="text-primary fs-2 text-center">
                        {formatNumber(room.amountDetail.total)}USD
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </Slider>

      <Slider
        key={2}
        asNavFor={nav1}
        ref={slider => {
          slider2.current = slider;
        }}
        slidesToShow={6}
        swipeToSlide
        focusOnSelect
        infinite={false}
        // nextArrow={<i className='bx bxs-right-arrow-square' />}
        // prevArrow={<i className='mdi-arrow-left-drop-circle-outline' />}
        className="slider-items"
      >
        {rates.map((room, r) => (
          <div key={r}>
            <div className="item rounded border w-auto m-3 p-2 text-center">
              <div className="fs-6">{room.roomDescription[0].type}</div>
              <div className="item-costo">
                {formatNumber(room.amountDetail.total)}USD
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
        </>
    )
}