let departments = {};

document.addEventListener('DOMContentLoaded', function() {
    fetchDepartments().then(() => {
        fetchEmployees();
    });

    // Add event listener for logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

async function fetchDepartments() {
    try {
        const response = await fetch('http://attendease-backend.test/api/department');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Departments Data:', data);

        // Populate departments object with correct property names
        departments = data.reduce((acc, dept) => {
            acc[dept.department_id] = dept.department_name;
            return acc;
        }, {});
        console.log('Departments Object:', departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
}

async function fetchEmployees() {
    try {
        const response = await fetch('http://attendease-backend.test/api/user');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Employees Data:', data); // Log the employee data to verify
        displayEmployees(data);
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

function displayEmployees(employees) {
    const tableBody = document.getElementById('employeesTableBody');
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.classList.add('border-b');
        row.innerHTML = `
            <td class="py-3 px-4">${employee.name}</td>
            <td class="py-3 px-4">${employee.email}</td>
            <td class="py-3 px-4">${getDepartmentName(employee.department_id)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function getDepartmentName(departmentId) {
    return departments[departmentId] || 'N/A'; // Ensure this returns the correct name
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
