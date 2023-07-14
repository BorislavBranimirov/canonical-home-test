# Canonical take-home test

Project for the Canonical take-home test.

The root directory contains the main files:

- `index.html`, the structure of the page
- `styles.scss`, additions to Vanilla framework's classes to replicate the design from the email. The file compiles to a CSS file in the /css directory.
- `index.js`, populates the post cards and adds them to the DOM

## Running the project

```sh
# Install the dependencies (sass, vanilla framework and lite-server)
npm i

# Build the CSS
npm run build

# Serve the HTML
npm run serve
```

Alternatively, after building the CSS, you can open the index.html file directly.

Note: The built .css file has been left in for convenience.

## Author

Borislav Branimirov
