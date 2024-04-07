const isLocalhost = window.location.hostname === 'localhost';

const CONSTANTS = {
    GALLERY_CNT: 2,
    CLASS_LIST:
        [[
            {
                url: 'https://www.youtube.com/embed/h3f58AWoj2c?si=mS8MvaTapOVD79wb',
                name: 'IA'
            },
            {
                url: 'https://www.youtube.com/embed/pihNrLmkSKs?si=_5cLZXlVrtLsd3kh',
                name: 'IB'
            },
            {
                url: 'https://www.youtube.com/embed/Up1rhr2424k?si=un8YxCnhyWOjpIO5',
                name: 'IC'
            },
            {
                url: 'https://www.youtube.com/embed/34HRtXLkO0k?si=GzM0fe3grDbqAkRf',
                name: 'ID'
            },
            {
                url: 'https://www.youtube.com/embed/RsbYxVITKm4?si=Y8gOqu6QDNWa-KvT',
                name: 'IE'
            }],
        [
            {
                url: 'https://www.youtube.com/embed/YhnebVoiS-c?si=_df-YfdhCPuRDaD7',
                name: 'IIA'
            },
            {
                url: 'https://www.youtube.com/embed/tRhRod5hXwo?si=iOagS1QKio0OpVha',
                name: 'IIB'
            },
            {
                url: 'https://www.youtube.com/embed/PNfQvPgEGjI?si=BEYKjxF3ubuFbJoa',
                name: 'IIC'
            },
            {
                url: 'https://www.youtube.com/embed/cKZ7KuFZLSo?si=TLgvn4hX6W91kVPt',
                name: 'IID'
            }
        ]],
    SOCKET_URL: isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt',
    LEADERBOARD_ENTRY_HEIGHT: 120 // in pixels
}

export default CONSTANTS;