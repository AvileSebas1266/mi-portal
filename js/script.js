document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContacto');

  // Solo ejecuta si la página actual tiene el formulario
  if (!form) return;

  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const selectDestino = document.getElementById('destino');
  const textareaMensaje = document.getElementById('mensaje');
  const checkTerminos = document.getElementById('terminos');
  const mensajeExito = document.getElementById('mensajeExito');

  // Funciones de validación
  const validarNombre = () => {
    const valor = inputNombre.value.trim();
    if (valor.length >= 3) {
      marcarValido(inputNombre, 'errorNombre');
      return true;
    } else {
      marcarInvalido(inputNombre, 'errorNombre', 'El nombre debe tener mínimo 3 caracteres.');
      return false;
    }
  };

  const validarEmail = () => {
    const valor = inputEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(valor)) {
      marcarValido(inputEmail, 'errorEmail');
      return true;
    } else {
      marcarInvalido(inputEmail, 'errorEmail', 'Ingrese un correo electrónico válido.');
      return false;
    }
  };

  const validarDestino = () => {
    if (selectDestino.value !== "") {
      marcarValido(selectDestino, 'errorDestino');
      return true;
    } else {
      marcarInvalido(selectDestino, 'errorDestino', 'Debe seleccionar un destino de interés.');
      return false;
    }
  };

  const validarMensaje = () => {
    const valor = textareaMensaje.value.trim();
    if (valor.length >= 20) {
      marcarValido(textareaMensaje, 'errorMensaje');
      return true;
    } else {
      marcarInvalido(textareaMensaje, 'errorMensaje', `El mensaje debe tener mínimo 20 caracteres (actual: ${valor.length}).`);
      return false;
    }
  };

  const validarTerminos = () => {
    if (checkTerminos.checked) {
      marcarValido(checkTerminos, 'errorTerminos');
      return true;
    } else {
      marcarInvalido(checkTerminos, 'errorTerminos', 'Debe aceptar los términos y condiciones.');
      return false;
    }
  };

  function marcarValido(elemento, idError) {
    elemento.classList.remove('is-invalid');
    elemento.classList.add('is-valid');
    const spanError = document.getElementById(idError);
    if (spanError) spanError.textContent = '';
  }

  function marcarInvalido(elemento, idError, mensaje) {
    elemento.classList.remove('is-valid');
    elemento.classList.add('is-invalid');
    const spanError = document.getElementById(idError);
    if (spanError) spanError.textContent = mensaje;
  }

  // Validación en tiempo real (mientras el usuario escribe)
  inputNombre.addEventListener('input', validarNombre);
  inputEmail.addEventListener('input', validarEmail);
  selectDestino.addEventListener('change', validarDestino);
  textareaMensaje.addEventListener('input', validarMensaje);
  checkTerminos.addEventListener('change', validarTerminos);

  // Evento al presionar enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const okNombre = validarNombre();
    const okEmail = validarEmail();
    const okDestino = validarDestino();
    const okMensaje = validarMensaje();
    const okTerminos = validarTerminos();

    if (okNombre && okEmail && okDestino && okMensaje && okTerminos) {
      mensajeExito.classList.remove('d-none');
      form.reset();

      [inputNombre, inputEmail, selectDestino, textareaMensaje, checkTerminos].forEach(el => {
        el.classList.remove('is-valid');
      });

      setTimeout(() => {
        mensajeExito.classList.add('d-none');
      }, 5000);
    }
  });
});