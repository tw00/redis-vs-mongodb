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

- concurrent connections: 15
- pipelined requests: 10
- duration: 30 sec

### Result

```
Running 30s test @ http://localhost:4005/mongo
15 connections with 10 pipelining factor

┌─────────┬───────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼───────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 60 ms │ 131 ms │ 209 ms │ 224 ms │ 128.69 ms │ 37.53 ms │ 364 ms │
└─────────┴───────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 630     │ 630     │ 1197    │ 1250    │ 1158.91 │ 128.06  │ 630     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 20.3 MB │ 20.3 MB │ 38.5 MB │ 40.2 MB │ 37.3 MB │ 4.12 MB │ 20.3 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

35k requests in 30.02s, 1.12 GB read
Running 30s test @ http://localhost:4005/redis-2
15 connections with 10 pipelining factor

┌─────────┬───────┬───────┬────────┬────────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼────────┼────────┼──────────┼──────────┼────────┤
│ Latency │ 38 ms │ 58 ms │ 153 ms │ 163 ms │ 72.08 ms │ 33.04 ms │ 210 ms │
└─────────┴───────┴───────┴────────┴────────┴──────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 1765    │ 1765    │ 2075    │ 2189    │ 2064.31 │ 75.31   │ 1765    │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 56.8 MB │ 56.8 MB │ 66.7 MB │ 70.4 MB │ 66.3 MB │ 2.42 MB │ 56.7 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

62k requests in 30.03s, 1.99 GB read
```

### Install Redis and MongoDB

```
brew install redis
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start redis
brew services start mongodb-community@5.0
```
