# Project 2a: Music Explorer


**Author(s):** Ji Choi

## Project plan

### Project idea

Music Explorer is a web application that allows users to discover information about music artists and their albums.
The application will use the Last.fm API to retrieve music information from a live server.
Users will be able to select an artist from a predefined list or search for an artist by name.
The application will display information about the selected artist, their albums and the songs included in an album, depending on the information available from the API.

### Planned features

The application will include the following features:
1. Artist Selection - Users can select an artist from a dropdown menu containing predefined artists.
2. Artist Information - After selecting an artist, the application retrieves and displays available artist information.
3. Album Information - The application displays albums associated with the selected artist, including album titles, images and other available information.
4. Track Information - Users can select an album to view its track listing.
5. Artist Search - Users can enter an artist's name in a search field to find additional artists.
6. Dynamic Content - JavaScript updates the displayed information without reloading the entire webpage.


### Wireframe / sketch

<img width="566" height="530" alt="image" src="https://github.com/user-attachments/assets/b790c2ac-93f4-4da5-bac3-f0e94b16287d" />


## Web links

- **Published application:** [Add your GitHub Pages URL here](https://yourusername.github.io/your-repository/)
- **GitHub repository:** [Add your repository URL here](https://github.com/yourusername/your-repository)
- **Project video presentation:** [Add your video URL here](https://example.com/)

## About the application

**[Music Explorer]** is a browser-based application that retrieves music information from the Last.fm API.
Unlike applications that use static data, Music Explorer retrieves information from a live REST API.
When a user selects or searches for an artist, JavaScript sends a request to the API.
The returned JSON data is processed, and the relevant information is displayed dynamically on the webpage.
The application is intended for users who want to explore music artists and discover their albums.

## Technologies

The project will use the following technologies:

- HTML - Used to create the structure of the webpage, including search fields, dropdown menus and content sections.
- CSS - Used to style the application, organize the layout and make the interface responsive.
- JavaScript - Used to handle user interactions, make API requests, process JSON data and dynamically update the webpage.
- Fetch API - Used to send asynchronous HTTP requests to the Last.fm API.
- JSON - Used to process the data returned by the API.
- DOM Manipulation - Used to create and update HTML elements dynamically based on the retrieved information.
- Last.fm REST API - Used as the external source of music information.


## How to use the application

1. Open the published Music Explorer application.
2. Select an artist from the dropdown menu.
3. View the artist information and available albums.
4. Select an album to view its track information.
5. Alternatively, enter an artist's name in the search field.
6. Click Search to retrieve information about another artist.
7. Explore the displayed music information.


## Running the application locally

1. Clone or download this repository to your computer.
2. Open the project folder.
3. Open `index.html` in a web browser.

## Screenshots

Add at least one screenshot of your working application.

Example:

![Screenshot of the application](img/screenshot.png)

## Known issues / limitations

Possible limitations to investigate include:

- Some artists or albums may not have images available.
- Some API responses may contain incomplete information.
- The application requires an internet connection.
- API requests may be subject to service limitations.


## Division of work

This project is planned as individual work.

## Self-assessment and learning reflection

Reflect on your work and learning process.

- What did I succeed in?
- What was challenging?
- What would I improve if I had more time?
- What did I learn about HTML, CSS, JavaScript and DOM scripting?
- What remained unclear or what would I like to learn more about?
- My self-assessed project grade: **xx/10 points**

## Sources and acknowledgements

API Documentation - Last.fm API: https://www.last.fm/api
Course Materials - Laurea JavaScript course materials and workshop exercises.
AI Assistance - Microsoft Copilot was used as a learning and development assistant. Copilot supported project planning, understanding JavaScript concepts, developing and reviewing code, and troubleshooting.


## License

This project is licensed under the MIT License.

More information about adding a license to a GitHub repository:  
https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository
