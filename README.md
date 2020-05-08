# FBVideo-Downloader
FBVideo-Downloader is a simple script built with JavaScript.
This script can search video sources from the current video window.
No add-ons, extensions or web-sites are necessary.

### How to install
* Clone or download this repo.
* Install all dev packages.
* run the build commands.

```bash
$ git clone https://github.com/JefterRocha/fbvideo-downloader.git
$ npm i
$ npm run build
```

### How to use it
**directly on the console**

Open some facebook video link and paste the generated code in `bundle.min.js` in the window/tab console.

**using bookmark/favorites(recommended)**

Add a new bookmark/favorites to your browser and change the URL using the follow syntax:
```
javascript:generated_code_here
```
![example](https://i.imgur.com/KzaiEdV.png "example of bookmark script")

You can save the bookmark with name whatever you want and now you can execute the script every time by click on this bookmark.

## License
[The MIT License](./LICENSE)