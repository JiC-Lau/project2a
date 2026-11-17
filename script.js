// ========================================
// Music Explorer - Project 2a
// JavaScript and AJAX using Last.fm API
// ========================================


// 1. GET HTML ELEMENTS

// Artist search
const artistForm = document.getElementById("artistForm");
const artistSelect = document.getElementById("artistSelect");
const artistSearch = document.getElementById("artistSearch");
const searchMessage = document.getElementById("searchMessage");

// Artist information
const artistName = document.getElementById("artistName");
const artistImage = document.getElementById("artistImage");
const artistImagePlaceholder = document.getElementById("artistImagePlaceholder");
const artistTags = document.getElementById("artistTags");
const artistDescription = document.getElementById("artistDescription");
const artistLink = document.getElementById("artistLink");

// Album cards
const albumGrid = document.getElementById("albumGrid");
const albumMessage = document.getElementById("albumMessage");

// Selected album details
const selectedAlbumTitle = document.getElementById("selectedAlbumTitle");
const selectedAlbumArtist = document.getElementById("selectedAlbumArtist");
const selectedAlbumInfo = document.getElementById("selectedAlbumInfo");
const selectedAlbumImage = document.getElementById("selectedAlbumImage");
const albumImagePlaceholder = document.getElementById("albumImagePlaceholder");
const trackList = document.getElementById("trackList");
const trackMessage = document.getElementById("trackMessage");
const albumLink = document.getElementById("albumLink");

// Request counters help ignore outdated API responses
let searchId = 0;
let albumRequestId = 0;


// ========================================
// 2. FETCH DATA FROM NETLIFY FUNCTION
// ========================================

// This function requests data from our Netlify Function.
// The API key is stored securely in Netlify.

async function fetchMusicData(method, parameters) {

    const url = new URL(
        "/.netlify/functions/music",
        window.location.origin
    );

    // Add the API method
    url.searchParams.set("method", method);

    // Add artist or album parameters
    for (const key in parameters) {
        url.searchParams.set(key, parameters[key]);
    }

    // Send AJAX request
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to retrieve music information.");
    }

    // Convert JSON response to JavaScript object
    const data = await response.json();

    // Check for Last.fm API errors
    if (data.error) {
        throw new Error(data.message || "Last.fm API error.");
    }

    return data;
}


// ========================================
// 3. HELPER FUNCTIONS
// ========================================

// Find the best available image from Last.fm

function getImage(images) {

    if (!Array.isArray(images)) {
        return "";
    }

    const sizes = ["extralarge", "large", "medium", "small"];

    for (const size of sizes) {

        const image = images.find(function(item) {
            return item.size === size && item["#text"];
        });

        if (image) {
            return image["#text"];
        }
    }

    return "";
}


// Display an image or a placeholder

function showImage(imageElement, placeholder, imageUrl) {

    imageElement.hidden = true;
    placeholder.hidden = false;
    imageElement.removeAttribute("src");

    if (imageUrl) {

        imageElement.onload = function() {
            imageElement.hidden = false;
            placeholder.hidden = true;
        };

        imageElement.onerror = function() {
            imageElement.hidden = true;
            placeholder.hidden = false;
        };

        imageElement.src = imageUrl;
    }
}


// Display a Last.fm link

function showLink(linkElement, url) {

    linkElement.hidden = true;
    linkElement.removeAttribute("href");

    if (!url) {
        return;
    }

    try {

        const link = new URL(url);

        if (link.protocol === "https:" || link.protocol === "http:") {
            linkElement.href = link.href;
            linkElement.hidden = false;
        }

    } catch (error) {
        console.log("Invalid link:", url);
    }
}


// Convert seconds into minutes and seconds

function formatDuration(seconds) {

    const duration = Number(seconds);

    if (!Number.isFinite(duration) || duration <= 0) {
        return "—";
    }

    const minutes = Math.floor(duration / 60);
    const remainingSeconds = Math.floor(duration % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}


// Remove HTML tags from artist biography

function cleanText(html) {

    const temporaryElement = document.createElement("div");

    temporaryElement.innerHTML = html || "";

    return temporaryElement.textContent.trim();
}


// ========================================
// 4. DISPLAY ARTIST INFORMATION
// ========================================

async function displayArtist(artist, currentSearchId) {

    // Request artist information from Last.fm
    const data = await fetchMusicData("artist.getinfo", {
        artist: artist,
        autocorrect: "1"
    });

    // Ignore outdated responses
    if (currentSearchId !== searchId) {
        return null;
    }

    const artistData = data.artist;

    // Display artist name
    artistName.textContent = artistData.name;

    // Display artist image
    const imageUrl = getImage(artistData.image);

    showImage(artistImage, artistImagePlaceholder, imageUrl);

    // Display music tags
    const tags = artistData.tags?.tag || [];

    artistTags.textContent = tags
        .slice(0, 3)
        .map(function(tag) {
            return tag.name;
        })
        .join(" · ");

    // Display biography
    const biography = cleanText(artistData.bio?.summary);

    artistDescription.textContent =
        biography || "No artist description available.";

    // Display Last.fm link
    showLink(artistLink, artistData.url);

    // Return the artist's correct name
    return artistData.name;
}


// ========================================
// 5. DISPLAY ALBUM CARDS
// ========================================

async function displayAlbums(artist, currentSearchId) {

    // Request the artist's top albums
    const data = await fetchMusicData("artist.gettopalbums", {
        artist: artist,
        limit: "6",
        autocorrect: "1"
    });

    if (currentSearchId !== searchId) {
        return;
    }

    // Clear previous album cards
    albumGrid.textContent = "";

    const albums = data.topalbums?.album || [];

    if (albums.length === 0) {
        albumMessage.textContent = "No albums found.";
        return;
    }

    albumMessage.textContent = "Showing " + albums.length + " albums.";

    // Create a card for each album
    albums.forEach(function(album) {

        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("album-card");

        // Album image
        const imageUrl = getImage(album.image);

        if (imageUrl) {

            const image = document.createElement("img");

            image.src = imageUrl;
            image.alt = "Artwork for " + album.name;

            card.appendChild(image);

        } else {

            const placeholder = document.createElement("div");

            placeholder.classList.add("album-art-placeholder");
            placeholder.textContent = "Album artwork";

            card.appendChild(placeholder);
        }

        // Album title
        const title = document.createElement("h3");
        title.textContent = album.name;

        // Artist name
        const description = document.createElement("p");
        description.textContent = artist;

        // View album text
        const viewText = document.createElement("span");
        viewText.textContent = "View album";

        // Add content to card
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(viewText);

        // Listen for album clicks
        card.addEventListener("click", function() {

            // Remove previous selection
            document.querySelectorAll(".album-card").forEach(function(item) {
                item.classList.remove("selected");
            });

            // Highlight selected album
            card.classList.add("selected");

            // Load album information
            displayAlbumDetails(artist, album.name);
        });

        // Add card to webpage
        albumGrid.appendChild(card);
    });
}


// ========================================
// 6. DISPLAY ALBUM DETAILS AND TRACKS
// ========================================

async function displayAlbumDetails(artist, albumName) {

    const currentRequestId = ++albumRequestId;

    // Show loading message
    selectedAlbumTitle.textContent = "Loading album...";
    selectedAlbumArtist.textContent = "";
    selectedAlbumInfo.textContent = "";

    trackList.textContent = "";
    trackMessage.textContent = "Loading tracks...";

    showImage(selectedAlbumImage, albumImagePlaceholder, "");
    showLink(albumLink, "");

    try {

        // Request album information
        const data = await fetchMusicData("album.getinfo", {
            artist: artist,
            album: albumName,
            autocorrect: "1"
        });

        // Ignore outdated responses
        if (currentRequestId !== albumRequestId) {
            return;
        }

        const album = data.album;

        // Display album title and artist
        selectedAlbumTitle.textContent = album.name;
        selectedAlbumArtist.textContent = album.artist;

        // Display album image
        const imageUrl = getImage(album.image);

        showImage(selectedAlbumImage, albumImagePlaceholder, imageUrl);

        // Get tracks
        const tracks = album.tracks?.track || [];

        const trackArray = Array.isArray(tracks) ? tracks : [tracks];

        // Display album release date and track count
        const releaseDate = album.releasedate?.trim();

        selectedAlbumInfo.textContent =
            (releaseDate ? "Released " + releaseDate + " · " : "") +
            trackArray.length + " tracks";

        // Clear previous tracks
        trackList.textContent = "";

        // Create a table row for each track
        trackArray.forEach(function(track, index) {

            const row = document.createElement("tr");

            const numberCell = document.createElement("td");
            const titleCell = document.createElement("td");
            const timeCell = document.createElement("td");

            numberCell.textContent = index + 1;
            titleCell.textContent = track.name;
            timeCell.textContent = formatDuration(track.duration);

            row.appendChild(numberCell);
            row.appendChild(titleCell);
            row.appendChild(timeCell);

            trackList.appendChild(row);
        });

        // Show message if no tracks exist
        trackMessage.textContent =
            trackArray.length > 0 ? "" : "No tracks available.";

        // Display Last.fm album link
        showLink(albumLink, album.url);

    } catch (error) {

        if (currentRequestId !== albumRequestId) {
            return;
        }

        selectedAlbumTitle.textContent = albumName;
        selectedAlbumArtist.textContent = artist;
        selectedAlbumInfo.textContent = "";

        trackList.textContent = "";
        trackMessage.textContent = "Unable to load album details.";

        console.error(error);
    }
}


// ========================================
// 7. SEARCH FOR AN ARTIST
// ========================================

async function searchArtist(artist) {

    const currentSearchId = ++searchId;

    // Ignore previous album requests
    albumRequestId++;

    // Show loading message
    searchMessage.textContent = "Loading artist information...";

    // Clear previous results
    albumGrid.textContent = "";
    albumMessage.textContent = "";

    artistName.textContent = "Loading...";
    artistTags.textContent = "";
    artistDescription.textContent = "";

    showImage(artistImage, artistImagePlaceholder, "");
    showLink(artistLink, "");

    selectedAlbumTitle.textContent = "Select an album";
    selectedAlbumArtist.textContent = "";
    selectedAlbumInfo.textContent = "";

    trackList.textContent = "";
    trackMessage.textContent = "Select an album to view its tracks.";

    showImage(selectedAlbumImage, albumImagePlaceholder, "");
    showLink(albumLink, "");

    try {

        // Get artist information
        const actualArtistName = await displayArtist(
            artist,
            currentSearchId
        );

        if (currentSearchId !== searchId) {
            return;
        }

        searchMessage.textContent = "Artist found.";

        // Get the artist's albums
        await displayAlbums(actualArtistName, currentSearchId);

    } catch (error) {

        if (currentSearchId !== searchId) {
            return;
        }

        searchMessage.textContent = "Unable to find the artist.";

        artistName.textContent = "Artist not found";

        artistDescription.textContent =
            "Please check the artist name and try again.";

        albumMessage.textContent = "No albums to display.";

        console.error(error);
    }
}


// ========================================
// 8. EVENT LISTENERS
// ========================================

// Search when the form is submitted
artistForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const typedArtist = artistSearch.value.trim();
    const selectedArtist = artistSelect.value;

    // Prioritize typed artist name
    const artist = typedArtist || selectedArtist;

    // Validate input
    if (artist === "") {

        searchMessage.textContent =
            "Please select an artist or enter an artist name.";

        return;
    }

    searchArtist(artist);
});


// Search when an artist is selected from dropdown
artistSelect.addEventListener("change", function() {

    if (artistSelect.value !== "") {

        // Clear search field
        artistSearch.value = "";

        // Search selected artist
        searchArtist(artistSelect.value);
    }
});


