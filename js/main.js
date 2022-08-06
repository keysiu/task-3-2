const $ul = document.querySelector('#people_list');

const addPersonItem = (person) => {
    const secondFilm = _.get(person, '["films"][1]', 'Unknown');
    const $li = document.createElement('li');
    $li.className = 'list-group-item';
    $li.id = "elem";

    $li.innerText = `
        ${person['name']}
        (birth year: ${person['birth_year']})
        - second film: ${secondFilm}
    `;
    $ul.appendChild($li);
};

// it that right class?
class Swapi {
    constructor(page) {
        this.page = page;
    }
    newPage(page) { 
        this.page = page;
    }
    async getPeople(page) {
        if (page > 0 || page < 4) {
            const result = await fetch('https://swapi.dev/api/people/?page=' + page);
            const data = await result.json();
            // this.page = page;
            return data;
        }
        return 0;
    }
}

const swapiApi = new Swapi();
// swapiApi
//     .getPeople(1)
//     .then((res) => {
//         res.results.forEach(person => {
//             addPersonItem(person);
//         })
//     })
//     .catch(() => {
//         console.error("ERROR!");
//     })
//     .finally(() => {
//         const $preloader = document.querySelector("#preloader");
//         $preloader? $preloader.remove() : null;
//         const $pagination = document.querySelector("#pagination");
//     });



const changePage = (page, id) => { 
    if (page > 0 && page < 4) {
        $ul.innerHTML = '';
        swapiApi
            .getPeople(page)
            .then((res) => {
                console.log(res);
                res.results.forEach(person => {
                    addPersonItem(person);
                })
            })
            .catch(() => {
                console.error("ERROR!");
            })
            .finally(() => {
                const $preloader = document.querySelector("#preloader");
                $preloader ? $preloader.remove() : null;
                const $pagination = document.querySelector("#pagination");
            });
    
        swapiApi.newPage(page);
    }
}

changePage(1, 'one');
