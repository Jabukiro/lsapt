#!/bin/bash
## Simply copies the website files to root directory using rsync

ROOT="/var/www/html/lsapt"
#Files that are not to be deployed
EXCLUDE="NotToBeDeployed.txt"
SERVER="jabukiro@172.105.188.27:/var/www/html/public_html"
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
fi