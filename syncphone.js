// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('quick-input-form');
//     const syncButton = document.getElementById('sync-btn');
//     const syncStatus = document.getElementById('sync-status');
//     const inputField = form.querySelector('input');

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const phoneType = inputField.value.trim().toLowerCase();

//         if (phoneType === 'iphone') {
//             displayMessage('iPhone detected! Ready to sync.');
//         } else if (phoneType === 'android') {
//             displayMessage('Android detected! Ready to sync.');
//         } else {
//             displayMessage('Unknown phone type. Please enter "iPhone" or "Android".');
//         }
//     });

//     syncButton.addEventListener('click', () => {
//         syncStatus.classList.remove('hidden');
//         syncStatus.textContent = 'Sync in progress... Please wait.';
        
//         setTimeout(() => {
//             syncStatus.textContent = 'Sync complete!';
//         }, 2000);
//     });

//     function displayMessage(message) {
//         syncStatus.classList.remove('hidden');
//         syncStatus.textContent = message;
//     }
// });
