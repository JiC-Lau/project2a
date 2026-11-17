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

- **Published application:** (https://cerulean-khapse-5cde21.netlify.app/))
- **GitHub repository:** (https://github.com/JiC-Lau/project2a)
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

the application can be accessed directly through the published Netlify website:
https://cerulean-khapse-5cde21.netlify.app


## Screenshots

<img width="862" height="699" alt="image" src="https://github.com/user-attachments/assets/d5dc79d1-a0a3-422e-a28c-c1fb00ec9b56" />


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
  
I managed to build and publish my Music Explorer application using the Last.fm API. The application allows users to search for artists and explore their albums and songs.
Compared to my first project, this was a step forward because I worked with a live API instead of just storing and managing data in the browser.

- What was challenging?

The biggest challenge was connecting the application to the Last.fm API and deploying it through Netlify.
Although I had practiced JavaScript in earlier workshops, I still find it difficult to remember the syntax and know how to put everything together.
I relied heavily on Microsoft Copilot throughout this project, especially when setting up Netlify and handling the API key securely. I needed detailed, step-by-step guidance. When something didn't work, I shared screenshots of the errors and followed Copilot's suggestions to troubleshoot them one by one.
For example, I learned that a small mistake in a folder name could stop Netlify from recognizing a function.
I realized that understanding individual JavaScript concepts is different from knowing how to combine them into a working application.
  
- What would I improve if I had more time?

I would improve the visual design and add more interactive features, such as filtering albums or displaying more detailed music information.
I would also like to improve the error messages so users can better understand when information is unavailable.

- What did I learn about HTML, CSS, JavaScript and DOM scripting?

I learned how HTML provides the structure, CSS controls the appearance, and JavaScript makes the application interactive.
More importantly, I learned how JavaScript can retrieve information from an external API using fetch() and async/await, process JSON data, and dynamically display the results using DOM manipulation.
I also learned how Netlify Functions can be used to keep an API key out of the browser code (but honestly I'm not sure if my API key is now kept confidentially as it kept asking me to upgrade to keep confidential information)

- What remained unclear or what would I like to learn more about?

I still need more practice with asynchronous JavaScript, API requests and error handling.
I also want to better understand how Netlify Functions work and how the frontend communicates with the server.
While Copilot helped me complete the project, I recognize that I still depend on AI guidance quite a lot. My next goal is to become more independent in writing JavaScript and troubleshooting errors.
This project reminded me that I don't necessarily need to memorize every JavaScript command, but I do need to understand the logic behind the code and how different parts work together.

- My self-assessed project grade: **xx/10 points**

If I need to be assessed by independent work (Without using AI), then my grade would be low. However, with the support from AI tool, I was able to build a full working web-application. So if it's okey to use AI, then 10. If not okey, then 7...

## Sources and acknowledgements

API Documentation - Last.fm API: https://www.last.fm/api
Course Materials - Laurea JavaScript course materials and workshop exercises.
AI Assistance - Microsoft Copilot was used as a learning and development assistant. Copilot supported project planning, understanding JavaScript concepts, developing and reviewing code, and troubleshooting.


## License

This project is licensed under the MIT License.

More information about adding a license to a GitHub repository:  
https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository
