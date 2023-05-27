# Pornpen.ai better tags

This is a community mod for providing better user experience on pornpen.ai. it's very much work in progress, use at your own risk!

![sample image](./image.png)

## Installation instructions

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extensions for your browser of choice. On Desktop, Chrome or Firefox; on Android, Firefox or Kiwi Browser.
2. Open the extension, and add a new user script.
3. Delete the placeholder script, and copy the contents from [build/out.js](./build/out.js) from this repository in instead.
4. Press save.
5. Reload pornpen, enjoy!

## Contributing

Join the effort! Hop over to the [pornpen.ai discord channel](https://discord.com/invite/cWX7rhzcVz) and message @b0rknut if you've any questions.

To set up the local development environment, install nodejs and run `npm i` in the project root folder. Run `npm run watch`, and start coding :) You'll have to copy over the out.js file into the tampermonkey editor everytime you make changes, I'm not aware of a way to make the developer experience smoother. If you know a better way, be sure to let me know!
