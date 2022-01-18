#!/bin/bash
curl -X -v Post\
    -d 'name=Daniel'\
    -d 'email=d.barihuta@gamil.com'\
    -d 'tel=0431006280'\
    -d 'message=Dev testing | reCaptcha by making curl request.'\
    localhost/index.php > .curlDump