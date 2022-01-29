function Login(url, data) {

    fetch(url, {
        method: 'POST', body: data
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                
				window.location.href = "/explore";
            },
            (error) => {
                alert('error: ' + error);
				document.getElementById('msjeAcceso').innerHTML = error;
				document.getElementById('alertPass').style.display = 'block';
				$("#alertPass").fadeOut(3000);
            }
        )
        .catch((error) => console.log(error))
}

function Signup(url, data) {

    fetch(url, {
        method: 'POST', body: data
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                console.log(result.token)
				
				var token = result.token;
				document.cookie = "token=" + encodeURIComponent( token );
				
				mensajeCorrecto("Se registro correctamente el usuario");
				
				setTimeout( function() { window.location.href = "/login"; }, 5000 );
				
            },
            (error) => {
                alert('error: ' + error);
            }
        )
        .catch((error) => console.log(error))
}

function acceder() {

    var user = document.getElementById('txtUsuario').value;
    var pass = document.getElementById('txtPass').value;

    const data = new FormData();
    data.append('usuario', user);
    data.append('pass', pass);

    var url = 'http://localhost:3000/api/usuarios/login';

    Login(url, data);

}

function registro() {

    var correo = document.getElementById('txtCorreo').value;
    var nombre = document.getElementById('txtNombre').value;
	var usuario = document.getElementById('txtUsuario').value;
    var frase = document.getElementById('txtFrase').value;
	var pass = document.getElementById('txtPass').value;

	var mensaje = validaRegistro();

    if (mensaje === "") {
		
		var data = { username : usuario, password : pass, email: correo, nombre: nombre, bio: frase };

		var url = 'http://localhost:3000/api/usuarios/signup';

		Signup(url, data);
    } else {
        mensajeAlerta(mensaje);
    }  
}

function validaRegistro(){
	if (document.getElementById('txtCorreo').value == "")
        return "Debe ingresar un correo !!";
	else{
		if(!validarCorreo(document.getElementById('txtCorreo').value))
			return "Correo invalido !!";
	}
		

    if (document.getElementById('txtNombre').value == "")
        return "Debe ingresar un Nombre !!";

    if (document.getElementById('txtUsuario').value == "")
        return "Debe ingresar un usuario!!";
	
	if (document.getElementById('txtFrase').value == "")
        return "Debe ingresar una Frase !!";

    if (document.getElementById('txtPass').value == "")
        return "Debe ingresar un password!!";

    return '';
}

function validarCorreo(correo) {
	if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)){
		return true;
	} else {
		return false;
	}
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
