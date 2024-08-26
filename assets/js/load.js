function DarkMode(lightThemeHref, darkThemeHref) {
    const toggleSwitch = document.getElementById('modeToggle');
    const body = document.body;
    let lightThemeLink = document.getElementById('light-theme-link');
    let darkThemeLink = document.getElementById('dark-theme-link');

    // Create light theme link if it doesn't exist
    if (!lightThemeLink) {
        lightThemeLink = document.createElement('link');
        lightThemeLink.id = 'light-theme-link';
        lightThemeLink.rel = 'stylesheet';
        lightThemeLink.href = lightThemeHref;
        document.head.appendChild(lightThemeLink);
    } else {
        lightThemeLink.href = lightThemeHref; // Update href if it already exists
    }

    // Create dark theme link if it doesn't exist
    if (!darkThemeLink) {
        darkThemeLink = document.createElement('link');
        darkThemeLink.id = 'dark-theme-link';
        darkThemeLink.rel = 'stylesheet';
        darkThemeLink.href = darkThemeHref;
    } else {
        darkThemeLink.href = darkThemeHref; // Update href if it already exists
    }

    // Check for saved mode in local storage
    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleSwitch) {
            toggleSwitch.checked = true;
        }
        document.head.appendChild(darkThemeLink); // Load dark theme
        lightThemeLink.disabled = true; // Disable light theme
    } else {
        lightThemeLink.disabled = false; // Ensure light theme is enabled
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('mode', 'dark');
                document.head.appendChild(darkThemeLink); // Load dark theme
                lightThemeLink.disabled = true; // Disable light theme
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('mode', 'light');
                if (document.head.contains(darkThemeLink)) {
                    document.head.removeChild(darkThemeLink); // Unload dark theme
                }
                lightThemeLink.disabled = false; // Enable light theme
            }

        });
    }
}

function BodyDarkMode() {
    const toggleSwitch = document.getElementById('modeToggle');
    const body = document.body;

    // Check for saved mode in local storage
    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleSwitch) {
            toggleSwitch.checked = true;
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('mode', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('mode', 'light');
            }
        });
    }
}


function CodeDarkMode(lightThemeHref, darkThemeHref) {
    let lightThemeLink = document.getElementById('light-theme-link');
    let darkThemeLink = document.getElementById('dark-theme-link');

    // Create light theme link if it doesn't exist
    if (!lightThemeLink) {
        lightThemeLink = document.createElement('link');
        lightThemeLink.id = 'light-theme-link';
        lightThemeLink.rel = 'stylesheet';
        lightThemeLink.href = lightThemeHref;
        document.head.appendChild(lightThemeLink);
    } else {
        lightThemeLink.href = lightThemeHref; // Update href if it already exists
    }

    // Create dark theme link if it doesn't exist
    if (!darkThemeLink) {
        darkThemeLink = document.createElement('link');
        darkThemeLink.id = 'dark-theme-link';
        darkThemeLink.rel = 'stylesheet';
        darkThemeLink.href = darkThemeHref;
    } else {
        darkThemeLink.href = darkThemeHref; // Update href if it already exists
    }

    // Check for saved mode in local storage
    if (localStorage.getItem('mode') === 'dark') {
        document.head.appendChild(darkThemeLink); // Load dark theme
        lightThemeLink.disabled = true; // Disable light theme
    } else {
        if (document.head.contains(darkThemeLink)) {
            document.head.removeChild(darkThemeLink); // Ensure dark theme is unloaded
        }
        lightThemeLink.disabled = false; // Ensure light theme is enabled
    }

    const toggleSwitch = document.getElementById('modeToggle');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
                if (!document.head.contains(darkThemeLink)) {
                    document.head.appendChild(darkThemeLink); // Load dark theme
                }
                lightThemeLink.disabled = true; // Disable light theme
                localStorage.setItem('mode', 'dark'); // Save mode to local storage
            } else {
                if (document.head.contains(darkThemeLink)) {
                    document.head.removeChild(darkThemeLink); // Unload dark theme
                }
                lightThemeLink.disabled = false; // Enable light theme
                localStorage.setItem('mode', 'light'); // Save mode to local storage
            }
        });
    }
}


// const initialLightTheme = codeThemeSwitch('light-theme-select', 'lightTheme', 0);
// const initialDarkTheme = codeThemeSwitch('dark-theme-select', 'darkTheme', 0);
// CodeDarkMode(initialLightTheme, initialDarkTheme); 

document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault();  // Prevent the default action of '/'
        const searchBar = document.getElementById('searchBar');
        if (searchBar) {
            searchBar.focus();  // Focus the search bar
        } else {
            console.error('Search bar not found');
        }
    }
});


function SearchBar() {
    const searchBars = document.querySelectorAll('#searchBar, #searchBarMobile');
    const dropdown = document.getElementById('autocomplete-dropdown');
    const maxItems = 6;
    let currentFocus = -1;

    if (!searchBars.length || !dropdown) {
        console.log('Search bar or dropdown element not found');
        return;
    }

    // Load suggestions from JSON file
    fetch('../assets/json/suggestions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is sloppy sloppy: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const suggestions = data.articles; // Access the articles array within the JSON data

            searchBars.forEach(searchBar => {
                searchBar.addEventListener('input', function () {
                    const query = searchBar.value.toLowerCase();
                    dropdown.innerHTML = '';
                    currentFocus = -1;

                    if (query) {
                        const choice = "include"; // or "start-with"
                        const filteredSuggestions = choice === "include" 
                            ? suggestions.filter(item => item.title.toLowerCase().includes(query)).slice(0, maxItems)
                            : suggestions.filter(item => item.title.toLowerCase().startsWith(query)).slice(0, maxItems);

                        filteredSuggestions.forEach((item, index) => {
                            const div = document.createElement('div');
                            div.textContent = item.title;
                            div.className = 'autocomplete-item';
                            div.addEventListener('click', function () {
                                searchBar.value = item.title;
                                window.open(item.link, '_blank'); // Open in new tab
                                searchBar.value = ''; // Clear the search bar
                                dropdown.innerHTML = '';
                                dropdown.style.display = 'none';
                            });
                            dropdown.appendChild(div);
                        });

                        dropdown.style.display = 'block'; // Show dropdown
                    } else {
                        dropdown.style.display = 'none'; // Hide dropdown
                    }
                });

                searchBar.addEventListener('keydown', function (event) {
                    const items = dropdown.getElementsByClassName('autocomplete-item');
                    if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        currentFocus++;
                        if (currentFocus >= items.length) currentFocus = 0;
                        addActive(items);
                    } 
                    else if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        currentFocus--;
                        if (currentFocus < 0) currentFocus = items.length - 1;
                        addActive(items);
                    } 
                    else if (event.key === 'Enter') {
                        event.preventDefault();
                        if (currentFocus > -1 && items[currentFocus]) {
                            items[currentFocus].click();
                        } 
                        else {
                            const filteredSuggestion = suggestions.find(item => item.title.toLowerCase() === searchBar.value.toLowerCase());
                            if (filteredSuggestion) {
                                window.open(filteredSuggestion.link, '_blank');
                                searchBar.value = '';
                                dropdown.innerHTML = '';
                                dropdown.style.display = 'none';
                            }
                        }
                    }
                });

                function addActive(items) {
                    if (!items) return false;
                    removeActive(items);
                    if (currentFocus >= items.length) currentFocus = 0;
                    if (currentFocus < 0) currentFocus = items.length - 1;
                    items[currentFocus].classList.add('autocomplete-active');
                }

                function removeActive(items) {
                    for (let item of items) {
                        item.classList.remove('autocomplete-active');
                    }
                }
            });

            // Hide dropdown when clicking outside
            document.addEventListener('click', function (event) {
                const target = event.target;
                if (![...searchBars].some(bar => bar.contains(target)) && !dropdown.contains(target)) {
                    dropdown.style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Error loading suggestions:', error);
        });
}



function codeThemeSwitch(id, storageKey, defaultIndex) {
    const selectElement = document.getElementById(id);
    if (!selectElement) {
        console.error(`Element with ID ${id} not found`);
        return null;
    }
    const defaultChoice = selectElement.options[defaultIndex].value;

    // Load the saved value from localStorage or use the default value
    const savedValue = localStorage.getItem(storageKey) || defaultChoice;

    // Set the select dropdown to the saved or default value
    selectElement.value = savedValue;

    selectElement.addEventListener('change', function () {
        const selectedValue = selectElement.value;

        // Save the selected value to localStorage
        localStorage.setItem(storageKey, selectedValue);

        // Broadcast the change to other tabs
        window.localStorage.setItem(`${storageKey}Changed`, Date.now());

        // Reload the page to apply the new theme
        window.location.reload();
    });

    // Listen for changes in localStorage to update the value in real-time
    window.addEventListener('storage', function(event) {
        if (event.key === `${storageKey}Changed`) {
            window.location.reload();
        }
    });

    return savedValue;
}

function Switcher(attribute, target, id, selectors, defaultIndex) {
    const selectElement = document.getElementById(id);
    if (!selectElement) {
        console.error(`Element with ID ${id} not found`);
        return;
    }
    const defaultChoice = selectElement.options[defaultIndex].value;
    const targetSelectors = selectors;

    function applyChange(value) {
        targetSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style[attribute] = value;
            });
        });
    }

    // Load the saved value from localStorage or use the default value
    const savedValue = localStorage.getItem(target) || defaultChoice;
    applyChange(savedValue);

    // Set the select dropdown to the saved or default value
    selectElement.value = savedValue;

    selectElement.addEventListener('change', function () {
        const selectedValue = selectElement.value;
        applyChange(selectedValue);

        // Save the selected value to localStorage
        localStorage.setItem(target, selectedValue);

        // Broadcast the change to other tabs
        window.localStorage.setItem(`${target}Changed`, Date.now());
    });

    // Listen for changes in localStorage to update the value in real-time
    window.addEventListener('storage', function(event) {
        if (event.key === `${target}Changed`) {
            const newValue = localStorage.getItem(target);
            if (newValue) {
                applyChange(newValue);
                selectElement.value = newValue;
            }
        }
    });
}

function Setting() {
    const button = document.getElementById('toggleButton');
    const divElement = document.getElementById('settings_window');

    if (button && divElement) { // Ensure elements are found before adding the event listener
        button.addEventListener('click', function () {
            if (divElement.classList.contains('hidden')) {
                divElement.classList.remove('hidden');
                divElement.classList.add('show');
            } else {
                divElement.classList.remove('show');
                divElement.classList.add('hidden');
            }
        });
    } 
    else {
        console.error('toggleButton or settings_window not found in the DOM, in summary, buggy buggy');
    }
}



$(function() {
    // Load the top bar
    $(".top-nav").load("../assets/source/top-bar-and-setting.html", function() {
        // Once the top bar is loaded, initialize functionalities
        const initialLightTheme = codeThemeSwitch('light-theme-select', 'lightTheme', 0);
        const initialDarkTheme = codeThemeSwitch('dark-theme-select', 'darkTheme', 0);

        BodyDarkMode();
        CodeDarkMode(initialLightTheme, initialDarkTheme);
        $(".top-nav").load("../assets/source/top-bar-and-setting.html", function() {
            // Once the top bar is loaded, initialize functionalities
            BodyDarkMode();
            const lightTheme = codeThemeSwitch('light-theme-select', 'lightTheme', 0);
            const darkTheme = codeThemeSwitch('dark-theme-select', 'darkTheme', 0);
            CodeDarkMode(lightTheme, darkTheme); 
            Switcher('fontFamily', 'fontFamily', 'font-select', ['.general-wrapper', '.navbar'], 0);
            Switcher('fontSize', 'fontSize', 'font-size-select', ['p'], 1);
            SearchBar();
    
        });
    });
    
    $(".side-nav-container").load("../assets/source/side-nav.html");
    $(".highlights-and-attribute").load("../assets/source/highlights-and-attribute.html");
    $("#logo").load("../assets/source/logo.html");
    $(".footer").load("../assets/source/footer.html");
    
});


// JQuery to load html with script, code by Cannicide on https://stackoverflow.com/questions/5519792/how-to-load-script-with-jquery-load
// Did not work very well on this site
// $(".content-grid").load("assets/source/Chladni.html", function(data) {
//     var scripts = $(data).find("script");

//     if (scripts.length) {
//         $(scripts).each(function() {
//             if ($(this).attr("src")) {
//                 $.getScript($(this).attr("src"));
//             }
//             else {
//                 eval($(this).html());
//             }
//         });
//     }

// });