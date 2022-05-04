import React from "react";
import { SiGooglemaps } from 'react-icons/si'
import { AiFillClockCircle } from 'react-icons/ai'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

const getInfo = require("../../services/compannyInfo/info.json")

var openingHours = getInfo[0].openinghour
var address = getInfo[1].adress
var paymentMethods = getInfo[2].paymentMethods
var companny = getInfo[3].companny

export var myCategs = () => getInfo[4].categs

export var CompannyName = (
    <>
        <p>{companny}</p>
    </>
);

const InfoCompanny = () => {
    const dayWeek = new Date();
    const week = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    const today = dayWeek.getDay();
    var showDay = week[today];
    var openingHoursRange = openingHours[today]

    function colorDay(day, hours) {
        if (day === showDay) {
            if (hours === 'Fechado') {
                localStorage.setItem('ofp', false)
                return <div style={{ color: '#dc3545' }}>{day}: {hours}</div>
            } else {
                const date = new Date();
                const hr = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')
                if (hours.slice(0, 5) < hr && hours.slice(6, 11) > hr) {
                    localStorage.setItem('ofp', true)
                    return <div style={{ color: '#3eca89' }}>{day}: {hours}</div>
                } else {
                    localStorage.setItem('ofp', false)
                    return <div style={{ color: '#dc3545' }}>{day}: {hours}</div>
                }
            }
        } else {
            return <div style={{ color: '#000000' }}>{day}: {hours}</div>
        }
    }

    return (
        <>
            <div className='companny-info'>
                <nav className="accordion arrows">
                    <input type="radio" name="accordion" id="cb1" />
                    <section className="box">
                        <label className="box-title" htmlFor="cb1"><AiFillClockCircle /> {colorDay(showDay, openingHoursRange)}</label>
                        <label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">
                            {colorDay(week[0], openingHours[0])}
                            <br></br>
                            {colorDay(week[1], openingHours[1])}
                            <br></br>
                            {colorDay(week[2], openingHours[2])}
                            <br></br>
                            {colorDay(week[3], openingHours[3])}
                            <br></br>
                            {colorDay(week[4], openingHours[4])}
                            <br></br>
                            {colorDay(week[5], openingHours[5])}
                            <br></br>
                            {colorDay(week[6], openingHours[6])}
                        </div>
                    </section>
                    <input type="radio" name="accordion" id="cb2" />
                    <section className="box">
                        <label className="box-title" htmlFor="cb2"><SiGooglemaps className='icon-local' /> {address[4]} - {address[5]} </label>
                        <label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">{address[0]}, Nº {address[1]} {address[2]}, {address[3]}, {address[4]} - {address[5]}.</div>
                    </section>
                    <input type="radio" name="accordion" id="cb3" />
                    <section className="box">
                        <label className="box-title" htmlFor="cb3"><RiMoneyDollarCircleFill /> Aceitamos: {paymentMethods[0]}, {paymentMethods[1]}...</label>
                        <label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">{paymentMethods.join(', ')}.</div>
                    </section>
                    <input type="radio" name="accordion" id="acc-close" />
                </nav>
            </div>
        </>
    )
}

export default InfoCompanny