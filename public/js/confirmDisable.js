const commonNameInput = document.getElementById('commonName');
const disableUserButton = document.getElementById('submit');

console.log(userToDisable)

const inputMatch = function () {
    if (commonNameInput.value === userToDisable) {
        disableUserButton.disabled = false;
    } else {
        disableUserButton.disabled = true;
    }
}

commonNameInput.addEventListener('input', inputMatch);