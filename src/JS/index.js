const word = document.getElementById("inputSearch");
const buttonSearch = document.getElementById("addon-wrapping");
const API_KEY = "cbeff85c319177a762a0570a4d45e0ca";

const main = document.querySelector(".main-container");

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

// Categoría
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
    const url = `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&lang=en&token=${API_KEY}`;

    fetch(url)
    .then(res => res.json())
    .then(res =>
    {
        if (!res.articles || res.articles.length === 0)
        {
            console.log("No articles found");
            return;
        }

        const titles = [];
        const urlToImages = [];
        const contents = [];
        const urls = [];
        const publishedAts = [];

        for (let i = 0; i < 5; i++)
        {
            titles[i] = res.articles[i].title;
            urlToImages[i] = res.articles[i].image;
            contents[i] = res.articles[i].description;
            urls[i] = res.articles[i].url;
            publishedAts[i] = res.articles[i].publishedAt;
        }

        createElementsForNews(titles, urlToImages, contents, urls, publishedAts);
    })
    .catch(err => console.error("Error:", err));
};

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
    // GNews no tiene sortBy real, pero lo simulamos con relevancia por defecto
    const url = `https://gnews.io/api/v4/search?q=a&lang=en&token=${API_KEY}`;

    fetch(url)
    .then(res => res.json())
    .then(res =>
    {
        if (!res.articles || res.articles.length === 0)
        {
            console.log("Results not found");
            return;
        }

        const titles = [];
        const urlToImages = [];
        const contents = [];
        const urls = [];
        const publishedAts = [];

        for(let index = 0; index <= 4; index++)
        {
            titles[index] = res.articles[index].title;
            urlToImages[index] = res.articles[index].image;
            contents[index] = res.articles[index].description;
            urls[index] = res.articles[index].url;
            publishedAts[index] = res.articles[index].publishedAt;
        }

        createElementsForNews(titles, urlToImages, contents, urls, publishedAts);
    })
    .catch(err => console.error("Error:", err));
};

const search = () =>
{
    const query = word.value.trim();
    if (!query)
    {
        console.log("Please, add a key word.");
        return;
    }

    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${API_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(res => {
            if (!res.articles || res.articles.length === 0)
            {
                console.log("Results not found");
                return;
            }

            const titles = [];
            const urlToImages = [];
            const contents = [];
            const urls = [];
            const publishedAts = [];

            for(let index = 0; index <= 4; index++)
            {
                titles[index] = res.articles[index].title;
                urlToImages[index] = res.articles[index].image;
                contents[index] = res.articles[index].description;
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
};

function create5Elements(title, urlToImage, content, url, publishedAt)
{
    for (let i = 0; i < title.length; i++)
    {
        titleContainers[i].id = "title";
        titleContainers[i].innerHTML = title[i];

        urlToImageContainers[i].id = "urlToImage";
        urlToImageContainers[i].src = urlToImage[i];

        contentContainers[i].id = "content";
        contentContainers[i].innerHTML = content[i]?.replace(/… \[\+\d+ chars\]/, "") || "No content available";

        gotoNews[i].id = "url";
        gotoNews[i].href = url[i];
        gotoNews[i].innerHTML = "Read complete article";

        publishedAtContainers[i].id = "publishedAt";
        publishedAtContainers[i].innerHTML = publishedAt[i].slice(0, 10) + " at " + publishedAt[i].slice(11, 19);

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
});
