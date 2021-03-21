const filtersList =  document.getElementById('filters');
const clearFilters = document.getElementById('clear-filters');
const jobsContainer = document.getElementById('jobs');
const fragment = document.createDocumentFragment();


// Fetch jobs
const fetchJobs = () => {
    
    fetch('../data.json')
        .then(res => res.ok ? res.json() : Promise.reject('Error al listar los trabajos'))
        .then(jobs => listJobs(jobs))
        .catch(err => {
            console.log('Ha ocurrido un error', err);
        });

}

function listJobs(jobs) {
    
    jobs.forEach(job => {
        createJobElements(job);
    });

    jobsContainer.appendChild(fragment);
}

function createJobElements(job) {

    const { company, logo, featured, position, role, level, postedAt, contract, location, languages, tools } = job;

    const jobBox = document.createElement('div');
    jobBox.classList.add('job');
   
    const jobImage = document.createElement('div');
    jobImage.classList.add('job__image');
    
    const img = document.createElement('img');
    img.src = logo;
    img.alt = company;
    jobImage.appendChild(img);

    const jobDescription = document.createElement('div');
    jobDescription.classList.add('job__description');
   
    const jobType = document.createElement('div');
    jobType.classList.add('job__type');
    
    const jobName = document.createElement('div');
    jobName.classList.add('job__name');
    jobName.textContent = company;
    
    const jobTag = document.createElement('div');
    jobTag.classList.add('job__tag');
    jobTag.textContent = job.new;
   
    const jobFeature = document.createElement('div');
    jobFeature.classList.add('job__feature');
    jobFeature.textContent = featured;

    jobType.appendChild(jobName);
    jobType.appendChild(jobTag);
    jobType.appendChild(jobFeature);

    const jobTitle = document.createElement('div');
    jobTitle.classList.add('job__title');
    jobTitle.textContent = position;

    const jobStatus = document.createElement('div');
    jobStatus.classList.add('job__status');

    const jobActive = document.createElement('div');
    jobActive.classList.add('job__active');
    jobActive.textContent = postedAt;

    const jobTime = document.createElement('div');
    jobTime.classList.add('job__time');
    jobTime.textContent = contract;

    const jobCountry = document.createElement('div');
    jobCountry.classList.add('job__country');
    jobCountry.textContent = location;

    jobStatus.appendChild(jobActive);
    jobStatus.appendChild(jobTime);
    jobStatus.appendChild(jobCountry);

    const jobSkills = document.createElement('div');
    jobSkills.classList.add('job__skills');

    const jobSkillsContent = document.createElement('ul');

    const jobRole = document.createElement('li');
    jobRole.classList.add('job__role');
    jobRole.textContent = role;

    const jobLevel = document.createElement('li');
    jobLevel.classList.add('job__label');
    jobLevel.textContent = level;

    jobSkillsContent.appendChild(jobRole);
    jobSkillsContent.appendChild(jobLevel);

    const languagesFragment = document.createDocumentFragment();

    languages.forEach(el => {
        const skillEl = document.createElement('li');
        skillEl.textContent = el;
        languagesFragment.appendChild(skillEl);
    });

    const toolsFragment = document.createDocumentFragment();

    tools.forEach(el => {
        const toolEl = document.createElement('li');
        toolEl.textContent = el;
        toolsFragment.appendChild(toolEl);
    });

    jobSkillsContent.appendChild(languagesFragment);
    jobSkillsContent.appendChild(toolsFragment);

    jobSkills.appendChild(jobSkillsContent);

    jobDescription.appendChild(jobType);
    jobDescription.appendChild(jobTitle);
    jobDescription.appendChild(jobStatus);
    jobDescription.appendChild(jobSkills);
    
    jobBox.appendChild(jobImage);
    jobBox.appendChild(jobDescription);
    jobBox.appendChild(jobTitle);
    jobBox.appendChild(jobStatus);
    jobBox.appendChild(jobSkills);

    fragment.appendChild(jobBox);
}

fetchJobs();
