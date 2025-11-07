<img src="https://swetrix.com/assets/logo_blue.png" alt="" height="80" />

# Swetrix CDN

## Development

```bash
# install dependencies with package manager of your choice
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Environment Variables

Below you will find the Environment Variables that are required to run the CDN. The values next to them are their default values. You can change them to your own values or just not set them if they suit you anyway. (e.g. Ports, Username, etc.)

#### Security

`ACCESS_TOKEN`=The password which provides an abilito to upload files to the CDN.

#### Misc

`API_ORIGINS`=A list of allowed origins. Leave empty for all origins.\
`MAX_FILE_SIZE`=The maximum upload file size in bytes. Default value is 10MB.\
`UPLOAD_PATH`=File upload path. If not specified, the `cdn_files` folder will be created in the project's root directory.

## Donate

You can support the project by donating us at https://ko-fi.com/andriir \
We can only run our services by once again asking for your financial support!
