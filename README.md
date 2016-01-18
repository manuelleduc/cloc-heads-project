# HEADS Cloc
## Tools
### get_projects
Located in *./get_projects*

Simple tool used to list the repositories located in a github group.

For example :
```bash
$ node get_projects/index.js kevoree
kevoree/boot2kevoree
kevoree/boot2kevoree-cli
kevoree/CloudMOOBenchmark
kevoree/comparch2014
kevoree/docker-image-java
kevoree/docker-image-javase_compact2
kevoree/docker-image-js
kevoree/docker-image-kevoree-browser-runtime
kevoree/docker-image-registry-replica
# [..]
```

**WARNING ** : This tool currently return only the first 300 projects of a group only.

## Filling the database
**count.sh** does the following operations :
 * starting a mysql container
 * reset the content of the container
 * install [cloc](http://cloc.sourceforge.net/)
 * starts cloc in every projects added as subprojects on *./projects/\_groupname\_/\_projects\_name_*

## How to add a projects
Just add a subproject in the *./projects* directory, accordingly to the norm *./projects/\_groupname\_/\_projects\_name_*

# Analysis
Avec [Raw](http://raw.densitydesign.org/) il est possible d'obtenir rapidement des résultats parlants, par example :
![Distribution par langages](example.svg)