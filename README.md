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
        <li><strong>Event Handling: </strong>Event listeners are used to handle user interactions such as clicking the
            search icon, pressing Enter in the input field, or clicking the geolocation icon. These listeners trigger
            the appropriate actions (e.g., fetching weather data, displaying city options) in response to user input.
        </li>
        <li><strong>Geolocation</strong>The app utilizes the browser's geolocation API to retrieve the user's current
            location (latitude and longitude). It then makes an API request to fetch weather data for the detected
            location and updates the UI accordingly.</li>
        <li><strong>Error Handling: </strong>The app includes error handling mechanisms to catch and handle any errors
            that may occur during API requests or data processing. It logs error messages to the console and ensures a
            graceful user experience even in case of errors.</li>
        <li><strong>Styling:</strong>The app applies styling to HTML elements dynamically based on weather conditions.
            It changes the background image of the container element depending on whether it is day or night, providing
            a visual representation of the current weather.</li>
    </ol>
</body>