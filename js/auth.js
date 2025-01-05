export function initAuth() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('rememberMe').checked;

            try {
                // Simulate authentication - Replace with your actual auth logic
                await authenticateUser(email, password);
                if (remember) {
                    localStorage.setItem('moonClientAuth', 'true');
                }
                window.location.href = 'packages.html';
            } catch (error) {
                alert('Login failed: ' + error.message);
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('moonClientAuth');
            window.location.href = 'index.html';
        });
    }

    // Check authentication status
    checkAuth();
}

async function authenticateUser(email, password) {
    // Simulate API call - Replace with your actual authentication API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email && password) {
                resolve({ success: true });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
}

function checkAuth() {
    const isAuthPage = window.location.pathname.includes('index.html');
    const isAuthenticated = localStorage.getItem('moonClientAuth') === 'true';

    if (!isAuthPage && !isAuthenticated) {
        window.location.href = 'index.html';
    } else if (isAuthPage && isAuthenticated) {
        window.location.href = 'packages.html';
    }
}