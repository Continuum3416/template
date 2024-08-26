// NORMAL SETUP MEANS THAT NO DYNAMIC CONTENT LOADING
// SETTINGS BUTTON IN NORMAL SETUP
// document.addEventListener('DOMContentLoaded', function () {
//     const button = document.getElementById('toggleButton');
//     const divElement = document.getElementById('settings_window');

//     button.addEventListener('click', function () {
//         if (divElement.classList.contains('hidden')) {
//             divElement.classList.remove('hidden');
//             divElement.classList.add('show');
//         } else {
//             divElement.classList.remove('show');
//             divElement.classList.add('hidden');
//         }
//     });
// });

// DARK MODE BUTTON IN NORMAL SETUP
// document.addEventListener('DOMContentLoaded', (event) => {
//     const toggleSwitch = document.getElementById('modeToggle');
//     const body = document.body;
//     const linkElement = document.createElement('link');
//     linkElement.rel = 'stylesheet';
//     linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-okaidia.min.css'; // Dark theme (okaidia)

//     // Check for saved mode in local storage
//     if (localStorage.getItem('mode') === 'dark') {
//         body.classList.add('dark-mode');
//         toggleSwitch.checked = true;
//         document.head.appendChild(linkElement); // Load dark theme
//     }

//     toggleSwitch.addEventListener('change', () => {
//         if (toggleSwitch.checked) {
//             body.classList.add('dark-mode');
//             localStorage.setItem('mode', 'dark');
//             document.head.appendChild(linkElement); // Load dark theme
//         } 
//         else {
//             body.classList.remove('dark-mode');
//             localStorage.setItem('mode', 'light');
//             if (document.head.contains(linkElement)) {
//                 document.head.removeChild(linkElement); // Unload dark theme
//             }
//         }
//     });
// });

// COPY BUTTON IN NORMAL SETUP
// document.addEventListener('DOMContentLoaded', function () {
//     // Select all copy buttons and code blocks
//     const copyButtons = document.querySelectorAll('.copy-btn');
//     const codeBlocks = document.querySelectorAll('.code-container code');

//     // Ensure that each copy button works with its corresponding code block
//     copyButtons.forEach((button, index) => {
//         button.addEventListener('click', function () {
//             // Get the corresponding code block for the current button
//             const code = codeBlocks[index];
            
//             navigator.clipboard.writeText(code.innerText).then(function () {
//                 button.textContent = 'Copied!';
//                 setTimeout(function () {
//                     button.textContent = 'Copy';
//                 }, 1000);
//             }, function () {
//                 button.textContent = 'Failed to copy';
//             });
//         });
//     });
// });


// SEARCH BAR
document.addEventListener('DOMContentLoaded', function () {
        const searchBar = document.getElementById('searchBar');
        const dropdown = document.getElementById('autocomplete-dropdown');
        const maxItems = 6;
        let currentFocus = -1;

        if (!searchBar || !dropdown) {
            console.log('Search bar or dropdown element not found');
            return;
        }

        // Load suggestions from JSON file
        fetch('assets/json/suggestions.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is sloppy sloppy: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const suggestions = data;

                searchBar.addEventListener('input', function () {
                    const query = searchBar.value.toLowerCase();
                    dropdown.innerHTML = '';
                    currentFocus = -1;

                    if (query) {
                        const choice = "start-with"; // or "include"
                        const filteredSuggestions = choice === "include" 
                            ? suggestions.filter(item => item.text.toLowerCase().includes(query)).slice(0, maxItems)
                            : suggestions.filter(item => item.text.toLowerCase().startsWith(query)).slice(0, maxItems);

                        filteredSuggestions.forEach((item, index) => {
                            const div = document.createElement('div');
                            div.textContent = item.text;
                            div.className = 'autocomplete-item';
                            div.addEventListener('click', function () {
                                searchBar.value = item.text;
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
                    } else if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        currentFocus--;
                        if (currentFocus < 0) currentFocus = items.length - 1;
                        addActive(items);
                    } else if (event.key === 'Enter') {
                        event.preventDefault();
                        if (currentFocus > -1 && items[currentFocus]) {
                            items[currentFocus].click();
                        } else {
                            const filteredSuggestion = suggestions.find(item => item.text.toLowerCase() === searchBar.value.toLowerCase());
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

                // Hide dropdown when clicking outside
                document.addEventListener('click', function (event) {
                    if (!searchBar.contains(event.target) && !dropdown.contains(event.target)) {
                        dropdown.style.display = 'none';
                    }
                });
            })
            .catch(error => {
                console.error('Error loading suggestions:', error);
            });
});

function FontSwitcher(){
    const fontSelect = document.getElementById('font-select');
    const targetClasses = ['general-wrapper', 'navbar']; // List of target classes
    const defaultFont = fontSelect.options[0].value; // Use the first option as the default font

    function applyFontFamily(fontFamily) {
        targetClasses.forEach(className => {
            document.querySelectorAll(`.${className}`).forEach(element => {
                element.style.fontFamily = fontFamily;
            });
        });
    }

    // Load the saved font family from localStorage or use the default font
    const savedFont = localStorage.getItem('fontFamily') || defaultFont;
    applyFontFamily(savedFont);

    // Set the font select dropdown to the saved or default font
    fontSelect.value = savedFont;

    fontSelect.addEventListener('change', function () {
        const selectedFont = fontSelect.value;
        applyFontFamily(selectedFont);

        // Save the selected font family to localStorage
        localStorage.setItem('fontFamily', selectedFont);

        // Broadcast the change to other tabs
        window.localStorage.setItem('fontFamilyChanged', Date.now());
    });

    // Listen for changes in localStorage to update font family in real-time
    window.addEventListener('storage', function(event) {
        if (event.key === 'fontFamilyChanged') {
            const newFont = localStorage.getItem('fontFamily');
            if (newFont) {
                applyFontFamily(newFont);
                fontSelect.value = newFont;
            }
        }
    });
}
//FontSwitcher();

function FontSizeSwitcher(id) {
    const fontSizeSelect = document.getElementById(id);
    const targetSelectors = ['p', '.navbar']; // List of target selectors
    const defaultFontSize = fontSizeSelect.options[1].value; // Use the second option as the default font size

    function applyFontSize(fontSize) {
        targetSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.fontSize = fontSize;
            });
        });
    }

    // Load the saved font size from localStorage or use the default font size
    const savedFontSize = localStorage.getItem('fontSize') || defaultFontSize;
    applyFontSize(savedFontSize);

    // Set the font size select dropdown to the saved or default font size
    fontSizeSelect.value = savedFontSize;

    fontSizeSelect.addEventListener('change', function () {
        const selectedFontSize = fontSizeSelect.value;
        applyFontSize(selectedFontSize);

        // Save the selected font size to localStorage
        localStorage.setItem('fontSize', selectedFontSize);

        // Broadcast the change to other tabs
        window.localStorage.setItem('fontSizeChanged', Date.now());
    });

    // Listen for changes in localStorage to update font size in real-time
    window.addEventListener('storage', function(event) {
        if (event.key === 'fontSizeChanged') {
            const newFontSize = localStorage.getItem('fontSize');
            if (newFontSize) {
                applyFontSize(newFontSize);
                fontSizeSelect.value = newFontSize;
            }
        }
    });
}




// function codeThemeSwitch(id, storageKey, defaultIndex) {
//     const selectElement = document.getElementById(id);
//     if (!selectElement) {
//         console.error(`Element with ID ${id} not found`);
//         return null;
//     }
//     const defaultChoice = selectElement.options[defaultIndex].value;

//     // Load the saved value from localStorage or use the default value
//     const savedValue = localStorage.getItem(storageKey) || defaultChoice;

//     // Set the select dropdown to the saved or default value
//     selectElement.value = savedValue;
//     //applyCodeThemeChange(savedValue);
//     selectElement.addEventListener('change', function () {
//         const selectedValue = selectElement.value;
//         //applyCodeThemeChange(selectedValue);
//         // Save the selected value to localStorage
//         localStorage.setItem(storageKey, selectedValue);

//         // Broadcast the change to other tabs
//         window.localStorage.setItem(`${storageKey}Changed`, Date.now());
//     });

//     // Listen for changes in localStorage to update the value in real-time
//     window.addEventListener('storage', function(event) {
//         if (event.key === `${storageKey}Changed`) {
//             const newValue = localStorage.getItem(storageKey);
//             if (newValue) {
//                 applyChange(newValue);
//                 selectElement.value = newValue;
//             }
//         }
//     });

//     return savedValue;
// }


function SearchBar() {
    const searchBar = document.querySelectorAll('searchBar', 'searchBarMobile');
    const dropdown = document.getElementById('autocomplete-dropdown');
    const maxItems = 6;
    let currentFocus = -1;

    if (!searchBar || !dropdown) {
        console.log('Search bar or dropdown element not found');
        return;
    }

    // Load suggestions from JSON file
    fetch('assets/json/suggestions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is sloppy sloppy: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const suggestions = data;

            searchBar.addEventListener('input', function () {
                const query = searchBar.value.toLowerCase();
                dropdown.innerHTML = '';
                currentFocus = -1;

                if (query) {
                    const choice = "start-with"; // or "include"
                    const filteredSuggestions = choice === "include" 
                        ? suggestions.filter(item => item.text.toLowerCase().includes(query)).slice(0, maxItems)
                        : suggestions.filter(item => item.text.toLowerCase().startsWith(query)).slice(0, maxItems);

                    filteredSuggestions.forEach((item, index) => {
                        const div = document.createElement('div');
                        div.textContent = item.text;
                        div.className = 'autocomplete-item';
                        div.addEventListener('click', function () {
                            searchBar.value = item.text;
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

            // some event listeners here
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
                        const filteredSuggestion = suggestions.find(item => item.text.toLowerCase() === searchBar.value.toLowerCase());
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

            // Hide dropdown when clicking outside
            document.addEventListener('click', function (event) {
                if (!searchBar.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.style.display = 'none';
                }
            });
        })
    .catch(error => {
        console.error('Error loading suggestions:', error);
    });
}