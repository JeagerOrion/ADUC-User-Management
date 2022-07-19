const commonNameInput = document.getElementById('commonName');
const disableUserButton = document.getElementById('disableUserButton');

console.log(userToDisable)

const inputMatch = function () {
    if (commonNameInput.value === userToDisable) {
        disableUserButton.disabled = false;
    }
}

commonNameInput.addEventListener('input', inputMatch);