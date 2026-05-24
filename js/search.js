import {
    search_input,
    btn_sub,
    result,
    state,
    history
} from './common.js';

window.addEventListener('DOMContentLoaded', (e) => {
    if(localStorage.getItem("history")){
    let a = JSON.parse(localStorage.getItem("history"));
    console.log(a);
    for (let i = 0; i < a.length; i++) {
        history.innerHTML += `<h1>${i}- ${a[i].search_v}</h1>
    <hr style="width:100%;">`;
    }
    if (!a.length == 0) {
        state.history = JSON.parse(localStorage.getItem("history"));
    }
}
})
let istrue = false;

btn_sub.addEventListener('click', async e => {
    result.innerHTML = '';
    let search = search_input.value;
    try {
        let res = await fetch(`./js/users.json`);
        if (!res) {
            throw new Error("something went wrong");

        }
        let dt = await res.json();
        let { users } = dt;
        let fil_user = users.filter(i => {
            let g = i.login.toLowerCase();
            return g.includes(search.toLowerCase())
        })
        console.log(fil_user);
        if (fil_user == 0) {
            result.innerHTML = '<h1>no accounts were found</h1>';
            console.log(1);
            istrue = false;

        }
        else {
            result.innerHTML += `<h1>${fil_user.length} was found</h1>`
            fil_user.forEach(i => {
                result.innerHTML += `
            <p>login: ${i.login}</p>
            <p>name: ${i.name}</p>
            <p>public_repos: ${i.public_repos}</p>
            <p>followers: ${i.followers}</p>
            <p>following: ${i.following}</p>
            <p>created_at: ${i.created_at}</p>
            <hr>
            `;

            })
            istrue = true;

        };
        let obj_s = {
            search_v: search,
            res: fil_user
        };
        console.log(!obj_s.res.length == 0);

        let i = state.history.find(i => i.search_v == obj_s.search_v);
        if (!i && istrue) {
            state.history.push(obj_s);
            localStorage.setItem("history", JSON.stringify(state.history));
        }

        history.innerHTML = '';
        for (let i = 0; i < state.history.length; i++) {
            history.innerHTML += `<h1>${i}- ${state.history[i].search_v}</h1>
    <hr style="width:100%;">`;
        }

    } catch (o) {
        console.log(o);

        result.innerHTML = 'there was a error';
    }
})