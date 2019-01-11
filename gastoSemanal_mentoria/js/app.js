// Variables
const presupuestoUsuario= prompt('Cual es tu presupuesto semanal');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;


//Clases
//Clase de Presupuesto

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto= Number(presupuesto);
        this.restante=Number(presupuesto);
    }
    //Método para ir restando del presupuesto actual

    presupuestoRestante(cantidad=0){
        return this.restante -= Number(cantidad);
    }
}

// Clase de interfaz, maneja todo lo relacionado con el html

class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan= document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        
        //insertar al html
        presupuestoSpan.innerHTML= `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje,tipo){
        const divMensaje= document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo ==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.innerText=`${mensaje}`;

        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
        }, 3000);
    }

    //inserta los gastos a la lista
    agregarGastoListado(nombre,cantidad){
        const gastosListado= document.querySelector('#gastos ul');

        //Crear un li
        const li= document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML= `
            ${nombre} 
            <span class="badge badge-primary badge-pill">$ ${cantidad}<span>
        `;

        //insertar html
        gastosListado.appendChild(li);
    }

    //comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante= document.querySelector('span#restante');

        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML=`${presupuestoRestanteUsuario}`;
        this.comprobarPresupuesto();
    }

    //cambia de color el presupuesto restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        //aqui añadimos y quitamos clases css
        const restante= document.querySelector('.restante');
        //Comprueba el 25% 
        if((presupuestoTotal/4)>presupuestoRestante){
            restante.classList.add('alert-danger');
            restante.classList.remove('alert-success', 'alert-warning');
        }else if((presupuestoTotal/2)>presupuestoRestante){
            restante.classList.add('alert-warning');
            restante.classList.remove('alert-success');
        }
    }
}



//Event Listeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario ==='null' || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        //instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //instanciar la interfaz
    const ui= new Interfaz();
    
    //comprobar que los campos no esten vacios
    if(nombreGasto ==='' || cantidadGasto ===''){
        //2 parametros, mensaje y tipo

        ui.imprimirMensaje('Hubo un error','error');
    }else{
        ui.imprimirMensaje('Insertado correctamente','correcto');
        ui.agregarGastoListado(nombreGasto,cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

})