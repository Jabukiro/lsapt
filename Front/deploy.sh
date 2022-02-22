#!/bin/bash
## Simply copies the website files to root directory using rsync

ROOT="/var/www/LAPT/public_html"
#Files that are not to be deployed
EXCLUDE="NotToBeDeployed.txt"
SERVER="jabukiro@172.105.188.27:/var/www/live/public_html/"
ERRORSTRING="Error. Please make sure you've indicated correct parameters"
if [ $# -eq 0 ]
    then
        echo $ERRORSTRING;
elif [ $1 == "live" ]
    then
        if [[ -z $2 ]]
            then
                echo "Running dry-run"
                rsync --dry-run -az --no-perms --force --delete --progress --exclude-from="$EXCLUDE"  ./ "$SERVER"
        elif [ $2 == "go" ]
            then
                echo "Running actual deploy"
                rsync -az --no-perms --force --delete --progress --exclude-from="$EXCLUDE"  ./ "$SERVER"
        else
            echo $ERRORSTRING;
        fi
elif [ $1 == "dev" ]
    then
                    echo "Running dev deploy to localhost"
                rsync -az --no-perms --force --delete --progress --exclude-from="$EXCLUDE"  ./ "$ROOT"
elif [ $1 == "fetch" ]
    then
                    echo "Fetching website from server"
                rsync -az --no-perms --force --delete --progress --exclude-from="$EXCLUDE" "$SERVER" ./
fi