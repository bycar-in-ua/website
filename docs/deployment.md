# Deployment

## AWS Amplify (Production)

The production deployment is handled by AWS Amplify. The build configuration is defined in `amplify.yml`:

1. Enables corepack for pnpm
2. Installs dependencies with `pnpm install`
3. Builds the application with `pnpm run build`
4. Deploys artifacts from `.amplify-hosting` directory

## Docker (Staging)

For staging environment, Docker is used.

### Build and Run

```bash
docker-compose up --build
```

### Configuration

The Docker setup requires:
- `GITHUB_TOKEN` - for accessing private npm packages
- `API_URL` - API endpoint URL
- `CDN_URL` - CDN endpoint URL

### Notes

- The `.output` directory is mounted as a volume
- Default port is 4000
- Connects to the `proxy` network
