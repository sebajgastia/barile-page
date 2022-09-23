
//API FORMULARIO PARA ENVIOS

const btn = document.getElementById('button2');

document.getElementById('formulario2')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_r6sdefh';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('ENVIADO, en breve te mandamos presupuesto de envio.Muchas gracias!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});