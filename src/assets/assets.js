import search from "./search.jpg"
import company from "./Company.jpg"
import upload from "./upload.png"
import adminLogo from "./admin-logo.png"
import briefcase from "./briefcase.png"
import options_lines from "./options-lines.png"
import pin from "./pin.png"
import list from "./list.png"
import left from "./leftarrow.png"
import right from "./rightarrow.png"
import cross from "./close.png"
import userprofile from "./user-profile.png"
import userIcon from "./user.png"
import hired from "./hired.png"
import cvUploader from "./upload-resume.png"
import worker from "./worker.png"
import talentManagement from "./talent-management.png"
import register from "./register.png"
import login from "./log-in.png"
import addPost from "./more.png"
import listJobs from "./job-description.png"
import jobApplication from "./job-application.png"
import back from "./back.png"
import cv from "./resume-and-cv.png"
import jobSearch from "./job-search.png"
import applications from "./application.png"
import deleting from "./delete.png"
import staff from "./staff.png"
import upduser from "./update-user.png"
import userthree from "./user3.png"
import companiess from "./companies.png"
import listings from "./listings.png"



export const assets =  { search, company, left, right, upload, adminLogo, briefcase, pin, options_lines, list, right, left, cross, userprofile, userIcon, hired, cvUploader, worker, talentManagement, register, login, addPost, listJobs, jobApplication, back, cv, jobSearch, applications, deleting, staff, upduser, userthree, companiess, listings }


export const JobCategories = [
  "Programming",
  "Data Science",
  "Designing",
  "Networking",
  "Management",
  "Marketing",
  "Cybersecurity"
]

export const JobLocation = [
  "New York",
  "London",
  "Milan",
  "Barcelona",
  "Madrid",
  "Rome",
  "Manchester"
]

export const JobData = [
  {
    _id:'1',
    title:'Full Stack Developer',
    location:'New York',
    level:"Senior Level",
    companyId:{
      "_id":"17362yehhdddddjjjjjjek",
      "name":"Slack",
      "email":"slack@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:82000,
    date: 1729681667114,
    category:"Programming"
  },
  {
    _id:'2',
    title:'Cybersecurity specialist',
    location:'Milan',
    level:"Senior Level",
    companyId:{
      "_id":"17362yew2w2whhdddddjjjjjjek",
      "name":"Figo",
      "email":"figo@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:120000,
    date: 1729681,
    category:"Cybersecurity"
  },
  {
    _id:'3',
    title:'Networking',
    location:'Madrid',
    level:"Junior Level",
    companyId:{
      "_id":"1736wewewe2yew2w2whhdddddjjjjjjek",
      "name":"Samuel",
      "email":"Samuel@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:100000,
    date: 172945681,
    category:"Networking"
  },
  {
    _id:'4',
    title:'Designing',
    location:'Manchester',
    level:"Mid Level",
    companyId:{
      "_id":"1734566wewewe2yew2w2whhdddddjjjjjjek",
      "name":"Ibrahimovic",
      "email":"Ibrahimovic@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:70000,
    date: 172945681456,
    category:"Designing"
  },
  {
    _id:'5',
    title:'Management',
    location:'Rome',
    level:"Mid Level Manager",
    companyId:{
      "_id":"1734566wewewe2y798ew2w2whhdddddjjjjjjek",
      "name":"Nelson",
      "email":"Nelson@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:72000,
    date: 172945681454856,
    category:"Management"
  },
  {
    _id:'6',
    title:'Marketing',
    location:'London',
    level:"Mid Level Marketing specialist",
    companyId:{
      "_id":"1734566wewewe2y798ew2w2whhdd78485dddjjjjjjek",
      "name":"Neymar",
      "email":"Neymar@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:80000,
    date: 56814514254856,
    category:"Marketing"
  },
  {
    _id:'7',
    title:'Data Scientiest',
    location:'London',
    level:"Mid Level Data Scientiest",
    companyId:{
      "_id":"1734566wewewe2y7erer98ew2w2whhdd78485dddjjjjjjek",
      "name":"Ninel",
      "email":"Ninel@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:92000,
    date: 54514254856,
    category:"Data Science"
  },
  {
    _id:'8',
    title:'Designing',
    location:'London',
    level:"Mid Level Designing",
    companyId:{
      "_id":"1734566wewewe2y7erer98ew2w2whhdd78485dddjjjjjjek",
      "name":"Ando",
      "email":"Ando@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:78000,
    date: 5451514254856,
    category:"Designing"
  },
  {
    _id:'9',
    title:'Designing',
    location:'London',
    level:"Mid Level Designing",
    companyId:{
      "_id":"145wewewe2y7erer98ew2w2whhdd78485dddjjjjjjek",
      "name":"Ando",
      "email":"Ando@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:78000,
    date: 5451514254856,
    category:"Designing"
  },
  {
    _id:'10',
    title:'Designing',
    location:'London',
    level:"Mid Level Designing",
    companyId:{
      "_id":"145wewewe2y7eeeeeeerer98ew2w2whhdd78485dddjjjjjjek",
      "name":"Argelenq",
      "email":"Argelenq@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:73500,
    date: 5451514254856,
    category:"Designing"
  },
  {
    _id:'11',
    title:'Marketing',
    location:'London',
    level:"Mid Level Marketing specialist",
    companyId:{
      "_id":"1734123566wewewe2y798ew2w2whhdd78485dddjjjjjjek",
      "name":"Neymar",
      "email":"Neymar@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:80000,
    date: 56814514254856,
    category:"Marketing"
  },
  {
    _id:'12',
    title:'Marketing',
    location:'London',
    level:"Mid Level Marketing specialist",
    companyId:{
      "_id":"100734123566wewewe2y798ew2w2whhdd78485dddjjjjjjek",
      "name":"Neymar",
      "email":"Neymar@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:80000,
    date: 56814514254856,
    category:"Marketing"
  },
  {
    _id:'13',
    title:'Marketing',
    location:'London',
    level:"Mid Level Marketing specialist",
    companyId:{
      "_id":"1734wssw123566wewewe2y798ew2w2whhdd78485dddjjjjjjek",
      "name":"Neymar",
      "email":"Neymar@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:80000,
    date: 56814514254856,
    category:"Marketing"
  },
  {
    _id:'14',
    title:'Networking',
    location:'Madrid',
    level:"Junior Level",
    companyId:{
      "_id":"1736wessswewe2yew2w2whhdddddjjjjjjek",
      "name":"Samuel",
      "email":"Samuel@gmail.com",
      "image": company,
    },
    description:"Troubleshooting: Diagnose and resolve complex connectivity issues, ensuring high availability and performance. Performance Optimization: Monitor network usage, capacity planning, and fine-tune systems for efficiency.Documentation: Maintain accurate records of network layouts, processes, and configurations.User Support: Assist employees with network-related problems and train them on secure usage. ",
    salary:100000,
    date: 172945681,
    category:"Networking"
  }
]
