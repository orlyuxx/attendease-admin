let departments = {};
let employees = [];
let currentSort = { column: null, direction: 'asc' };

// Add these variables at the top of the file
let toastTimeout;
let deleteEmployeeId;

document.addEventListener('DOMContentLoaded', function() {
    fetchDepartments().then(() => {
        fetchEmployees();
    });

    // Add event listeners for sorting
    document.getElementById('sortBy').addEventListener('change', sortEmployees);
    document.getElementById('sortDirection').addEventListener('click', toggleSortDirection);
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
        employees = await response.json();
        console.log('Employees Data:', employees);
        displayEmployees(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

function displayEmployees(employeesToDisplay) {
    const tableBody = document.getElementById('employeesTableBody');
    tableBody.innerHTML = '';

    employeesToDisplay.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.classList.add(index % 2 === 0 ? 'bg-white' : 'bg-gray-100');
        row.innerHTML = `
            <td class="text-xs py-3 px-4 border-b border-r-2 border-white">${formatEmployeeId(employee.employee_id)}</td>
            <td class="text-xs py-3 px-4 border-b border-r-2 border-white">${employee.name}</td>
            <td class="text-xs py-3 px-4 border-b border-r-2 border-white">${getDepartmentName(employee.department_id)}</td>
            <td class="text-xs py-3 px-4 border-b border-r-2 border-white">${employee.email}</td>
            <td class="py-3 px-4 border-b border-white">
                <button onclick="updateEmployee(${employee.employee_id})" class="text-xs text-blue-500 hover:text-blue-700 font-semibold mr-3">
                    Update
                </button>
                <button onclick="deleteEmployee(${employee.employee_id})" class="text-xs text-red-500 hover:text-red-700 font-semibold">
                    Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function formatEmployeeId(id) {
    return id.toString().padStart(3, '0');
}

function getDepartmentName(departmentId) {
    return departments[departmentId] || 'N/A'; // Ensure this returns the correct name
}

function updateEmployee(employeeId) {
    console.log(`Update employee with ID: ${employeeId}`);
    // Implement update logic here
}

async function deleteEmployee(employeeId) {
    deleteEmployeeId = employeeId;
    document.getElementById('deleteConfirmationModal').classList.remove('hidden');
}

// Add this function to handle the actual deletion
async function confirmDeleteEmployee() {
    try {
        const response = await fetch(`http://attendease-backend.test/api/user/${deleteEmployeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error deleting employee');
        }

        console.log(`Employee with ID: ${deleteEmployeeId} deleted successfully`);
        await fetchEmployees();
        showToast('Employee deleted successfully');
    } catch (error) {
        console.error('Error deleting employee:', error);
        showToast('An error occurred while deleting the employee: ' + error.message, true);
    } finally {
        document.getElementById('deleteConfirmationModal').classList.add('hidden');
    }
}

// Add this function to show toast notifications
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden', 'bg-green-500', 'bg-red-500');
    toast.classList.add(isError ? 'bg-red-500' : 'bg-green-500');
    toast.classList.add('flex');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function sortEmployees() {
    const sortBy = document.getElementById('sortBy').value;
    if (!sortBy) return; // Don't sort if no option is selected

    employees.sort((a, b) => {
        let valueA, valueB;

        if (sortBy === 'employee_id') {
            valueA = a.employee_id;
            valueB = b.employee_id;
        } else if (sortBy === 'name') {
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
        } else if (sortBy === 'department') {
            valueA = getDepartmentName(a.department_id).toLowerCase();
            valueB = getDepartmentName(b.department_id).toLowerCase();
        }

        if (valueA < valueB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    displayEmployees(employees);
}

function toggleSortDirection() {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    document.getElementById('sortDirection').textContent = currentSort.direction === 'asc' ? '↑' : '↓';
    sortEmployees();
}

document.addEventListener('DOMContentLoaded', function() {
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    const cancelAddEmployee = document.getElementById('cancelAddEmployee');
    const addEmployeeForm = document.getElementById('addEmployeeForm');

    addEmployeeBtn.addEventListener('click', function() {
        addEmployeeModal.classList.remove('hidden');
    });

    cancelAddEmployee.addEventListener('click', function() {
        addEmployeeModal.classList.add('hidden');
    });

    addEmployeeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your server
        // For now, we'll just log the form data and close the modal
        const formData = new FormData(addEmployeeForm);
        console.log(Object.fromEntries(formData));
        addEmployeeModal.classList.add('hidden');
        addEmployeeForm.reset();
    });
});

// Add event listeners for the delete confirmation modal
document.addEventListener('DOMContentLoaded', function() {
    const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
    const deleteCancelBtn = document.getElementById('deleteCancelBtn');

    deleteConfirmBtn.addEventListener('click', confirmDeleteEmployee);
    deleteCancelBtn.addEventListener('click', function() {
        document.getElementById('deleteConfirmationModal').classList.add('hidden');
    });
});

document.getElementById('addEmployeeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(this);
    const payload = Object.fromEntries(formData);

    // Convert numeric fields to integers
    payload.department_id = parseInt(payload.department_id, 10);
    payload.shift_id = parseInt(payload.shift_id, 10);

    try {
        const response = await fetch('http://attendease-backend.test/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error creating user');
        }

        console.log('User created successfully:', data);
        this.reset();
        document.getElementById('addEmployeeModal').classList.add('hidden');
        
        await fetchEmployees();
        
        showToast('User created successfully');
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred: ' + error.message, true);
    }
});
