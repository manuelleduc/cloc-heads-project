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
With [Raw](http://raw.densitydesign.org/) we can quickly generate nice dataviz :
![Languages distribution](example.png)

```sql
-- Excludes minified files, standards and files too big to be relevant.
-- One we have gathered enough data we can limit ourselves to a subset of languages.
SELECT *
FROM t
WHERE t.File NOT LIKE "%.min.js"
AND t.File_basename <> 'nodes.d.ts'
AND t.File_basename <> 'font-awesome.css'
AND nCode < 10000
ORDER BY t.nCode DESC;
```
