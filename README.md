# Assistant --- Self Hosting Example

Environment Variables `.env`:

- `VITE_APP_ID`: Extension ID, eg: `edjeggfemkdejnpgmglbdjcgeecimpce`
- `VITE_APP_HOST_BASE_URL`: Extension host page URL, eg: `https://assistant-self-hosting-example.cnine.d2.pub/`

GitHub Actions Secrets:

- `PACK_KEY`: Extension private key
- `KUBE_CONFIG`: Kubeconfig file content base64 encoded
- `DOCKER_USERNAME`: Docker username
- `DOCKER_TOKEN`: Docker username

```sh
yarn dev # local development

yarn build # build for extension
```

## Trigger Auto Release

Update `package.json` version, then run:

```sh
next_version=$(node -p "require('./package.json').version")
git add .
git commit -m "chore(release): $next_version" --allow-empty
git tag $next_version
git push origin --all && git push origin --tags
```

## References

- [Self-hosting Chromium extensions](https://www.meziantou.net/self-hosting-chromium-extensions.htm)
