import React from "react";

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

const InfoCompanny = (props) => {
    const dayWeek = new Date();
    const week = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    const today = dayWeek.getDay();
    var showDay = week[today];
    var openingHoursRange = openingHours[today]

    return (
        <>
            <div className='companny-info'>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {showDay}: {openingHoursRange}
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <br></br>
                            {week[0]}: {openingHours[0]}
                            <br></br>
                            <br></br>
                            {week[1]}: {openingHours[1]}
                            <br></br>
                            <br></br>
                            {week[2]}: {openingHours[2]}
                            <br></br>
                            <br></br>
                            {week[3]}: {openingHours[3]}
                            <br></br>
                            <br></br>
                            {week[4]}: {openingHours[4]}
                            <br></br>
                            <br></br>
                            {week[5]}: {openingHours[5]}
                            <br></br>
                            <br></br>
                            {week[6]}: {openingHours[6]}
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                {address[4]} - {address[5]}
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {address[0]}, Nº {address[1]} {address[2]}, {address[3]}, {address[4]} - {address[5]}.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Formas de Pagamento: {paymentMethods[0]}, {paymentMethods[1]}...
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {paymentMethods.join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoCompanny