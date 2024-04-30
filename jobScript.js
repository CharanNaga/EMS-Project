// Function to populate job detail modal with data
function populateJobDetail(jobData) {
    document.getElementById('jobId').innerText = jobData.id;
    document.getElementById('jobDate').innerText = jobData.jobDate;
    document.getElementById('jobName').innerText = jobData.jobName;
}

// Example job data for four records
var jobsData = [
    {
        id: 1,
        jobDate: '31st March 2023',
        jobName: 'Data Analyst'
    },
    {
        id: 2,
        jobDate: '21st September 2022',
        jobName: 'Data Engineer'
    },
    {
        id: 3,
        jobDate: '19th November 2022',
        jobName: 'Data Scientist'
    },
    {
        id: 4,
        jobDate: '24th June 2023',
        jobName: 'Web Developer'
    }
];

// Display details for the first job by default
populateJobDetail(jobsData[0]);

// Set event listeners to change job details when clicking on different jobs
for (let i = 0; i < jobsData.length; i++) {
    document.getElementById('jobDetail' + (i + 1)).addEventListener('click', function () {
        changeJobDetail(i);
    });
}

// Function to change job details in the modal
function changeJobDetail(index) {
    populateJobDetail(jobsData[index]);
}