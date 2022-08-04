const officeSelectMenu = document.getElementById('office');
const jobTitleSelectMenu = document.getElementById('jobTitle');



const mainOfficeJobs = [
    {
        value: 'adTemplateAccountName',
        text: 'Cafeteria Staff'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Coffee Advocate'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Custodian'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Floor Manager'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Groundskeeper'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Night Shift'
    },
    {
        value: 'fadTemplateAccountName',
        text: 'Program Manager'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Special Specialist'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Spreadsheet Master'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Trainer'
    }
]

const regionalOfficeOneJobs = [
    {
        value: 'adTemplateAccountName',
        text: 'Account Therapist'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Front Desk'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Regional Manager'
    }
]

const regionalOfficeTwoJobs = [
    {
        value: 'adTemplateAccountName',
        text: 'Business Administrator'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Front Desk'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Office Assistant'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Regional Manager'
    }]

const RegionalOfficeThreeJobs = [
    {
        value: 'adTemplateAccountName',
        text: 'Front End Developer'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Sharepoint Guy'
    },
    {
        value: 'adTemplateAccountName',
        text: 'System Administrator'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Regional Manager'
    }]

const RegionalOfficeFourJobs = [
    {
        value: 'adTemplateAccountName',
        text: 'Business Architecht'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Marketing Director'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Regional Manager'
    },
    {
        value: 'adTemplateAccountName',
        text: 'Yacht Salesman'
    }]

const createJobTitleOption = function (job) {
    const jobTitleOption = document.createElement('option');
    jobTitleOption.value = job.value;
    jobTitleOption.text = job.text;
    jobTitleSelectMenu.appendChild(jobTitleOption);
}


const configureJobTitleMenu = function (officeSelectMenu, jobTitleSelectMenu) {
    if (officeSelectMenu.value === 'Main Office') {
        jobTitleSelectMenu.length = 0;
        for (let job of compassRoseJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Regional Office One') {
        jobTitleSelectMenu.length = 0;
        for (let job of crownPointJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Regional Office Two') {
        jobTitleSelectMenu.length = 0;
        for (let job of fortWayneJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Regional Office Three') {
        jobTitleSelectMenu.length = 0;
        for (let job of greenwoodJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Regional Office Four') {
        jobTitleSelectMenu.length = 0;
        for (let job of indianapolisJobs) {
            createJobTitleOption(job);
        }
    }
}

officeSelectMenu.addEventListener('change', () => {
    configureJobTitleMenu(officeSelectMenu, jobTitleSelectMenu);
})