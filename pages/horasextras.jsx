'use strict';

import { TextField } from '@material-ui/core';
import React from 'react';


export default function ExtraHours({title}) {
    return (
        <main >

        <section >

            <img  src="./../public/img/logo.png"/>
            <h1 >Formulario para Pago de Horas Extraordinarias</h1>
            <form>
                <div >
                    <span >Nombres y Apellidos</span>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
                <div >
                    <span >Cargo</span>
                    <input type="text"></input>
                </div>
                <div >
                    <span >Departamento</span>
                    <input type="text"></input>
                </div>
                <div >
                    <span >Período</span>
                    <div >
                        <input type="date"></input>
                        <input type="date"></input>
                    </div>
                </div>

                    <div >
                        <span >Fecha</span>
                        <input type="date"></input>
                    </div>
                    <div >
                        <span >Desde (hora)</span>
                        <input type="time"></input>
                    </div>
                    <div >
                        <span >Hasta (hora)</span>
                        <input type="time"></input>
                    </div>
            </form>
        </section>
    </main>
    )
}

