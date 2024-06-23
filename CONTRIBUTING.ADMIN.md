# Contribution Guideleine For Admin
## Versioning

### Check version:
```console
npm version
```
### List local versions:
```console
git tag
```
### Explicitly set version:
```console
npm version <major.minor.revision>
```
### Pre-release:
#### Increments pre-release version/ Add a pre-release identifier
```console
npm version prerelease                 
```
```bash
# v1.0.0            ->  v1.0.1-0
# v1.0.1-0          ->  v1.0.1-1
```
```console
npm version prerelease --preid=alpha             
```
```bash
# v1.0.0            ->  v1.0.1-alpha.0
# v1.0.1-alpha.0    ->  v1.0.1-alpha.1
```
#### Increments the patch version and set a pre-release identifier
```console
npm version prepatch 
```
```bash
# v1.0.0            ->  v1.0.1-0
# v1.0.1-0          ->  v1.0.2-0
```
```console
npm version prepatch --preid=alpha
```
```bash
# v1.0.0            ->  v1.0.1-alpha.0
# v1.0.1-alpha.0    ->  v1.0.2-alpha.0
# v1.0.1-alpha.0    ->  v1.0.1-alpha.1
```
#### Increment the minor version and set a pre-release identifier
```console
npm version preminor
```
```bash
# v1.0.0            ->  v1.1.0-0
# v1.1.0-0          ->  v1.2.0-0
```
```console
npm version preminor --preid=beta    
npm version preminor --preid=beta.1  # 1.0.0 -> 1.1.0-beta.1.0, 1.1.0-beta.1.0 -> 1.2.0-beta.1.0
```
```bash
# v1.0.0            ->  v1.1.0-beta.0
# v1.1.0-beta.0     ->  v1.2.0-beta.0

# v1.0.0            ->  v1.1.0-beta.1.0 
# v1.1.0-beta.1.0   ->  v1.2.0-beta.1.0
```
#### Increments the major version and sets a pre-release identifier
```console
npm version premajor      
```
```bash
# v1.0.0            ->  2.0.0-0
# v1.1.0-0          ->  2.0.0-0
```
```console 
npm version premajor --preid=rc     
```
```bash
# v1.0.0            ->  v2.0.0-rc.0
# v1.1.0-0          ->  v2.0.0-rc.0    
```
### Release:
#### Increments patch version  
```console
npm version patch
```
```bash
# v1.0.0            ->  v1.0.1
# v1.0.1            ->  v1.0.2 
```
#### Increments minor version
```console
npm version minor
```
```bash
# v1.0.0            ->  v1.1.0
# v1.1.0            ->  v1.2.0 
```
#### Increments major version
```console
npm version major
```
```bash
# v1.0.0            ->  v2.0.0
# v2.0.0            ->  v3.0.0
```
### Sync with git version: 
Uses the latest git tag as the version number and updates the package.json accordingly. Useful for synchronizing package version with git repository.
```console
npm version from-git 
``` 
### Remove tags:
#### Remove all tags locally
```console
git tag -l | xargs -n 1 git tag -d
```
#### Remove all tags remotely
```console
git tag -l | xargs -n 1 git push --delete origin
```
#### Verify deletion:
Verify that no tags are left locally and remotely.
```console
git fetch --prune --tags
git tag
```

## Publish 
```bash
npm login
npm publish --tag alpha   # Publishes an alpha version
npm publish --tag beta    # Publishes a beta version
npm publish --access=public   
```