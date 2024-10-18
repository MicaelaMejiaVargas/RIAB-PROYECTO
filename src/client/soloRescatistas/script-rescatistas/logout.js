const btn = document.getElementById('btn-logout');
const token = localStorage.getItem("token"); 
const app = "http://localhost:3000";

function verificar(){
    if (!token) {
        alert("Acceso Denegado. Inicia Sesión para acceder a esta ruta.");
        window.location.href = '../pages/login.html'; //redirige a la página de inicio de sesión
        return;
    }

    //evento del btn Cerrar Sesión
    btn.addEventListener('click', logout);
}

async function logout() {
    try { //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
        const response = await fetch(`${app}/rescatistas/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // "Access-Control-Allow-Origin": "https://localhost:5500",
                "Access-Control-Allow-Credentials": true,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido en el servidor.');
        }

        const data = await response.json();
        alert(data.message);
        console.log(data.message);
        localStorage.removeItem('token');
        window.location.href = '../pages/login.html';

    } catch (error) {
        console.error('Error: ', error);
    }

}

verificar();
