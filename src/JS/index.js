const word = document.getElementById("inputSearch");
const buttonSearch = document.getElementById("addon-wrapping");
const API_KEY = "8de21ba8af164cb3a4a3b24540875c1d";

const main = document.querySelector(".main-container");//Father container

const titleContainers =
[
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div")
];

const urlToImageContainers =
[
    document.createElement("img"),
    document.createElement("img"),
    document.createElement("img"),
    document.createElement("img"),
    document.createElement("img")
];

const contentContainers =
[
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div")
];

const gotoNews =
[
    document.createElement("a"),
    document.createElement("a"),
    document.createElement("a"),
    document.createElement("a"),
    document.createElement("a")
];

const publishedAtContainers =
[
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div")
];

let activateDeleteOption = false;
let activateCreateOption = true;

//Element to detect category
const categoryButton = document.querySelectorAll(".dropdown-item-1");
const categoryText = document.getElementById("category");

categoryButton.forEach((item) =>
{
    item.addEventListener("click", (event)=>
    {
        event.preventDefault();
        const category = item.textContent;
        categoryText.innerText = category;
        searchByCategory(category);
    })
});

const searchByCategory = (category) =>
{
    const url = `https://newsapi.org/v2/top-headlines/sources?category=${category.toLowerCase()}&apiKey=${API_KEY}`;

    fetch(url)
    .then(res => res.json())
    .then(res =>
    {
        console.log(res.sources[0].name);
        console.log(res.sources[0].description);
        console.log(res.sources[0].url);

        createElementsForNewsByCategory(res.sources[0].name, res.sources[0].description, res.sources[0].url);

    }
    )
    .catch(err => console.error("Error:", err));
}

const createElementsForNewsByCategory = (name, description, url) =>
{
    if(activateDeleteOption === false && activateCreateOption === true)
    {
        //Create title container
        titleContainer.id = "title";
        titleContainer.innerHTML = name;
        // Create content container
        contentContainer.id = "content";
        contentContainer.innerHTML = description.replace(/… \[\+\d+ chars\]/, "");//It deletes … [+xxxx chars] from the original text
        // Create url to go to source
        gotoNew.id = "url";
        gotoNew.href = url;
        gotoNew.innerHTML = "Read complete article";

        main.appendChild(titleContainer);
        main.appendChild(urlToImageContainer);
        main.appendChild(contentContainer);
        main.appendChild(gotoNew);

        activateDeleteOption = true;
        activateCreateOption = false;
    }
    else
    {
        main.removeChild(titleContainer);
        main.removeChild(urlToImageContainer);
        main.removeChild(contentContainer);
        main.removeChild(gotoNew);
        // main.removeChild(publishedAtContainer);
        activateDeleteOption = false;
        activateCreateOption = true;
    }
    
    if(activateDeleteOption === false && activateCreateOption === true)
    {
        //Create title container
        titleContainer.id = "title";
        titleContainer.innerHTML = name;
        // Create content container
        contentContainer.id = "content";
        contentContainer.innerHTML = description.replace(/… \[\+\d+ chars\]/, "");//It deletes … [+xxxx chars] from the original text
        // Create url to go to source
        gotoNew.id = "url";
        gotoNew.href = url;
        gotoNew.innerHTML = "Read complete article";
        // // Create publishedAt container
        // publishedAtContainer.id = "publishedAt";
        // publishedAtContainer.innerHTML = publishedAt.slice(0, 10) +" at " + publishedAt.slice(11, 19); //Gets date and time;
        main.appendChild(titleContainer);
        main.appendChild(urlToImageContainer);
        main.appendChild(contentContainer);
        main.appendChild(gotoNew);
        main.appendChild(publishedAtContainer);
        activateDeleteOption = true;
        activateCreateOption = false;
    }
}

const sortByButton = document.querySelectorAll(".dropdown-item-2");
const sortByButtonGUI = document.getElementById("sortBy");

sortByButton.forEach((item) =>
{
    item.addEventListener("click", (event)=>
    {
        event.preventDefault();
        const sortBy = item.textContent;
        sortByButtonGUI.innerText = sortBy;
        searchSortBy(sortBy);
    })
});


const searchSortBy = (sortBy) =>
{
    const url = `https://newsapi.org/v2/everything?q=a&sortBy=${sortBy.toLowerCase()}&language=en&apiKey=${API_KEY}`;

    
    fetch(url)
    .then(res => res.json())
    .then(res =>
    {
        console.log(res);
        if (res.articles.length === 0)
        {
            console.log("Results not found");
            return;
        }

        createElementsForNews(res.articles[0].title, res.articles[0].urlToImage,
        res.articles[0].content, res.articles[0].url, res.articles[0].publishedAt);
    }
    )
    .catch(err => console.error("Error:", err));
}



const search = () =>
{
    const query = word.value.trim();
    if (!query)
    {
        console.log("Please, add a key word.");
        return;
    }

    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;


    fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.articles.length === 0)
            {
                console.log("Results not found");
                return;
            }

            const titles = [];
            const urlToImages = [];
            const contents = [];
            const urls = [];
            const publishedAts = [];

            //Saves the first 5 articles
            for(let index = 0; index <= 4; index++)
            {
                titles[index] = res.articles[index].title;
                urlToImages[index] = res.articles[index].urlToImage;
                contents[index] = res.articles[index].content;
                urls[index] = res.articles[index].url;
                publishedAts[index] = res.articles[index].publishedAt;
            }
            createElementsForNews(titles, urlToImages,contents, urls, publishedAts);
        })
        .catch(err => console.error("Error:", err));
};

const createElementsForNews = (title, urlToImage, content, url, publishedAt) =>
{

    if(activateDeleteOption === false && activateCreateOption === true)
    {
        create5Elements(title, urlToImage, content, url, publishedAt);
        activateDeleteOption = true;
        activateCreateOption = false;
    }
    else
    {
        for (let i = 0; i < title.length; i++)
        {
             // Remove them from the main container
            main.removeChild(titleContainers[i]);
            main.removeChild(urlToImageContainers[i]);
            main.removeChild(contentContainers[i]);
            main.removeChild(gotoNews[i]);
            main.removeChild(publishedAtContainers[i]);
        }
        activateDeleteOption = false;
        activateCreateOption = true;
    }

    if(activateDeleteOption === false && activateCreateOption === true)
        {
            create5Elements(title, urlToImage, content, url, publishedAt);
            activateDeleteOption = true;
            activateCreateOption = false;
        }
}
    
function create5Elements(title, urlToImage, content, url, publishedAt)
{
    for (let i = 0; i < title.length; i++)
        {
            // Set elements
            titleContainers[i].id = "title";
            titleContainers[i].innerHTML = title[i];
            
            urlToImageContainers[i].id = "urlToImage";
            urlToImageContainers[i].src = urlToImage[i];
            
            contentContainers[i].id = "content";
            contentContainers[i].innerHTML = content[i].replace(/… \[\+\d+ chars\]/, "");
            
            gotoNews[i].id = "url";
            gotoNews[i].href = url[i];
            gotoNews[i].innerHTML = "Read complete article";
            
            publishedAtContainers[i].id = "publishedAt";
            publishedAtContainers[i].innerHTML = publishedAt[i].slice(0, 10) + " at " + publishedAt[i].slice(11, 19);
        
            // Add them to the main container
            main.appendChild(titleContainers[i]);
            main.appendChild(urlToImageContainers[i]);
            main.appendChild(contentContainers[i]);
            main.appendChild(gotoNews[i]);
            main.appendChild(publishedAtContainers[i]);
        }
}

buttonSearch.addEventListener("click", () =>
{
    search();
}
);
