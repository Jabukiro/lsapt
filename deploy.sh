#!/bin/bash
## Simply copies the website files to root directory using rsync

ROOT="/var/www/html/D2G"
#Files that are not to be deployed
EXCLUDE="NotToBeDeployed.txt"
SERVER="jabukiro@172.105.188.27:/var/www/html/public_html"

if ! [[ -f "$EXCLUDE" ]]; then
    echo "Warning, this script might be included in deployment if it is in the same directory."
fi

if [[ $1 == "server" ]]; then
    rsync -va -e "ssh" --exclude-from="$EXCLUDE" . "$SERVER"
else
    if ! [[ -d "$ROOT" ]]; then
        mkdir "$ROOT"
    fi
    rsync -v -a --exclude-from="$EXCLUDE" . "$ROOT"
fi
