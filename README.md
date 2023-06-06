# Assistant

A chromium extension example for self-hosting.

On the way to self-hosting, we just need a simple personal web server eg nginx:

```
nginx
  ├── index.html        # installing guide
  ├── manifest.xml      # current extension version and download url
  └── download.crx      # current extension package
```

The server always deploy the latest extension package, and the extension will check the latest version and download it automatically.

References:

- [Self-hosting Chromium extensions](https://www.meziantou.net/self-hosting-chromium-extensions.htm)
- [Alternative extension installation methods](https://developer.chrome.com/docs/extensions/mv3/external_extensions/)
- [Update manifest](https://developer.chrome.com/docs/extensions/mv3/linux_hosting/#update_url)

## Installing Test on Platforms

- ✅ Windows 10, 11
  - ✅ Chrome 113
  - ✅ Edge 113
- ❓ MacOS
  - ❓ Chrome
  - ❓ Edge
- ❓ Linux

## Development

Environment Variables `.env`:

- `VITE_APP_ID`: Extension ID, eg: `edjeggfemkdejnpgmglbdjcgeecimpce`
- `VITE_APP_HOST_BASE_URL`: Extension host page URL, eg: `https://assistant-self-hosting-example.cnine.d2.pub/`

GitHub Actions Secrets:

- `PACK_KEY`: Extension private key
- `KUBE_CONFIG`: Kubeconfig file content base64 encoded
- `DOCKER_USERNAME`: Docker username
- `DOCKER_TOKEN`: Docker username

### Commands

```sh
yarn dev # local development

yarn build # build for extension
```

### Release Extension Package

Update `package.json` version, then run:

```sh
next_version=$(node -p "require('./package.json').version")
git add .
git commit -m "chore(release): $next_version" --allow-empty
git tag $next_version
git push origin --all && git push origin --tags
```
