document.addEventListener('DOMContentLoaded', function() {
    fetchDepartments();

    // Add event listener for logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function fetchDepartments() {
    fetch('http://attendease-backend.test/api/department')
        .then(response => response.json())
        .then(data => {
            displayDepartments(data);
        })
        .catch(error => {
            console.error('Error fetching departments:', error);
        });
}

function displayDepartments(departments) {
    const tableBody = document.getElementById('departmentsTableBody');
    tableBody.innerHTML = '';

    departments.forEach((department, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b');
        row.innerHTML = `
            <td class="py-3 px-4">${index + 1}</td>
            <td class="py-3 px-4">${department.department_name}</td>
            <td class="py-3 px-4">
                <button class="text-blue-500 hover:text-blue-700 mr-2">Update</button>
                <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

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
        alert('An error occurred during logout. Please try again.');
    }
}