# DL_AssetServer

A simple NodeJS file server with a semblance of sapience.
Derived from the [original fileserver](https://github.com/CerisWhite/Fileserver)

With this one, you can define "assetpaths" in `config.json` to tell it where to search for files.
For example, if you set it to `"assetpaths": [ /home/ceris/Documents/DLAssets ]`, and make the request `https://example.io/dl/assetbundles/iOS/OP/OP30XXY`, it will search for the file `/home/ceris/Documents/DLAssets/OP/OP30XXY`.