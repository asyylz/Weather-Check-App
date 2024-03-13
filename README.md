<body>
    <h1>App Description:</h1>
    <p>The app is a weather information viewer that retrieves data from the OpenWeatherMap API. It allows users to
        search for weather information by city name, displays the current weather conditions including temperature,
        cloudiness, wind speed, humidity, and pressure. Additionally, it provides options for users to view weather
        information for predefined cities such as Birmingham, Manchester, New York, and Prague. The app also has a
        feature to automatically detect the user's location using geolocation.</p>
    <h2>Concepts Used:</h2>
    <ol>
        <li><strong>DOM Manipulation:</strong>DOM Manipulation: The app manipulates the Document Object Model (DOM) to
            access and update various elements of the HTML page dynamically. It selects HTML elements using
            document.querySelector() and updates their content or styles based on the fetched data.</li>
        <li><strong>Asynchronous JavaScript (Async/Await): </strong>Asynchronous programming is utilized to make HTTP
            requests to the OpenWeatherMap API and handle responses asynchronously. The fetchWeatherData function uses
            async/await to fetch weather data from the API and update the UI once the data is received.</li>
        <li><strong>API Integration: </strong>The app integrates with the OpenWeatherMap API to retrieve weather data
            for the specified city. It constructs API requests with the appropriate query parameters (e.g., city name,
            API key, units) and processes the JSON response to extract relevant weather information.</li>
    </ol>

</body>