import { Data } from "./types";

const data: Data = {
    'header': [{
        'id': '1',
        'fullname': 'Prasenjit Pawar',
        'contact': '123123123',
        'linkedin': '',
        'github': '',
        'websit': '',
    },
    {
        'id': '2',
        'fullname': 'Prasenjit Pawar',
        'contact': '8446697882',
        'linkedin': 'https://www.linkedin.com/in/prasenjit-pawar-2b378b77/',
        'github': 'https://github.com/prasenjitpawar22',
        'websit': '',
    }],
    'education': [{
        'id': '1',
        'university': 'MIT',
        'start': '07/2018',
        'end': '07/2021',
        'location': '',
    },
    {
        'id': '2',
        'university': 'POLY',
        'start': '07/2018',
        'end': '07/2021',
        'location': '',
    }],
    'experience': [{
        'id': '1',
        'position': 'Software Engineer',
        'company': 'Capgemini',
        'start': '02/2022',
        'end': '02/2022',
        "description": [
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
        'description': []
    }],
    'skill': [{
        'id': '1',
        'data': ['.NET Core', 'C#', 'Python', 'React', 'Docker', 'Jira']
    }]
}

export default data;