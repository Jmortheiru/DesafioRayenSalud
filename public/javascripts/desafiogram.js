function LoginEnbod(url, data) {

    fetch(url, {
        method: 'POST', body: data
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                if (result.estadoSession == 0) {
                    document.getElementById('msjeAcceso').innerHTML = result.mensajeSession;
                    document.getElementById('alertPass').style.display = 'block';
                    $("#alertPass").fadeOut(3000);
                } else {
                    console.log(result);
                    var rut = result.rutUsuarioSession;
                    var usr = result.usrUsuarioSession;
                    var uxs = result.uxsUsuarioSession;
                    var nombre = result.nombreUsuarioSession;
                    var token = result.tokenSession;

                    inicio(rut, usr, uxs, nombre, token);
                }
            },
            (error) => {
                alert('error: ' + error);
            }
        )
        .catch((error) => console.log(error))
}

function login() {

    var user = document.getElementById('txtUsuario').value;
    var pass = document.getElementById('txtPass').value;
    var sistema = 109;

    const data = new FormData();
    data.append('usuario', user);
    data.append('pass', pass);
    data.append('sistema', sistema);

    var url = '/Usuario/validaUsuario';

    LoginEnbod(url, data);

}

function home() {
    var rut = document.getElementById('rut').value;
    var usr = document.getElementById('usr').value;
    var uxs = document.getElementById('uxs').value;
    var nombre = document.getElementById('nombre').value;
    var token = document.getElementById('token').value;

    inicio(rut, usr, uxs, nombre, token);
}

function inicio(rut, usr, uxs, nombre, token) {
    var url = '/Inicio/Index';

    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;

    var inputRut = document.createElement('input');
    inputRut.type = 'hidden';
    inputRut.name = 'rutUsuario';
    inputRut.value = rut;
    form.appendChild(inputRut);

    var inputUsr = document.createElement('input');
    inputUsr.type = 'hidden';
    inputUsr.name = 'usrUsuario';
    inputUsr.value = usr;
    form.appendChild(inputUsr);

    var inputUxs = document.createElement('input');
    inputUxs.type = 'hidden';
    inputUxs.name = 'uxsUsuario';
    inputUxs.value = uxs;
    form.appendChild(inputUxs);

    var inputNom = document.createElement('input');
    inputNom.type = 'hidden';
    inputNom.name = 'nomUsuario';
    inputNom.value = nombre;
    form.appendChild(inputNom);

    var inputTok = document.createElement('input');
    inputTok.type = 'hidden';
    inputTok.name = 'tokUsuario';
    inputTok.value = token;
    form.appendChild(inputTok);

    form.submit();
}

function traeMenu() {

    var url = '/Usuario/obtenerMenuJson/';
    //var origin = origen();

    var uxs = document.getElementById('usr').value;
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('usuariosistema', uxs);
    //data.append('token', token);

    fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
            //'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                armaMenu(result);
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function armaMenu(data) {

    var construccion = '';

    for (var cab in data) {
        construccion += '<li class="nav-item has-treeview">';
        construccion += '<a href = "#" class="nav-link" >';
        construccion += '<i class="nav-icon fas fa-tachometer-alt"></i>';
        construccion += '<p>' + data[cab].DESCRIPCION_MENU + '<i class="right fas fa-angle-left"></i></p>';
        construccion += '</a>'

        construccion += '<ul class="nav nav-treeview">';

        var funciones = data[cab].hijosMenu;

        for (var itm in funciones) {
            construccion += '<li class="nav-item">';
            construccion += '<a onclick="cargaFuncionalidad(\'' + funciones[itm].URL_MENU + '\');" href="#" class="nav-link">';
            construccion += '<p>' + funciones[itm].DESCRIPCION_MENU + '</p>';
            construccion += '</a>';
            construccion += '</li>';
        }
        construccion += '</ul>';
        construccion += '</li>'
    }

    document.getElementById('menuCygnus').innerHTML = construccion;

}

function cargaFuncionalidad(funcion) {

    var url = funcion;

    fetch(url, {
        method: 'GET'
    })
        .then(res => res.text())
        .then(
            (result) => {
                document.getElementById('body').innerHTML = result;

                var arr = document.getElementById('body').getElementsByTagName('script')
                for (var n = 0; n < arr.length; n++)
                    eval(arr[n].innerHTML)
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function siguienteFuncion(funcion, id, tipo, cuenta) {

    //console.log("funcion: " + funcion + " id: " + id + " tipo: " + tipo + " cuenta: " + cuenta);
    var url = funcion + '?id=' + id + '&tipo=' + tipo + '&cuenta=' + cuenta;

    fetch(url, {
        method: 'GET'
    })
        .then(res => res.text())
        .then(
            (result) => {
                document.getElementById('body').innerHTML = result;

                var arr = document.getElementById('body').getElementsByTagName('script')
                for (var n = 0; n < arr.length; n++)
                    eval(arr[n].innerHTML)
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function mensajeCorrecto(msje) {
    toastr.success(msje);
}

function mensajeInformativo(msje) {
    toastr.info(msje);
}

function mensajeError(msje) {
    //toastr.error(msje);
    $(document).Toasts('create', {
        class: 'bg-danger',
        title: 'Ha ocurrido un error',
        subtitle: '',
        body: msje
    })
}

function mensajeAlerta(msje) {
    toastr.warning(msje);
}

function controlCarga(obj) {

    if (obj[0].codigo == '200') {
        //mensajeError(obj[0].mensaje + " (" + obj[0].codigo + ")");
        //mensajeCorrecto(obj[0].mensaje);
        return true;
    } else {
        mensajeError(obj[0].mensaje + " (" + obj[0].codigo + ")");
        return false;
    }
}

function loadingGifIn(div) {
    $("#" + div).fadeIn();

    var opts = {
        lines: 12, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false // Whether to use hardware acceleration
    };

    var target = document.getElementById(div);
    var spinner = new Spinner(opts).spin(target);
}
function loadingGifOut(div) {
    $("#" + div).fadeOut();
}