SELECT
  t2.name AS topic,
  s3.message AS message,
  u.name as user,
  s3.created_at AS date
FROM topic AS t2
INNER JOIN (
  SELECT
    t2.id AS topic_id
  FROM topic AS t2
  INNER JOIN (
    SELECT
      t1.id,
      tm1.user_id
    FROM topic AS t1
    INNER JOIN topic_message AS tm1
      ON t1.id = tm1.topic_id
    GROUP BY t1.id, tm1.user_id
  ) AS s1 ON s1.id = t2.id
  GROUP BY t2.id
  HAVING COUNT(t2.id) > 2
) AS s2 ON s2.topic_id = t2.id
INNER JOIN (
  SELECT
    tm2.*
  FROM topic_message tm2
  LEFT OUTER JOIN topic_message tm3
    ON tm2.topic_id = tm3.topic_id AND (
      (tm2.created_at < tm3.created_at) OR (
        tm2.created_at = tm3.created_at AND
        tm2.id < tm3.id
      )
    )
  WHERE tm3.topic_id IS NULL
) AS s3 ON s3.topic_id = t2.id
INNER JOIN user AS u
  ON u.id = s3.user_id
ORDER BY s3.created_at DESC
LIMIT 10
