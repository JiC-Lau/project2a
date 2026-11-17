// Netlify Function for Last.fm API requests

exports.handler = async function(event) {

    // Only allow GET requests
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed" })
        };
    }

    const apiKey = process.env.LASTFM_API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "API key is not configured" })
        };
    }

    // Read parameters sent by the browser
    const params = event.queryStringParameters || {};
    const method = params.method;

    const allowedMethods = [
        "artist.getinfo",
        "artist.gettopalbums",
        "album.getinfo"
    ];

    if (!allowedMethods.includes(method)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid API method" })
        };
    }

    // Build the Last.fm API URL
    const url = new URL("https://ws.audioscrobbler.com/2.0/");

    url.searchParams.set("method", method);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("format", "json");

    // Forward only the parameters our application needs
    if (params.artist) {
        url.searchParams.set("artist", params.artist);
    }

    if (params.album) {
        url.searchParams.set("album", params.album);
    }

    url.searchParams.set("autocorrect", "1");

    if (method === "artist.gettopalbums") {
        url.searchParams.set("limit", "6");
    }

    try {
        // Request data from Last.fm
        const response = await fetch(url, {
            headers: {
                "User-Agent": "MusicExplorer/1.0 (student project)"
            }
        });

        if (!response.ok) {
            throw new Error("Last.fm request failed");
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error("Last.fm API error:", error);

        return {
            statusCode: 502,
            body: JSON.stringify({
                error: "Unable to retrieve music information"
            })
        };
    }
};