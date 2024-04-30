var editEmployeeIdx = null;
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
        joiningDate: '2023-03-31',
        jobType: 'Data Analyst'
    },
    {
        id: 2,
        employeeId: 405,
        firstName: 'Swaroop',
        lastName: 'Teja',
        email: 'swaroop@test.com',
        mobile: '+91-8829602145',
        joiningDate: '2022-09-21',
        jobType: 'Data Engineer'
    },
    {
        id: 3,
        employeeId: 429,
        firstName: 'Vishnu',
        lastName: 'Reddy',
        email: 'vishnu@test.com',
        mobile: '+91-8236703262',
        joiningDate: '2022-11-19',
        jobType: 'Data Scientist'
    },
    {
        id: 4,
        employeeId: 447,
        firstName: 'Neeraj',
        lastName: 'Krishna',
        email: 'neeraj@test.com',
        mobile: '+91-7265312582',
        joiningDate: '2023-06-23',
        jobType: 'Web Developer'
    }
];

// Display details for the first employee by default
populateEmployeeDetail(employeesData[0]);


// Function to display employees in the table
function displayEmployees() {
    const employeesTable = document.querySelector('.table-bordered');
    employeesTable.innerHTML = `
        <tr class="table-secondary text-center">
            <th>Id</th>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
    `;

    employeesData.forEach((employee, idx) => {
        employeesTable.innerHTML += `
            <tr class="text-center">
                <td>${idx + 1}</td>
                <td>${employee.employeeId}</td>
                <td>${employee.firstName} ${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>
                    <button class="btn btn-sm btn-info me-2" data-bs-toggle="modal"
                        data-bs-target="#employeeDetailModal" onclick="populateEmployeeDetail(employeesData[${idx}]);">
                        Details
                    </button>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal"
                        data-bs-target="#employeeUpdateModal" onclick="handleEditButtonClick(${idx});">
                        Edit
                    </button>
                    <button class="btn btn-sm btn-danger" data-bs-toggle="modal"
                        data-bs-target="#employeeDeleteModal" onclick="handleRemoveButtonClick(${idx});">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Function to generate a random employee ID
function generateEmployeeId() {
    // Generate a random 3-digit employee ID
    return Math.floor(100 + Math.random() * 900);
}

// Function to populate the Add Employee modal
document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const firstName = document.getElementById('employeeFirstNameInput').value;
    const lastName = document.getElementById('employeeLastNameInput').value;
    const email = document.getElementById('employeeEmailInput').value;
    const mobile = document.getElementById('employeePhoneInput').value;
    const joiningDate = document.getElementById('employeeJoiningDateInput').value;
    const jobType = document.getElementById('employeeJobTypeInput').value;

    // Add the new employee to the employeesData array
    const newEmployee = {
        id: employeesData.length + 1,
        employeeId: generateEmployeeId(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        joiningDate: joiningDate,
        jobType: jobType
    };
    employeesData.push(newEmployee);

    // Close the modal
    const addEmployeeModal = bootstrap.Modal.getInstance(document.getElementById('addEmployee'));
    addEmployeeModal.hide();

    // Update the displayed employees list
    displayEmployees();

    // Reset the form
    document.getElementById('addEmployeeForm').reset();
});


function handleEditFromDetailClick() {
    const editModal = document.getElementById('employeeUpdateModal');
    const employeeId = document.getElementById('employeeEmployeeId').innerText;

    // Find the index of the employee in employeesData array based on employeeId
    const empIdx = employeesData.findIndex(employee => employee.employeeId === parseInt(employeeId));

    editEmployeeIdx = empIdx;

    // Populate the Edit modal with employee data
    populateEditModal(empIdx);

    const updatingForm = document.querySelector('#employeeUpdateModal form');
    updatingForm.removeEventListener('submit', saveEmployeeChanges);
    updatingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveEmployeeChanges();
    });
}


// Function to populate the Edit modal with employee data
function populateEditModal(empIdx) {
    const employeeContent = employeesData[empIdx];
    const editModal = document.getElementById('employeeUpdateModal');
    editModal.querySelector('#editEmployeeId').value = employeeContent.employeeId;
    editModal.querySelector('#editEmployeeFirstName').value = employeeContent.firstName;
    editModal.querySelector('#editEmployeeLastName').value = employeeContent.lastName;
    editModal.querySelector('#editEmployeeEmail').value = employeeContent.email;
    editModal.querySelector('#editEmployeePhone').value = employeeContent.mobile;
    editModal.querySelector('#editEmployeeJoiningDate').value = employeeContent.joiningDate;
    editModal.querySelector('#editEmployeeJobType').value = employeeContent.jobType;

    editEmployeeIdx = empIdx;
}

// Function to handle Edit button click
function handleEditButtonClick(empIdx) {
    editEmployeeIdx = empIdx;
    populateEditModal(empIdx);

    // Add event listener for form submission
    const editForm = document.querySelector('#employeeUpdateModal form');
    editForm.removeEventListener('submit', saveEmployeeChanges); // Remove any existing listener
    editForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior
        saveEmployeeChanges(); // Call saveEmployeeChanges function
    });
}
// Function to save changes made to an employee
function saveEmployeeChanges(empIdx) {
    const editModal = document.getElementById('employeeUpdateModal');
    employeesData[editEmployeeIdx].employeeId = editModal.querySelector('#editEmployeeId').value;
    employeesData[editEmployeeIdx].firstName = editModal.querySelector('#editEmployeeFirstName').value;
    employeesData[editEmployeeIdx].lastName = editModal.querySelector('#editEmployeeLastName').value;
    employeesData[editEmployeeIdx].email = editModal.querySelector('#editEmployeeEmail').value;
    employeesData[editEmployeeIdx].mobile = editModal.querySelector('#editEmployeePhone').value;
    employeesData[editEmployeeIdx].joiningDate = editModal.querySelector('#editEmployeeJoiningDate').value;
    employeesData[editEmployeeIdx].jobType = editModal.querySelector('#editEmployeeJobType').value;

    // Close the modal
    const editModalInstance = bootstrap.Modal.getInstance(editModal);
    editModalInstance.hide();

    // Update the displayed employees list
    displayEmployees();
}

// Function to populate the Remove modal with employee data
function populateRemoveModal(empIdx) {
    const employeeContent = employeesData[empIdx];
    const removeModal = document.getElementById('employeeDeleteModal');
    removeModal.querySelector('#deleteEmployeeName').innerHTML = employeeContent.firstName + ' ' + employeeContent.lastName;
    removeModal.querySelector('#deleteEmployeeConfirm').addEventListener('click', function () {
        deleteEmployee(empIdx);
    });
}

// Function to handle Remove button click
function handleRemoveButtonClick(empIdx) {
    populateRemoveModal(empIdx);
}

// Function to delete an employee
function deleteEmployee(empIdx) {
    employeesData.splice(empIdx, 1);

    // Close the modal
    const closingModal = document.getElementById('employeeDeleteModal');
    const deleteModalInstance = bootstrap.Modal.getInstance(closingModal);
    deleteModalInstance.hide();

    // Update the displayed employees list
    displayEmployees();
}

// Initial display of employees
displayEmployees();