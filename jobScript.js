var editJobIdx = null;
// Function to populate job detail modal with data
function populateJobDetail(jobData) {
    document.getElementById('jobId').innerText = jobData.id;
    document.getElementById('jobJobId').innerText = jobData.jobId;
    document.getElementById('jobDate').innerText = jobData.openingDate;
    document.getElementById('jobName').innerText = jobData.jobName;
}

// Example job data for four records
var jobsData = [
    {
        id: 1,
        jobId: 123,
        openingDate: '2023-03-31',
        jobName: 'Data Analyst'
    },
    {
        id: 2,
        jobId: 456,
        openingDate: '2022-09-21',
        jobName: 'Data Engineer'
    },
    {
        id: 3,
        jobId: 789,
        openingDate: '2022-11-19',
        jobName: 'Data Scientist'
    },
    {
        id: 4,
        jobId: 345,
        openingDate: '2023-06-23',
        jobName: 'Web Developer'
    }
];

// Display details for the first job by default
populateJobDetail(jobsData[0]);

function displayJobs() {
    const jobsTable = document.querySelector('.table-bordered');
    jobsTable.innerHTML = `
        <tr class="table-secondary text-center">
            <th>Id</th>
            <th>Job Name</th>
            <th>Action</th>
        </tr>
    `;

    jobsData.forEach((job, idx) => {
        jobsTable.innerHTML += `
            <tr class="text-center">
                <td>${idx + 1}</td>
                <td>${job.jobName}</td>
                <td>
                    <a href="#" class="btn btn-sm btn-info me-2" data-bs-toggle="modal"
                        data-bs-target="#jobDetailModal" onclick="populateJobDetail(jobsData[${idx}]);">
                        Details
                    </a>
                    <a href="#" class="btn btn-sm btn-warning me-2" data-bs-toggle="modal"
                        data-bs-target="#jobUpdateModal" onclick="handleUpdateButtonClick(${idx});">
                        Edit
                    </a>
                    <a href="#" class="btn btn-sm btn-danger" data-bs-toggle="modal"
                        data-bs-target="#jobDeleteModal" onclick="handleDeleteButtonClick(${idx});">
                        Delete
                    </a>
                </td>
            </tr>
        `;
    });
}

// Function to generate a random job ID
function generateJobId() {
    // Generate a random 3-digit job ID
    return Math.floor(100 + Math.random() * 900);
}
document.getElementById('addJobForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const jobName = document.getElementById('jobNameInput').value;
    const jobDate = document.getElementById('jobDateInput').value;

    const newJob = {
        id: jobsData.length + 1,
        jobId: generateJobId(),
        openingDate: jobDate,
        jobName: jobName
    };
    jobsData.push(newJob);

    const addJobModal = bootstrap.Modal.getInstance(document.getElementById('addJob'));
    addJobModal.hide();

    displayJobs();
    document.getElementById('addJobForm').reset();
});

function handleUpdateFromDetailClick() {
    const updateModal = document.getElementById('jobUpdateModal');
    const jobId = document.getElementById('jobJobId').innerText;

    const jobIdx = jobsData.findIndex(job => job.jobId === parseInt(jobId));
    editJobIdx = jobIdx; // Store the index for later use
    populateUpdateModal(jobIdx);

    const updateForm = document.querySelector('#jobUpdateModal form');
    updateForm.removeEventListener('submit', saveJobChanges);
    updateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveJobChanges();
    });
}

// Function to populate the Update modal with job data
function populateUpdateModal(jobIdx) {
    const job = jobsData[jobIdx];
    const updateModal = document.getElementById('jobUpdateModal');
    updateModal.querySelector('#editJobId').value = job.jobId;
    updateModal.querySelector('#editJobDate').value = job.openingDate;
    updateModal.querySelector('#editJobName').value = job.jobName;

    editJobIdx = jobIdx; // Ensure editJobIdx is set correctly
}

// Function to handle Update button click
function handleUpdateButtonClick(jobIdx) {
    editJobIdx = jobIdx; // Store the index for later use
    populateUpdateModal(jobIdx);

    const updateForm = document.querySelector('#jobUpdateModal form');
    updateForm.removeEventListener('submit', saveJobChanges);
    updateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveJobChanges();
    });
}

// Function to save changes made to a job
function saveJobChanges() {
    const editModal = document.getElementById('jobUpdateModal');
    const jobIdInput = editModal.querySelector('#editJobId');
    const jobDateInput = editModal.querySelector('#editJobDate');
    const jobNameInput = editModal.querySelector('#editJobName');

    // Retrieve the updated values from the input fields
    const newJobId = jobIdInput.value;
    const newJobDate = jobDateInput.value;
    const newJobName = jobNameInput.value;

    // Update the job data in the jobsData array using the stored index
    jobsData[editJobIdx].jobId = newJobId;
    jobsData[editJobIdx].openingDate = newJobDate;
    jobsData[editJobIdx].jobName = newJobName;

    const updateModalInstance = bootstrap.Modal.getInstance(editModal);
    updateModalInstance.hide();

    displayJobs();
}

// Function to populate the Delete modal with job data
function populateDeleteModal(jobIdx) {
    const jobContent = jobsData[jobIdx];
    const deleteModal = document.getElementById('jobDeleteModal');
    deleteModal.querySelector('#deleteJobName').innerHTML = jobContent.jobName;
    deleteModal.querySelector('#deleteJobConfirm').addEventListener('click', function () {
        deleteJob(jobIdx);
    });
}

// Function to handle Delete button click
function handleDeleteButtonClick(jobIdx) {
    populateDeleteModal(jobIdx);
}

// Function to delete a job
function deleteJob(jobIdx) {
    jobsData.splice(jobIdx, 1);

    const deletingModal = document.getElementById('jobDeleteModal');
    const deletingModalInstance = bootstrap.Modal.getInstance(deletingModal);
    deletingModalInstance.hide();
    displayJobs();
}
displayJobs();