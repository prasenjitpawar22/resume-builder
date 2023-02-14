export type Header = {
    'id': string,
    'fullName': string,
    'contact': number,
    'linkedIn': string,
    'github': string,
    'websit': string,
} | undefined

export type Education = {
    'id': string,
    'university': string,
    'start': string,
    'end': string
}
export type Experience = {
    'id': string,
    'position': string,
    'company': string,
    'start': string,
    'end': string,
    "desc": string[] | null
}

export type Data = {
    'header': Header[],
    'education': Education[],
    'experience': Experience[]
}
