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

### Result

```
Running 10s test @ http://localhost:4005/mongo
2 connections with 10 pipelining factor

┌─────────┬──────┬───────┬───────┬───────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5% │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max    │
├─────────┼──────┼───────┼───────┼───────┼──────────┼─────────┼────────┤
│ Latency │ 7 ms │ 19 ms │ 40 ms │ 50 ms │ 21.04 ms │ 10.2 ms │ 160 ms │
└─────────┴──────┴───────┴───────┴───────┴──────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 627     │ 627     │ 928     │ 1082    │ 927.2   │ 126.23  │ 627     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 20.2 MB │ 20.2 MB │ 29.9 MB │ 34.8 MB │ 29.8 MB │ 4.06 MB │ 20.2 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

9k requests in 10.01s, 298 MB read
Running 10s test @ http://localhost:4005/redis-2
2 connections with 10 pipelining factor

┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼───────┤
│ Latency │ 3 ms │ 6 ms │ 25 ms │ 29 ms │ 9.01 ms │ 6.85 ms │ 47 ms │
└─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg    │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┤
│ Req/Sec   │ 1206    │ 1206    │ 1569    │ 1605    │ 1523.4 │ 114.19  │ 1206    │
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┤
│ Bytes/Sec │ 38.8 MB │ 38.8 MB │ 50.5 MB │ 51.6 MB │ 49 MB  │ 3.67 MB │ 38.8 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

15k requests in 10.01s, 490 MB read
```

### Install Redis and MongoDB

```
brew install redis
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start redis
brew services start mongodb-community@5.0
```
