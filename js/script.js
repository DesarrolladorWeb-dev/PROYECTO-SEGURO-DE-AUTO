function Seguro(marca,year,tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {

    let cantidad ;
    const base = 2000;

    switch (this.marca) {
        case '1':
                cantidad = base * 1.15
                break;
        case '2':
                cantidad = base * 1.05
                break;
        case '3':    
                cantidad = base * 3.15
                break;
        default:
            break;
    }

    // leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // cada año que la diferencia es mayor, el costo va a reducirse un 3%
    

    cantidad -= ((diferencia * 3) * cantidad) / 100;
    // restaremos a cantidad esta operacion
    

   

    if (this.tipo === 'basico') {
         cantidad *= 1.30;
    }else{
         cantidad *= 1.50;
    }

    return cantidad;
     
}
function UI() {}

//Llena las opcions de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),  //* para conectar dos constantes con noma
        min = max - 20;
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
        
    }

}
// mostrar alertas
UI.prototype.mostrarMensajes = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div,document.querySelector('#resultado'))
    setTimeout(() => {
        div.remove();
    }, 3000);
    
}

UI.prototype.mostrarResultado = (total, seguro) =>{
    const {marca, year, tipo} = seguro
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano'
            break;
        case '2':
            textoMarca = 'Asiatico'
            break;        
        case '3':
            textoMarca = 'Europeo'
            break;
        default:
            break;
    }


     const div = document.createElement('div')
     div.classList.add('mt-10');

     div.innerHTML = `
     <p class="header"> tu Resumen </p>
     
     <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca}</span></p>
     <p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>
     <p class="font-bold">Tipo:<span class="font-normal capitalize" > ${tipo}</span></p>
     <p class="font-bold">Total:<span class="font-normal"> $${total}</span></p>
     `;

     const resultadoDiv = document.querySelector('#resultado');
     

    //  mostrar espiner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block'
     
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div)
    }, 3000);

}

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones();
})

addEventListener();
function addEventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    // leer el año seleccionado
    const year = document.querySelector('#year').value;
    // leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if(marca === '' || year === '' || tipo === ''){
       
        ui.mostrarMensajes('todos los campos son obligatorios','error')
        return
    }
    ui.mostrarMensajes('Cotizando ....','exito')
    // ocultando las cotizaciones previas 
    const resultado = document.querySelector('#resultado div');
    if (resultado != null) {
        resultado.remove();
        
    }

    const seguro = new Seguro(marca, year , tipo);
    const total = seguro.cotizarSeguro();
    console.log("total : " . total)
    ui.mostrarResultado(total,seguro)


}
