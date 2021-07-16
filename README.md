# lsapt
LineSpeedAPT website

## Dev


To use reCaptcha enterprise client, google needs to know the credentials.


Currently need to expose an environment variable containing the path to the file containing the credentials.
Ubuntu 18: add `export GOOGLE_APPLICATION_CREDENTIALS=FILE_PATH` line to `/etc/apache2/envvars`