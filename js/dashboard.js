let employeeAttendanceChart;
let currentData;

function generateDataKey(year, month) {
    return `attendanceData_${year}_${month}`;
}

function saveData(year, month, data) {
    localStorage.setItem(generateDataKey(year, month), JSON.stringify(data));
}

function loadData(year, month) {
    const savedData = localStorage.getItem(generateDataKey(year, month));
    return savedData ? JSON.parse(savedData) : null;
}

function fetchMonthlyData(year, month) {
    const savedData = loadData(year, month);
    if (savedData) {
        return savedData;
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const daysInMonth = getDaysInMonth(year, month);
    const lastDay = (year < currentYear || (year === currentYear && month < currentMonth)) 
        ? daysInMonth 
        : (year === currentYear && month === currentMonth) 
            ? currentDay 
            : 0;

    const labels = [...Array(daysInMonth).keys()].map(i => i + 1);
    const presentEmployees = [];
    const absentEmployees = [];
    const employeesOnLeave = [];

    // Randomly select up to 8 days for employees to be on leave
    const leaveDays = new Set();
    const maxLeaveDays = Math.min(8, lastDay);
    while (leaveDays.size < maxLeaveDays) {
        leaveDays.add(Math.floor(Math.random() * lastDay));
    }

    for (let i = 0; i < daysInMonth; i++) {
        if (i < lastDay) {
            let present, onLeave, absent;

            if (leaveDays.has(i)) {
                // Day with employees on leave
                onLeave = Math.floor(Math.random() * 3) + 1; // 1 to 3 employees on leave
                absent = Math.floor(Math.random() * 4) + 1; // 1 to 4 employees absent
                present = 138 - onLeave - absent;
            } else {
                // Regular day
                onLeave = 0;
                if (Math.random() < 0.3) { // 30% chance of perfect attendance
                    present = 138;
                    absent = 0;
                } else {
                    absent = Math.floor(Math.random() * 5) + 1; // 1 to 5 employees absent
                    present = 138 - absent;
                }
            }

            presentEmployees.push(present);
            absentEmployees.push(absent);
            employeesOnLeave.push(onLeave);
        } else {
            // Future days: push null values
            presentEmployees.push(null);
            absentEmployees.push(null);
            employeesOnLeave.push(null);
        }
    }

    const data = { labels, presentEmployees, absentEmployees, employeesOnLeave };
    saveData(year, month, data);
    return data;
}

function updateChart() {
    const selectedYear = parseInt(document.getElementById('yearSelector').value);
    const selectedMonth = parseInt(document.getElementById('monthSelector').value);

    currentData = fetchMonthlyData(selectedYear, selectedMonth);

    employeeAttendanceChart.data.labels = currentData.labels;
    employeeAttendanceChart.data.datasets[0].data = currentData.presentEmployees;
    employeeAttendanceChart.data.datasets[1].data = currentData.absentEmployees;
    employeeAttendanceChart.data.datasets[2].data = currentData.employeesOnLeave;
    employeeAttendanceChart.update();

    updateDashboardCards();

    console.log('Chart updated for:', { selectedYear, selectedMonth });
}

function updateChartAndCards() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Update the current date display
    document.getElementById('currentDate').textContent = formatDate(now);

    // Set the selectors to the current year and month
    document.getElementById('yearSelector').value = currentYear;
    document.getElementById('monthSelector').value = currentMonth;

    currentData = fetchMonthlyData(currentYear, currentMonth);

    // Update the chart
    employeeAttendanceChart.data.labels = currentData.labels;
    employeeAttendanceChart.data.datasets[0].data = currentData.presentEmployees;
    employeeAttendanceChart.data.datasets[1].data = currentData.absentEmployees;
    employeeAttendanceChart.data.datasets[2].data = currentData.employeesOnLeave;
    employeeAttendanceChart.update();

    // Update the dashboard cards
    updateDashboardCards();

    console.log('Chart data updated:', currentData);
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('employeeAttendanceChart').getContext('2d');
    const yearSelector = document.getElementById('yearSelector');
    const monthSelector = document.getElementById('monthSelector');

    // Populate year selector
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelector.appendChild(option);
    }

    // Set default date to current month and year
    yearSelector.value = currentYear;
    monthSelector.value = new Date().getMonth();

    employeeAttendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Present Employees',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                },
                {
                    label: 'Absent Employees',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    tension: 0.1
                },
                {
                    label: 'Employees on Leave',
                    data: [],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 140
                }
            }
        }
    });

    // Add this line to update the current date immediately
    document.getElementById('currentDate').textContent = formatDate(new Date());

    // Event listeners for inputs
    yearSelector.addEventListener('change', updateChart);
    monthSelector.addEventListener('change', updateChart);

    // Initial chart update
    updateChart();

    // Update chart and cards every minute
    setInterval(updateChartAndCards, 60000);

    // Add event listener for logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

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
        alert('An error occurred during logout. Please try again.');
    }
}

function updateDashboardCards() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate() - 1; // Adjust for 0-based index

    const totalEmployees = 138;
    let presentToday, absentToday, onLeaveToday;

    // Always load the current month's data for the cards
    const currentMonthData = loadData(currentYear, currentMonth);

    if (currentMonthData && currentMonthData.presentEmployees[currentDay] !== null) {
        presentToday = currentMonthData.presentEmployees[currentDay];
        absentToday = currentMonthData.absentEmployees[currentDay];
        onLeaveToday = currentMonthData.employeesOnLeave[currentDay];
    } else {
        // If data for the current day doesn't exist, generate it
        let data = fetchMonthlyData(currentYear, currentMonth);
        presentToday = data.presentEmployees[currentDay];
        absentToday = data.absentEmployees[currentDay];
        onLeaveToday = data.employeesOnLeave[currentDay];
        
        // Save the updated data
        saveData(currentYear, currentMonth, data);
    }

    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('presentToday').textContent = presentToday;
    document.getElementById('absentToday').textContent = absentToday;
    document.getElementById('onLeaveToday').textContent = onLeaveToday;

    console.log('Dashboard updated:', { totalEmployees, presentToday, absentToday, onLeaveToday });
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}