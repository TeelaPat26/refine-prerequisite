This is a basis for a refine project.

## Publishing Guide

Follow these steps to publish your package:

1. **Build the Package**
   ```bash
   npm run build
   ```
   This command will create the built files necessary for distribution.

2. **Update Version**
   - Open `package.json`
   - Update the version number following semantic versioning (e.g., 1.0.0 to 1.0.1)
   - Save the file

3. **Login to npm**
   ```bash
   npm login
   ```
   You'll be prompted to enter:
   - Username
   - Password
   - Email
   - Two-factor authentication code (if enabled)

4. **Publish Package**
   ```bash
   npm publish
   ```
   This will publish your package to the npm registry.

**Note:** Make sure you have the necessary permissions to publish to the package's namespace.