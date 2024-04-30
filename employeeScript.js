// Function to populate employee detail modal with data
function populateEmployeeDetail(employeeData) {
    document.getElementById('employeeId').innerText = employeeData.id;
    document.getElementById('employeeEmployeeId').innerText = employeeData.employeeId;
    document.getElementById('employeeFirstName').innerText = employeeData.firstName;
    document.getElementById('employeeLastName').innerText = employeeData.lastName;
    document.getElementById('employeeEmail').innerText = employeeData.email;
    document.getElementById('employeeMobile').innerText = employeeData.mobile;
    document.getElementById('employeeJoiningDate').innerText = employeeData.joiningDate;
}

// Example employee data for four records
var employeesData = [
    {
        id: 1,
        employeeId: 403,
        firstName: 'Charan',
        lastName: 'Singh',
        email: 'charan@test.com',
        mobile: '+91-8919701146',
        joiningDate: '31st March 2023'
    },
    {
        id: 2,
        employeeId: 405,
        firstName: 'Swaroop',
        lastName: 'Teja',
        email: 'swaroop@test.com',
        mobile: '+91-8829602145',
        joiningDate: '21st September 2022'
    },
    {
        id: 3,
        employeeId: 429,
        firstName: 'Vishnu',
        lastName: 'Reddy',
        email: 'vishnu@test.com',
        mobile: '+91-8236703262',
        joiningDate: '19th November 2022'
    },
    {
        id: 4,
        employeeId: 447,
        firstName: 'Neeraj',
        lastName: 'Krishna',
        email: 'neeraj@test.com',
        mobile: '+91-7265312582',
        joiningDate: '24th June 2023'
    }
];

// Display details for the first employee by default
populateEmployeeDetail(employeesData[0]);

// Set event listeners to change employee details when clicking on different employees
for (let i = 0; i < employeesData.length; i++) {
    document.getElementById('employeeDetail' + (i + 1)).addEventListener('click', function() {
        changeEmployeeDetail(i);
    });
}

// Function to change employee details in the modal
function changeEmployeeDetail(index) {
    populateEmployeeDetail(employeesData[index]);
}

