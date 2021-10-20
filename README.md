# lsapt
LineSpeedAPT website

## Dev


To use the reCaptcha Enterprise Client, google needs to know the connection credentials
when creating an assessment. The current set-up is to use a file containing a private key.
The path to the file needs to be exposed by an environment variable.


In Ubuntu 18.04, this can be achieved by editing the ```/etc/apache2/envvars``` file to contain:
```bash
export GOOGLE_APPLICATION_CREDENTIALS=FILE_PATH
```