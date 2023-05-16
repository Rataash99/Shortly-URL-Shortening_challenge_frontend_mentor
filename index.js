let inputData = document.getElementById('input-data');
let outputBtn = document.getElementById('output-btn');
let listData = document.getElementById('list-data');
let error = document.getElementById('error');
let inputSearch = document.getElementsByClassName('input_search')[0];
let hamburg = document.getElementsByClassName('hamburg')[0];
let nav = document.getElementsByTagName('nav')[0];

let url;
inputData.addEventListener('input', (e) => {
    url = e.target.value;
})

const fetchData = () => fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
.then(res => res.json())
.then((result) => {
    localStorage.getItem('links');
    let ans = result.result.short_link2;
    let li = document.createElement('li');
    li.innerHTML = 
    `<p class = "url">${url}</p>
    <hr class = 'li-hr'>
    <div class = 'li-right-div'>
    <p class = "short-url">https://www.${ans}</p>
    <button onclick = "copyText('${ans}')"  class = 'copy btn3'>Copy</button>
    </div>`;
    listData.append(li);
    localStorage.setItem('links', listData.innerHTML);
})

function getValues(){
    let storedValues = localStorage.getItem("links");
    if(storedValues){
           listData.innerHTML=storedValues;
    }
}
getValues();

let copyText = (text) => {
    navigator.clipboard.writeText(text);
}

let copied = (e) => {
    if(e.target.classList.contains('copy')){
        e.target.innerHTML = 'Copied!';
        e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    }
}
let checkError = () => {
    if(inputData.value == ""){
        error.innerText = 'Please add a link';
        inputData.style.border = '2px solid hsl(0, 87%, 67%)';
        inputData.classList.add('placeholder-color');
        inputSearch.style.gap = '2rem';
        return;
    }
    else if(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url) == false){
        error.innerText = 'link might be missing https://';
        inputData.style.border = '2px solid hsl(0, 87%, 67%)';
        inputData.classList.add('placeholder-color');
        inputSearch.style.gap = '2rem';
        return;
    }
    else{
        error.innerText = '';
        inputData.style.border = 'none';
        inputData.classList.remove('placeholder-color');
        inputSearch.style.gap = '1rem';
        fetchData();
    }
}
const toggleHam = (e) => {
    nav.classList.toggle('show');
}

listData.addEventListener('click' , copied);
outputBtn.addEventListener('click',checkError);
hamburg.addEventListener('click', toggleHam)