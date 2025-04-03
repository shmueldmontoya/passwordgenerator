// Actualizar el valor del slider dinámicamente
function updateLengthValue(value) {
    document.getElementById('lengthValue').textContent = value;
}

// Validar que al menos una casilla esté marcada
function validateCheckboxes() {
    const checkboxes = [
        document.getElementById('includeUppercase'),
        document.getElementById('includeLowercase'),
        document.getElementById('includeNumbers'),
        document.getElementById('includeSpecialChars')
    ];
    return checkboxes.some(checkbox => checkbox.checked);
}

// Generar contraseña
function generatePassword(length, options) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = '';
    if (options.includeUppercase) charPool += uppercaseChars;
    if (options.includeLowercase) charPool += lowercaseChars;
    if (options.includeNumbers) charPool += numberChars;
    if (options.includeSpecialChars) charPool += specialChars;

    if (charPool === '') return ''; // Si no hay caracteres disponibles, devolver vacío

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }
    return password;
}

// Manejar el envío del formulario
document.getElementById('passwordForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    const length = parseInt(document.getElementById('length').value, 10);
    const options = {
        includeUppercase: document.getElementById('includeUppercase').checked,
        includeLowercase: document.getElementById('includeLowercase').checked,
        includeNumbers: document.getElementById('includeNumbers').checked,
        includeSpecialChars: document.getElementById('includeSpecialChars').checked
    };

    // Validar que al menos una casilla esté marcada
    if (!validateCheckboxes()) {
        alert('Por favor, selecciona al menos una opción (mayúsculas, minúsculas, números o caracteres especiales).');
        return;
    }

    // Generar la contraseña
    const password = generatePassword(length, options);
    document.getElementById('generatedPassword').textContent = password;
});

// Copiar contraseña al portapapeles
document.getElementById('copyPasswordButton').addEventListener('click', () => {
    const password = document.getElementById('generatedPassword').textContent;
    const copyMessage = document.querySelector('.copy-message');

    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            // Mostrar el mensaje de copiado
            copyMessage.classList.add('visible');
            setTimeout(() => {
                copyMessage.classList.remove('visible');
            }, 2000); // Ocultar el mensaje después de 2 segundos
        }).catch(err => {
            console.error('Error al copiar la contraseña:', err);
        });
    }
});