#!/bin/bash

# -c/--connections NUM
# The number of concurrent connections to use. default: 10.

# -p/--pipelining NUM
# The number of pipelined requests to use. default: 1.

# -d/--duration SEC
# The number of seconds to run the autocannon. default: 10.

npx autocannon -c10 -p10 -d60 http://localhost:4005/mongo
npx autocannon -c10 -p10 -d60 http://localhost:4005/redis-2
