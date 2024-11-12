-- SQLite
DELETE FROM timers;
VACUUM;

-- SQLite
SELECT *
FROM timers where date LIKE '1726%';

DROP TABLE timers;