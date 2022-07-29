const submitButton = document.getElementById('submit');
const form = document.getElementById('form')

form.addEventListener('submit', () => {
    submitButton.disabled = true;
    submitButton.innerText = 'Loading...';
    const spinner = document.createElement('span');
    spinner.classList.add('spinner-border', 'spinner-border-sm')
    spinner.role = 'status';
    submitButton.appendChild(spinner);
})