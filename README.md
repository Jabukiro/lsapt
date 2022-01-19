# Linespeed APT
This repo contains the website files for Linespeed, a Perth-based speed-training camp.

website: linespeedapt.com

## Structure
### PHP
The website makes use of PHP for reCaptcha and contact logic.

### Cart (Svelte)
A cart is present on each webpage and is written in svelte. All cart-related logic is present in the ```/Front/svelte``` folder.
The cart

### GraphQl (NodeJS)
The website makes use of a Graphql server for its data needs. Code is hosted in ```/DataServer``` folder

## Dev


To use the reCaptcha Enterprise Client, google needs to know the connection credentials
when creating an assessment. The current set-up is to use a file containing a private key.
The path to the file needs to be exposed by an environment variable.


In Ubuntu 18.04, this can be achieved by editing the ```/etc/apache2/envvars``` file to contain:
```bash
export GOOGLE_APPLICATION_CREDENTIALS=FILE_PATH
```