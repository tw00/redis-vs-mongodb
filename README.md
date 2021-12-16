# Redis vs. MongoDB

```bash
npm run start
```

## Result

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
