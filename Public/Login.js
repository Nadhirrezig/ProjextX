window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            const loginForm = document.querySelector('form.Login');
            loadingScreen.style.opacity = '1';
            loginForm.classList.add('show');
        }, 1000);
    }, 2000);
});