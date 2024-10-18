const razasPermitidas = {
    perro: ['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua', 'otro'],
    gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'cruza', 'otro'],
    loro: ['cacatúa', 'loro gris', 'amazonas', 'agaporni', 'loro de sol', 'otro'],
    tortuga: ['tortuga de tierra', 'tortuga de agua', 'tortuga de estanque', 'tortuga gigante', 'otro'],
    conejo: ['holland lop', 'rex', 'angora', 'mini rex', 'lionhead', 'otro'],
    pato: ['pato pekinés', 'pato muscovy', 'pato rizado', 'pato cayuga', 'pato rouen', 'otro']
};

const especieSelect = document.getElementById('especie');
const razaSelect = document.getElementById('raza');

especieSelect.addEventListener('change', function() {
    const especie = this.value;
    razaSelect.innerHTML = '<option value="">Seleccione una raza</option>';
    if (especie) {
        razasPermitidas[especie].forEach(raza => {
            const option = document.createElement('option');
            option.value = raza;
            option.textContent = raza;
            razaSelect.appendChild(option);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mascota-form');
    const submitButton = document.getElementById('btn-confirmar');

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;

        Array.from(form.elements).forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombreApodo = document.getElementById('nombreApodo').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('raza').value;
        const color = document.getElementById('color').value;
        const anioNacimiento = document.getElementById('anio_nacimiento').value;

        const mascotasData = {
            nombreApodo,
            especie,
            raza,
            color,
            anioNacimiento
        };

        try {
            const response = await fetch('http://localhost:3000/mascotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mascotasData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Registro exitoso: ' + data.message);
                form.reset();
                window.location.href = './soloRescatistas/inicio-res.html'; 
            } else {
                alert('Error: ' + (data.message || 'Error en el registro.'));
            }
        } catch (error) {
            console.error('Error al registrar la mascota:', error);
            alert('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
        }
    });
});
