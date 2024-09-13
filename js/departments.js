document.addEventListener('DOMContentLoaded', function() {
    fetchDepartments();

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
                <button class="text-blue-400 hover:text-blue-700 mr-2">Update</button>
                <button class="text-red-400 hover:text-red-700">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
