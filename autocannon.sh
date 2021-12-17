#!/bin/bash

# -c/--connections NUM
# The number of concurrent connections to use. default: 10.

# -p/--pipelining NUM
# The number of pipelined requests to use. default: 1.

# -d/--duration SEC
# The number of seconds to run the autocannon. default: 10.

npx autocannon -c15 -p10 -d15 http://localhost:4005/mongo
sleep 15
npx autocannon -c15 -p10 -d15 http://localhost:4005/redis-2
sleep 15
npx autocannon -c15 -p10 -d15 http://localhost:4005/rocksdb