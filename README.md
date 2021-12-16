# Redis vs. MongoDB

## Benchmark Read/Write by ID

```bash
npm run bench
```

### Result

```
-------------------------------------------------------------------------------
Connected to MongoDB Server
Writing 10000 articles of size ~22615 bytes
-> MongoDB/Write took 6077 milliseconds.
Reading 10000 articles
-> MongoDB/Read took 5832 milliseconds.
-------------------------------------------------------------------------------
Connected to Redis Server
Writing 10000 articles of size ~22615 bytes
-> Redis:stringify/Write took 2598 milliseconds.
Reading 10000 articles
-> Redis:stringify/Read took 2479 milliseconds.
-------------------------------------------------------------------------------
Connected to Redis Server
Writing 10000 articles of size ~22615 bytes
-> Redis:msgpackr/Write took 1617 milliseconds.
Reading 10000 articles
-> Redis:msgpackr/Read took 2387 milliseconds.
-------------------------------------------------------------------------------
- connected
Writing 10000 articles of size ~22615 bytes
-> InMemory/Write took 5 milliseconds.
Reading 10000 articles
-> InMemory/Read took 3 milliseconds.
- close
```

## Memory consumption

```bash
npm run mem
```

### Result

```
One article: 30 kB
Estimate for 10000 articles: 291 MB
Memory usage after loading 10000 articles into memory:
rss                 +218.45 MB
heapTotal           +8.05 MB
heapUsed            +0.48 MB
external            +208.15 MB
arrayBuffers        +208.28 MB
```

## Benchmark express load test

```
npm run load
```

- concurrent connections: 10
- pipelined requests: 10
- duration: 60 sec

### Result

```
Running 60s test @ http://localhost:4005/mongo
10 connections with 10 pipelining factor

┌─────────┬───────┬───────┬────────┬────────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼────────┼────────┼──────────┼──────────┼────────┤
│ Latency │ 52 ms │ 80 ms │ 127 ms │ 139 ms │ 83.53 ms │ 18.54 ms │ 254 ms │
└─────────┴───────┴───────┴────────┴────────┴──────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 618     │ 885     │ 1209    │ 1247    │ 1189.37 │ 95.37   │ 618     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 19.9 MB │ 28.5 MB │ 38.9 MB │ 40.1 MB │ 38.3 MB │ 3.07 MB │ 19.9 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

71k requests in 60.02s, 2.3 GB read
Running 60s test @ http://localhost:4005/redis-2
10 connections with 10 pipelining factor

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼────────┤
│ Latency │ 39 ms │ 49 ms │ 62 ms │ 71 ms │ 49.46 ms │ 5.94 ms │ 136 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴────────┘
┌───────────┬─────────┬───────┬─────────┬─────────┬─────────┬───────┬─────────┐
│ Stat      │ 1%      │ 2.5%  │ 50%     │ 97.5%   │ Avg     │ Stdev │ Min     │
├───────────┼─────────┼───────┼─────────┼─────────┼─────────┼───────┼─────────┤
│ Req/Sec   │ 1702    │ 1710  │ 1801    │ 2010    │ 1867.04 │ 93.33 │ 1702    │
├───────────┼─────────┼───────┼─────────┼─────────┼─────────┼───────┼─────────┤
│ Bytes/Sec │ 54.7 MB │ 55 MB │ 57.9 MB │ 64.6 MB │ 60 MB   │ 3 MB  │ 54.7 MB │
└───────────┴─────────┴───────┴─────────┴─────────┴─────────┴───────┴─────────┘

Req/Bytes counts sampled once per second.

112k requests in 60.02s, 3.6 GB read
40 errors (40 timeouts)
```

### Install Redis and MongoDB

```
brew install redis
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start redis
brew services start mongodb-community@5.0
```
