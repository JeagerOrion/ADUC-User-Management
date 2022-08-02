const officeSelectMenu = document.getElementById('office');
const jobTitleSelectMenu = document.getElementById('jobTitle');



const compassRoseJobs = [
    {
        value: 'crarft.template',
        text: 'Compass Rose Family Teacher'
    },
    {
        value: 'crteach.template',
        text: 'Compass Rose School Teacher'
    }
]

const crownPointJobs = [
    {
        value: 'fscrownpoint.template',
        text: 'Family Specialist'
    },
    {
        value: 'fca.crownpoint',
        text: 'Foster Care Advocate'
    }]

const fortWayneJobs = [
    {
        value: 'fsfortwayne.template',
        text: 'Family Specialist'
    },
    {
        value: 'fca.fortwayne',
        text: 'Foster Care Advocate'
    }]

const greenwoodJobs = [
    {
        value: 'fsgreenwood.template',
        text: 'Family Specialist'
    },
    {
        value: 'fca.greenwood',
        text: 'Foster Care Advocate'
    }]

const indianapolisJobs = [
    {
        value: 'fsindianapolis.template',
        text: 'Family Specialist'
    },
    {
        value: 'fca.indianapolis',
        text: 'Foster Care Advocate'
    }]

const recoveryServicesJobs = [{
    value: 'recoveryrft.template',
    text: 'Recovery Services Family Teacher'
}]

const southBendJobs = [
    {
        value: 'fssouthbend.template',
        text: 'Family Specialist'
    },
    {
        value: 'fca.southbend',
        text: 'Foster Care Advocate'
    }]

const volunteersAndInternsJobs = [
    {
        value: 'fs.intern',
        text: 'Intern (Family Specialist)'
    },
    {
        value: 'residential.intern',
        text: 'Intern (Residential)'
    }
]

const wabashJobs = [
    {
        value: 'cm.template',
        text: 'Case Manager'
    },
    {
        value: 'fswabash.template',
        text: 'Family Specialist'
    },
    {
        value: 'ycs.template',
        text: 'Night Shift/YCS'
    },
    {
        value: 'rft.template',
        text: 'Residential Family Teacher'
    },
    {
        value: 'rts.template',
        text: 'Residential Teaching Specialist'
    },
    {
        value: 'sa.template',
        text: 'Store Associate'
    },
    {
        value: 'fca.wabash',
        text: 'Foster Care Advocate'
    }
]

const createJobTitleOption = function (job) {
    const jobTitleOption = document.createElement('option');
    jobTitleOption.value = job.value;
    jobTitleOption.text = job.text;
    jobTitleSelectMenu.appendChild(jobTitleOption);
}


const configureJobTitleMenu = function (officeSelectMenu, jobTitleSelectMenu) {
    if (officeSelectMenu.value === 'Compass Rose Academy') {
        jobTitleSelectMenu.length = 0;
        for (let job of compassRoseJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Crown Point') {
        jobTitleSelectMenu.length = 0;
        for (let job of crownPointJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Fort Wayne') {
        jobTitleSelectMenu.length = 0;
        for (let job of fortWayneJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Greenwood') {
        jobTitleSelectMenu.length = 0;
        for (let job of greenwoodJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Indianapolis') {
        jobTitleSelectMenu.length = 0;
        for (let job of indianapolisJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Recovery Services') {
        jobTitleSelectMenu.length = 0;
        for (let job of recoveryServicesJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'South Bend') {
        jobTitleSelectMenu.length = 0;
        for (let job of southBendJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Volunteers & Interns') {
        jobTitleSelectMenu.length = 0;
        for (let job of volunteersAndInternsJobs) {
            createJobTitleOption(job);
        }
    }
    if (officeSelectMenu.value === 'Wabash') {
        jobTitleSelectMenu.length = 0;
        for (let job of wabashJobs) {
            createJobTitleOption(job);
        }
    }
}

officeSelectMenu.addEventListener('change', () => {
    configureJobTitleMenu(officeSelectMenu, jobTitleSelectMenu);
})