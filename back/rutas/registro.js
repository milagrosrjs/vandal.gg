$(document).ready(function () {
    // Evento de clic en el botón de registro
    $('#btn-registrarse').click(function () {
        // Recopila los datos del formulario
        var nombre = $('#nombre').val();
        var email = $('#email').val();
        var contrasena = $('#contrasena').val();

        // Realiza una solicitud AJAX para enviar los datos al servidor
        $.ajax({
            url: '/registro', // Asegúrate de que esta sea la ruta correcta en tu servidor
            method: 'POST', // Debe ser POST para una solicitud POST
            data: {
                nombre: nombre,
                email: email,
                contrasena: contrasena
            },
            success: function (response) {
                // Maneja la respuesta del servidor, por ejemplo, muestra un mensaje de éxito o redirige a otra página.
                console.log('Registro exitoso:', response);
            },
            error: function (error) {
                // Maneja los errores, por ejemplo, muestra un mensaje de error.
                console.error('Error en el registro:', error);
            }
        });
        
    });
});