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
                return <div style={{ color: '#dc3545' }}>{day}: {hours}</div>
            } else {
                return <div style={{ color: '#3eca89' }}>{day}: {hours}</div>
            }
        } else {
            return <div style={{ color: '#000000' }}> {day}: {hours}</div>
        }
    }

    return (
        <>
            <div className='companny-info'>
                <nav class="accordion arrows">
                    <input type="radio" name="accordion" id="cb1" />
                    <section class="box">
                        <label class="box-title" for="cb1"><AiFillClockCircle /> {colorDay(showDay, openingHoursRange)}</label>
                        <label class="box-close" for="acc-close"></label>
                        <div class="box-content">
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
                    <section class="box">
                        <label class="box-title" for="cb2"><SiGooglemaps className='icon-local' /> {address[4]} - {address[5]} </label>
                        <label class="box-close" for="acc-close"></label>
                        <div class="box-content">{address[0]}, Nº {address[1]} {address[2]}, {address[3]}, {address[4]} - {address[5]}.</div>
                    </section>
                    <input type="radio" name="accordion" id="cb3" />
                    <section class="box">
                        <label class="box-title" for="cb3"><RiMoneyDollarCircleFill /> Aceitamos: {paymentMethods[0]}, {paymentMethods[1]}...</label>
                        <label class="box-close" for="acc-close"></label>
                        <div class="box-content">{paymentMethods.join(', ')}.</div>
                    </section>
                    <input type="radio" name="accordion" id="acc-close" />
                </nav>
            </div>
        </>
    )
}

export default InfoCompanny