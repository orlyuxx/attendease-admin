async function handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://attendease-backend.test/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email: username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.token) {
            // Login successful
            localStorage.setItem('adminToken', data.token);
            window.location.href = 'dashboard.html'; // Redirect to admin dashboard
        } else {
            // Login failed
            console.error('Login failed:', data);
            showToast(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message);
    }
}

// Add this function to create and show a toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}

// Make sure this event listener is properly set up
document.getElementById('login-form').addEventListener('submit', handleSubmit);

// Check if user is already logged in
function checkAdminAuth() {
    const adminToken = localStorage.getItem('adminToken');
    const restrictedPages = ['dashboard.html', 'employees.html', 'departments.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (adminToken) {
        // User is logged in
        if (currentPage === 'index.html') {
            window.location.replace('dashboard.html');
        }
    } else {
        // User is not logged in
        if (restrictedPages.includes(currentPage)) {
            showToast('Please log in to access this page', 'error');
            window.location.replace('index.html');
        }
    }
}

// Run the check when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.display = 'none';
    checkAdminAuth();
    
    // If auth check passes, show content
    setTimeout(() => {
        document.body.style.display = '';
    }, 50);

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleSubmit);
    } else {
        console.error('Login form not found');
    }

    const inputs = document.querySelectorAll('.input-highlight input');
    const usernameInput = document.getElementById('username');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const highlight = this.parentElement;
            highlight.classList.remove('active');
            void highlight.offsetWidth; // Trigger reflow
            highlight.classList.add('active');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('active');
        });
    });

    const logoutButton = document.getElementById('logout-button'); // Adjust the ID as needed
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});


function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}

// Add this function to handle logout
async function handleLogout() {
    try {
        const response = await fetch('http://attendease-backend.test/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message); // Log the success message

        // Clear the token from localStorage
        localStorage.removeItem('adminToken');

        // Redirect to the login page
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('An error occurred during logout. Please try again.', 'error');
    }
}
