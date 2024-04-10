
function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const numbers = document.querySelector('#include_numbers').checked;
    const specialCharacter = document.querySelector('#include_special_chars').checked;

    const chartTypes = [];
    if (uppercase) {
        chartTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (lowercase) {
        chartTypes.push('abcdefghijklmnopqrstuvwxyz');
    }
    if (numbers) {
        chartTypes.push('0123456789');
    }
    if (specialCharacter) {
        chartTypes.push('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
    }
    return chartTypes;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 1 || size > 128) {
        
       message ('Password size must be between 1 and 128 characters', 'warning' )
    }
        return size;
    
}

function message (text, status = 'success') {
    Toastify ({
        text: text,
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: status === 'success' ? '#5a80f7' : '#f44336',
        }
        
    }).showToast();
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(size, chartTypes) {
    let passwordGenerate = '';

    while (passwordGenerate.length < size) {
        passwordGenerate += randomCharType(chartTypes);
    }

    return passwordGenerate;

}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    const chartTypes = getChartTypes();
    
    if (!size) {
        return;
    }
    if (!chartTypes.length) {
        message ('Please select at least one chart type', 'warning' )
        return;
    }

    const passwordGenerate = generatePassword(size, chartTypes);
    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerate;
});

document.querySelector('#copy').addEventListener('click',  function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message ('Password copied to clipboard', 'success' );

    
});




