function realizarOperaciones() {
    // Obtención de los valores ingresados por el usuario
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let resultDiv = document.getElementById('result');
    
    // Limpiar resultados previos
    resultDiv.innerHTML = ''; 

    // Bucle para realizar las 5 operaciones
    for (let i = 1; i <= 5; i++) {
        let result;
        switch (i) {
            case 1:
                result = num1 + num2;
                resultDiv.innerHTML += `<p>Iteración ${i}: Suma = ${result}</p>`;
                break;
            case 2:
                result = num1 - num2;
                resultDiv.innerHTML += `<p>Iteración ${i}: Resta = ${result}</p>`;
                break;
            case 3:
                result = num1 * num2;
                resultDiv.innerHTML += `<p>Iteración ${i}: Multiplicación = ${result}</p>`;
                break;
            case 4:
                result = num2 !== 0 ? num1 / num2 : 'Error (división por cero)';
                resultDiv.innerHTML += `<p>Iteración ${i}: División = ${result}</p>`;
                break;
            case 5:
                result = num2 !== 0 ? num1 % num2 : 'Error (modulo por cero)';
                resultDiv.innerHTML += `<p>Iteración ${i}: Módulo = ${result}</p>`;
                break;
            default:
                break;
        }
    }
}
