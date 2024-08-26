

// SIDE NAV
function toggleNav() {
    var navbar = document.getElementById('navbar');
    var body = document.body;

    if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        navbar.classList.add('closed');
        body.classList.remove('nav-open');
        body.classList.add('nav-closed');
    } 
    else {
        navbar.classList.remove('closed');
        navbar.classList.add('open');
        body.classList.remove('nav-closed');
        body.classList.add('nav-open');
    }
}

// FUNCTION FOR CLOSING SIDE NAV
// if window width is less than 1200px, close the side nav
function checkWidthAndToggle() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const toggleBtn = document.querySelector('.toggle-btn');

    if (window.innerWidth < 1200) {
        body.classList.remove('nav-open');
        body.classList.add('nav-closed');
        navbar.classList.remove('open');
        navbar.classList.add('closed');
    } 
    else {
        body.classList.add('nav-open');
        body.classList.remove('nav-closed');
        navbar.classList.add('open');
        navbar.classList.remove('closed');
    }
}
checkWidthAndToggle();
window.addEventListener('resize', checkWidthAndToggle); // Event listener for window resize


function copyButton(){
    const copyButtons = document.querySelectorAll('.copy-btn');
    const codeBlocks = document.querySelectorAll('.code-container code');

    // Ensure that each copy button works with its corresponding code block
    copyButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            // Get the corresponding code block for the current button
            const code = codeBlocks[index];
            
            navigator.clipboard.writeText(code.innerText).then(function () {
                button.textContent = 'Copied!';
                setTimeout(function () {
                    button.textContent = 'Copy';
                }, 1000);
            }, function () {
                button.textContent = 'Failed to copy';
            });
        });
    });
}
copyButton();


// DROPDOWN
function dropDown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    condition = event.target.matches('.dropbtn') || event.target.matches('.switch') || event.target.matches('.slider') || event.target.matches('#modeToggle');
    if (!condition) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// drop down menu
function applyDropdownDelays() {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.querySelectorAll('a').forEach((item, index) => {
            item.style.animationDelay = `${(0.06) * index}s`; // Adjust delay increment as needed
        });
    });
}

function dropDown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("show");
    applyDropdownDelays(); // Apply delays whenever dropdown is shown
}

// Ensure delays are set on page load
document.addEventListener('DOMContentLoaded', applyDropdownDelays);




//let NUM_ARTICLE = 6;
function article(NUM_ARTICLE, des, random_article){
    fetch('../assets/json/suggestions.json')
        .then(response => response.json())
        .then(data => {
            // Access the articles array within the fetched JSON data
            const articles = data.articles;

            // Shuffle the articles if random_article is true
            if (random_article) shuffleArray(articles);

            // Display only the first NUM_ARTICLE articles
            displayArticles(articles.slice(0, NUM_ARTICLE));
        })
        .catch(error => console.error('Error loading articles:', error));

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to display the articles
    function displayArticles(articles) {
        const container = document.getElementById('rec-article-container');
        container.innerHTML = ''; // Clear the container before adding new articles

        articles.forEach(article => {
            const articleLink = document.createElement('a');
            articleLink.href = article.link;
            articleLink.classList.add('article');
            articleLink.target = "_blank"; // Open link in a new tab (optional)

            const img = document.createElement('img');
            img.src = article.image;
            img.alt = article.title;

            const title = document.createElement('div');
            title.classList.add('article-name');
            title.textContent = article.title;

            const description = document.createElement('div');
            description.classList.add('article-description');
            description.textContent = article.description;

            const date = document.createElement('div');
            date.classList.add('article-date');
            date.textContent = article.date;

            articleLink.appendChild(img);
            articleLink.appendChild(title);
            if(des){
                articleLink.appendChild(description);
                articleLink.appendChild(date);
            }
            
            container.appendChild(articleLink);

            // Apply border based on the 'des' boolean
            if (des) {
                title.style.borderBottom = '1px solid var(--nav-line-color)';
            } else {
                title.style.borderBottom = 'none';
            }
        });
    }
}

document.querySelectorAll('.url').forEach(function(element) {
    element.onclick = function() {
        window.open(this.href);
        return false;
    };
    element.onkeypress = function() {
        window.open(this.href);
        return false;
    };
});

function changeTab(nav_item_name) {
    var x = document.getElementsByClassName("general-wrapper");
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(nav_item_name).style.display = "block";
}

function materials(NUM_ARTICLE, des){
    fetch('../assets/json/materials.json')
        .then(response => response.json())
        .then(data => {
            // Access the articles array within the fetched JSON data
            const articles = data.articles;

            // Display only the first NUM_ARTICLE articles
            displayArticles(articles.slice(0, NUM_ARTICLE));
        })
        .catch(error => console.error('Error loading articles:', error));


    // Function to display the articles
    function displayArticles(articles) {
        const container = document.getElementById('rec-article-container');
        container.innerHTML = ''; // Clear the container before adding new articles

        articles.forEach(article => {
            const articleLink = document.createElement('a');
            articleLink.href = article.link;
            articleLink.classList.add('article');
            articleLink.target = "_blank"; // Open link in a new tab (optional)

            const img = document.createElement('img');
            img.src = article.image;
            img.alt = article.title;

            const title = document.createElement('div');
            title.classList.add('material-title');
            title.textContent = article.title;

            const description = document.createElement('div');
            description.classList.add('author');
            description.textContent = article.description;

            const date = document.createElement('div');
            date.classList.add('material-description');
            date.textContent = article.date;

            articleLink.appendChild(img);
            articleLink.appendChild(title);
            if(des){
                articleLink.appendChild(description);
                articleLink.appendChild(date);
            }
            
            container.appendChild(articleLink);

            // Apply border based on the 'des' boolean
            if (des) {
                title.style.borderBottom = '1px solid var(--nav-line-color)';
            } else {
                title.style.borderBottom = 'none';
            }
        });
    }
}