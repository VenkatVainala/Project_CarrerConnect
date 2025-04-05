const express = require('express');
const router = express.Router();

// Hardcoded job data (sample 10 jobs; duplicate/modify to get 20-30)
const jobs = [
  {
    id: "1",
    state: "OPEN",
    title: "Senior Software Engineer",
    description: "TechCorp is seeking a senior software engineer to design and develop scalable applications.",
    url: "https://techcorp.com/careers/1",
    applyMethod: {
      companyApplyUrl: "https://techcorp.com/careers/1/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C1",
      name: "TechCorp",
      description: "Innovative tech company.",
      logo: "https://via.placeholder.com/100?text=TechCorp",
      url: "https://techcorp.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "San Francisco, CA",
    type: "Full-time",
    views: 2500,
    closed: false,
    workRemoteAllowed: true,
    workPlace: "Hybrid",
    expireAt: Date.now() + 86400000 * 30,
    formattedJobFunctions: ["Engineering"],
    formattedIndustries: ["Technology"],
    formattedExperienceLevel: "Senior",
    listedAt: Date.now() - 86400000,
    listedAtDate: new Date(Date.now() - 86400000).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 2,
    originalListedDate: new Date(Date.now() - 86400000 * 2).toUTCString()
  },
  {
    id: "2",
    state: "OPEN",
    title: "Frontend Developer",
    description: "WebWorks is hiring a frontend developer skilled in React and CSS.",
    url: "https://webworks.com/careers/2",
    applyMethod: {
      companyApplyUrl: "https://webworks.com/careers/2/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C2",
      name: "WebWorks",
      description: "Creative web design agency.",
      logo: "https://via.placeholder.com/100?text=WebWorks",
      url: "https://webworks.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "New York, NY",
    type: "Full-time",
    views: 1800,
    closed: false,
    workRemoteAllowed: true,
    workPlace: "Remote",
    expireAt: Date.now() + 86400000 * 25,
    formattedJobFunctions: ["Design", "Development"],
    formattedIndustries: ["Digital"],
    formattedExperienceLevel: "Mid-Level",
    listedAt: Date.now() - 86400000,
    listedAtDate: new Date(Date.now() - 86400000).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 3,
    originalListedDate: new Date(Date.now() - 86400000 * 3).toUTCString()
  },
  {
    id: "3",
    state: "OPEN",
    title: "Data Scientist",
    description: "DataMinds is looking for a data scientist to analyze large datasets and build predictive models.",
    url: "https://dataminds.com/careers/3",
    applyMethod: {
      companyApplyUrl: "https://dataminds.com/careers/3/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C3",
      name: "DataMinds",
      description: "Data analytics and insights firm.",
      logo: "https://via.placeholder.com/100?text=DataMinds",
      url: "https://dataminds.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Chicago, IL",
    type: "Full-time",
    views: 3200,
    closed: false,
    workRemoteAllowed: false,
    workPlace: "Onsite",
    expireAt: Date.now() + 86400000 * 20,
    formattedJobFunctions: ["Analytics"],
    formattedIndustries: ["Finance"],
    formattedExperienceLevel: "Senior",
    listedAt: Date.now() - 86400000 * 0.5,
    listedAtDate: new Date(Date.now() - 86400000 * 0.5).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 2,
    originalListedDate: new Date(Date.now() - 86400000 * 2).toUTCString()
  },
  {
    id: "4",
    state: "OPEN",
    title: "UX Designer",
    description: "Designify needs a UX designer to improve user interactions across our products.",
    url: "https://designify.com/careers/4",
    applyMethod: {
      companyApplyUrl: "https://designify.com/careers/4/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C4",
      name: "Designify",
      description: "Leading creative design firm.",
      logo: "https://via.placeholder.com/100?text=Designify",
      url: "https://designify.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Austin, TX",
    type: "Contract",
    views: 900,
    closed: false,
    workRemoteAllowed: true,
    workPlace: "Remote",
    expireAt: Date.now() + 86400000 * 15,
    formattedJobFunctions: ["Design"],
    formattedIndustries: ["Creative"],
    formattedExperienceLevel: "Mid-Level",
    listedAt: Date.now() - 86400000 * 0.75,
    listedAtDate: new Date(Date.now() - 86400000 * 0.75).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 1.5,
    originalListedDate: new Date(Date.now() - 86400000 * 1.5).toUTCString()
  },
  {
    id: "5",
    state: "OPEN",
    title: "Backend Developer",
    description: "ServerSide Inc. is seeking a backend developer experienced in Node.js and databases.",
    url: "https://serverside.com/careers/5",
    applyMethod: {
      companyApplyUrl: "https://serverside.com/careers/5/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C5",
      name: "ServerSide Inc.",
      description: "Enterprise backend solutions.",
      logo: "https://via.placeholder.com/100?text=ServerSide",
      url: "https://serverside.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Seattle, WA",
    type: "Full-time",
    views: 2100,
    closed: false,
    workRemoteAllowed: false,
    workPlace: "Onsite",
    expireAt: Date.now() + 86400000 * 30,
    formattedJobFunctions: ["Engineering"],
    formattedIndustries: ["Technology"],
    formattedExperienceLevel: "Senior",
    listedAt: Date.now() - 86400000,
    listedAtDate: new Date(Date.now() - 86400000).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 2,
    originalListedDate: new Date(Date.now() - 86400000 * 2).toUTCString()
  },
  {
    id: "6",
    state: "OPEN",
    title: "Marketing Manager",
    description: "AdvertisePro seeks a creative marketing manager to lead digital campaigns.",
    url: "https://advertisepro.com/careers/6",
    applyMethod: {
      companyApplyUrl: "https://advertisepro.com/careers/6/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C6",
      name: "AdvertisePro",
      description: "Digital marketing agency.",
      logo: "https://via.placeholder.com/100?text=AdvertisePro",
      url: "https://advertisepro.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Los Angeles, CA",
    type: "Full-time",
    views: 1300,
    closed: false,
    workRemoteAllowed: true,
    workPlace: "Hybrid",
    expireAt: Date.now() + 86400000 * 20,
    formattedJobFunctions: ["Marketing"],
    formattedIndustries: ["Advertising"],
    formattedExperienceLevel: "Mid-Level",
    listedAt: Date.now() - 86400000,
    listedAtDate: new Date(Date.now() - 86400000).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 3,
    originalListedDate: new Date(Date.now() - 86400000 * 3).toUTCString()
  },
  {
    id: "7",
    state: "OPEN",
    title: "Product Manager",
    description: "InnovateNow is hiring a product manager to drive product strategy and execution.",
    url: "https://innovatenow.com/careers/7",
    applyMethod: {
      companyApplyUrl: "https://innovatenow.com/careers/7/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C7",
      name: "InnovateNow",
      description: "Cutting-edge product development.",
      logo: "https://via.placeholder.com/100?text=InnovateNow",
      url: "https://innovatenow.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Boston, MA",
    type: "Full-time",
    views: 1700,
    closed: false,
    workRemoteAllowed: false,
    workPlace: "Onsite",
    expireAt: Date.now() + 86400000 * 25,
    formattedJobFunctions: ["Product"],
    formattedIndustries: ["Technology"],
    formattedExperienceLevel: "Senior",
    listedAt: Date.now() - 86400000,
    listedAtDate: new Date(Date.now() - 86400000).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 2,
    originalListedDate: new Date(Date.now() - 86400000 * 2).toUTCString()
  },
  {
    id: "8",
    state: "OPEN",
    title: "HR Manager",
    description: "PeopleFirst is looking for an HR Manager to streamline our hiring and onboarding processes.",
    url: "https://peoplefirst.com/careers/8",
    applyMethod: {
      companyApplyUrl: "https://peoplefirst.com/careers/8/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C8",
      name: "PeopleFirst",
      description: "Human resources solutions.",
      logo: "https://via.placeholder.com/100?text=PeopleFirst",
      url: "https://peoplefirst.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Miami, FL",
    type: "Full-time",
    views: 1100,
    closed: false,
    workRemoteAllowed: true,
    workPlace: "Remote",
    expireAt: Date.now() + 86400000 * 30,
    formattedJobFunctions: ["HR"],
    formattedIndustries: ["Corporate"],
    formattedExperienceLevel: "Mid-Level",
    listedAt: Date.now() - 86400000 * 2,
    listedAtDate: new Date(Date.now() - 86400000 * 2).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 4,
    originalListedDate: new Date(Date.now() - 86400000 * 4).toUTCString()
  },
  {
    id: "9",
    state: "OPEN",
    title: "DevOps Engineer",
    description: "CloudOps Inc. is seeking a DevOps Engineer to manage our CI/CD pipelines and cloud infrastructure.",
    url: "https://cloudops.com/careers/9",
    applyMethod: {
      companyApplyUrl: "https://cloudops.com/careers/9/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C9",
      name: "CloudOps Inc.",
      description: "Cloud infrastructure solutions.",
      logo: "https://via.placeholder.com/100?text=CloudOps",
      url: "https://cloudops.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Denver, CO",
    type: "Full-time",
    views: 2000,
    closed: false,
    workRemoteAllowed: true,
    workPlace: "Hybrid",
    expireAt: Date.now() + 86400000 * 28,
    formattedJobFunctions: ["Engineering"],
    formattedIndustries: ["Cloud"],
    formattedExperienceLevel: "Senior",
    listedAt: Date.now() - 86400000 * 0.5,
    listedAtDate: new Date(Date.now() - 86400000 * 0.5).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 2,
    originalListedDate: new Date(Date.now() - 86400000 * 2).toUTCString()
  },
  {
    id: "10",
    state: "OPEN",
    title: "Business Analyst",
    description: "AnalyzePro is seeking a business analyst to drive business process improvements through data-driven insights.",
    url: "https://analyzepro.com/careers/10",
    applyMethod: {
      companyApplyUrl: "https://analyzepro.com/careers/10/apply",
      easyApplyUrl: ""
    },
    company: {
      id: "C10",
      name: "AnalyzePro",
      description: "Business analytics firm.",
      logo: "https://via.placeholder.com/100?text=AnalyzePro",
      url: "https://analyzepro.com"
    },
    contentLanguage: { code: "EN", name: "English" },
    location: "Chicago, IL",
    type: "Full-time",
    views: 1500,
    closed: false,
    workRemoteAllowed: false,
    workPlace: "Onsite",
    expireAt: Date.now() + 86400000 * 20,
    formattedJobFunctions: ["Analytics"],
    formattedIndustries: ["Finance"],
    formattedExperienceLevel: "Mid-Level",
    listedAt: Date.now() - 86400000,
    listedAtDate: new Date(Date.now() - 86400000).toUTCString(),
    originalListedAt: Date.now() - 86400000 * 2,
    originalListedDate: new Date(Date.now() - 86400000 * 2).toUTCString()
  }
];

// GET /api/jobs => Return all jobs
router.get('/', (req, res) => {
  res.json({ success: true, data: jobs });
});

// GET /api/jobs/:jobId => Return job details by ID
router.get('/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  const job = jobs.find(j => j.id === jobId);
  if (job) {
    res.json({ success: true, data: job });
  } else {
    res.status(404).json({ success: false, message: 'Job not found' });
  }
});

module.exports = router;
