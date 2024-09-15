let departments = {};
let employees = [];
let currentSort = { column: null, direction: 'asc' };

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
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://attendease-backend.test/api/department', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Departments Data:', data);

        if (data.length === 0) {
            console.warn('No departments returned from API');
        }

        // Populate departments object with correct property names
        departments = data.reduce((acc, dept) => {
            acc[dept.department_id] = dept.department_name;
            return acc;
        }, {});
        console.log('Departments Object:', departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        showToast('Failed to fetch departments: ' + error.message, 'error');
    }
}

async function fetchEmployees() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://attendease-backend.test/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        employees = await response.json();
        console.log('Employees Data:', employees);

        if (employees.length === 0) {
            console.warn('No employees returned from API');
            showToast('No employees found', 'warning');
        }

        displayEmployees(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        showToast('Failed to fetch employees: ' + error.message, 'error');
    }
}

function displayEmployees(employeesToDisplay) {
    const tableBody = document.getElementById('employeesTableBody');
    tableBody.innerHTML = '';

    if (employeesToDisplay.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center py-4">No employees found</td>';
        tableBody.appendChild(row);
        return;
    }

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

function deleteEmployee(employeeId) {
    showDeleteConfirmationModal(employeeId);
}

function showDeleteConfirmationModal(employeeId) {
    const modal = document.getElementById('deleteConfirmationModal');
    const confirmBtn = document.getElementById('deleteConfirmBtn');
    const cancelBtn = document.getElementById('deleteCancelBtn');
    const employeeNameSpan = document.getElementById('employeeNameToDelete');

    // Find the employee by ID
    const employeeToDelete = employees.find(emp => emp.employee_id === employeeId);

    if (employeeToDelete) {
        employeeNameSpan.textContent = employeeToDelete.name;
    } else {
        employeeNameSpan.textContent = 'Unknown Employee';
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }, 10);

    confirmBtn.onclick = async () => {
        hideDeleteConfirmationModal();
        await performDeleteEmployee(employeeId);
    };

    cancelBtn.onclick = hideDeleteConfirmationModal;
}

function hideDeleteConfirmationModal() {
    const modal = document.getElementById('deleteConfirmationModal');
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

async function performDeleteEmployee(employeeId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://attendease-backend.test/api/user/${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error deleting employee');
        }

        showToast('Employee deleted successfully', 'success');
        await fetchEmployees();
    } catch (error) {
        console.error('Error deleting employee:', error);
        showToast('An error occurred while deleting the employee: ' + error.message, 'error');
    }
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

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastContent = document.getElementById('toastContent');
    
    toastContent.textContent = message;
    toast.classList.remove('bg-green-500', 'bg-red-500');
    toast.classList.add(type === 'success' ? 'bg-green-500' : 'bg-red-500');
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

document.getElementById('addEmployeeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const payload = Object.fromEntries(formData.entries());

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://attendease-backend.test/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating user');
        }

        showToast('Employee added successfully', 'success');
        document.getElementById('addEmployeeModal').classList.add('hidden');
        this.reset();
        await fetchEmployees();
    } catch (error) {
        console.error('Error:', error);
        showToast('Error creating employee: ' + error.message, 'error');
    }
});
