## Publishing Guide

Follow these steps to publish your package:

1. **Build the Package**
   ```bash
   npm run build
   ```

2. **Update Version**
   - Open `package.json`
   - Update the version number following semantic versioning (e.g., 1.0.0 to 1.0.1)
   - Save the file

3. **Login to npm**
   ```bash
   npm login
   ```

4. **Publish Package**
   ```bash
   npm publish
   ```