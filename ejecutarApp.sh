#!/bin/bash

sudo forever start --append -l /opt/forever/logtail-appSCM -e /opt/forever/logtail-appSCM.e -o /opt/forever/logtail-appSCM.o api-scm/bin/www

sleep 3

gulp browser-sync &

