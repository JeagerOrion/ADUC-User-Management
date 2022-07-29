const submitButton = document.getElementById('submit');
const form = document.getElementById('form');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputEmailDomain = document.getElementById('emailDomain');
const inputOffice = document.getElementById('office');
const inputJobTitle = document.getElementById('jobTitle');
const inputSupervisorEmail = document.getElementById('supervisorEmail');

let isValid = true

const invalidate = function (e) {
    console.log('invalid')
    isValid = false;
    e.preventDefault();
}

form.addEventListener('submit', function (e) {

    isValid = true

    console.log('invalid precheck is ' + isValid)

    inputFirstName.addEventListener('invalid', invalidate)

    inputEmailDomain.addEventListener('invalid', invalidate)

    inputOffice.addEventListener('invalid', invalidate)

    inputJobTitle.addEventListener('invalid', invalidate)

    inputSupervisorEmail.addEventListener('invalid', invalidate)


    console.log('isValid postcheck is ' + isValid);

    if (isValid) {
        submitButton.disabled = true;
        submitButton.innerText = 'Loading...';
        const spinner = document.createElement('span');
        spinner.classList.add('spinner-border', 'spinner-border-sm')
        spinner.role = 'status';
        submitButton.appendChild(spinner);
    } else {
        e.preventDefault();
    }
})



