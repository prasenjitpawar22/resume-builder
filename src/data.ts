import { Data } from "./types";

const data: Data = {
    'header': [{
        'id': '1',
        'fullName': 'Prasenjit Pawar',
        'contact': '123123123',
        'linkedIn': '',
        'github': '',
        'websit': '',
    },
    {
        'id': '2',
        'fullName': 'Prasenjit Pawar',
        'contact': '8446697882',
        'linkedIn': 'https://www.linkedin.com/in/prasenjit-pawar-2b378b77/',
        'github': 'https://github.com/prasenjitpawar22',
        'websit': '',
    }],
    'education': [{
        'id': '1',
        'university': 'MIT',
        'start': '07/2018',
        'end': '07/2021'
    },
    {
        'id': '2',
        'university': 'POLY',
        'start': '07/2018',
        'end': '07/2021'
    }],
    'experience': [{
        'id': '1',
        'position': 'Software Engineer',
        'company': 'Capgemini',
        'start': '02/2022',
        'end': '02/2022',
        "desc": [
            "Implemented scalable REST APIs on enterprise level \
            microservices and created workflows using Uber Cadence while\
            working as a backend developer.",
            "Got Certified as AWS Cloud Practitioner, added unit \
            integration testing, \
            CI / CD, pull request, code review.",
            "Tech Stack – C#, .NET, Azure, MSSQL, Jira, Git, Docker. "]
    },
    {
        'id': '2',
        'position': 'Mern Stack',
        'company': 'ATG',
        'start': '02/2022',
        'end': '02/2022',
        'desc': []
    }]
}

export default data;