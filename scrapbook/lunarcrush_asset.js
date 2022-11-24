const o = {
  "config": { //API request as recognized and processed by LunarCRUSH
      "data": "assets", //API endpoint request
      "symbol": "'LTC'", //A comma-separted list of symbols to get data for
      "interval": "hour", //Time series time buckets in hour or day intervals
      "data_points": 24 //Number of data points in the time series array
  },
  "usage": {
      "day": 1,
      "month": 1
  },
  "data": [{ //API endpoint request
      "id": 4, //LunarCRUSH internal ID for the asset
      "name": "Litecoin", //The full name of the asset
      "symbol": "LTC", //The symbol for the asset
      "price": 178.114411, //Current price in USD
      "price_btc": 0.003308319771964212, //Current price in BTC
      "market_cap": 11886472250, //Total available supply multiplied by the current price in USD
      "percent_change_24h": 0.77, //Percent change in price since 24 hours ago
      "percent_change_7d": -11.9, //Percent change in price since 7 days ago
      "percent_change_30d": -1.68, //Percent change in price since 30 days ago
      "volume_24h": 4398222429.01, //Volume in USD for 24 hours up to this data point
      "max_supply": "84000000",
      "social_contributors_calc_24h_previous": 4138,
      "url_shares_calc_24h_previous": 1395, //Number of url shares from 48 hours ago to 24 hours ago
      "tweet_spam_calc_24h_previous": 1590, //Number of tweets classified as spam from 48 hours ago to 24 hours ago
      "news_calc_24h_previous": 22, //Number of news articles collected from 48 hours ago to 24 hours ago
      "average_sentiment_calc_24h_previous": 3.8, //Average social sentiment 48 hours ago to 24 hours ago
      "social_score_calc_24h_previous": 12421162, //Sum of followers, retweets, likes, reddit karma etc of social posts collected from 48 hours ago to 24 hours ago
      "social_volume_calc_24h_previous": 3552, //Number of social posts collected from 48 hours ago to 24 hours ago
      "alt_rank_30d_calc_24h_previous": 147, //AltRank™ based on 24 hour changes from 48 hours ago to 24 hours ago
      "alt_rank_calc_24h_previous": 49,
      "social_contributors_calc_24h": 2961,
      "social_contributors_calc_24h_percent": 71.55630739487675,
      "url_shares_calc_24h": 1588, //Number of url shares on social in the last 24 hours
      "url_shares_calc_24h_percent": 113.83512544802868, //Percent change in url shares in the last 24 hours vs previous 24 hour period
      "tweet_spam_calc_24h": 1832, //Number of tweets classified as spam in the last 24 hours
      "tweet_spam_calc_24h_percent": 115.22012578616352, //Precent change in twitter spam in the last 24 hours vs previous 24 hour period
      "news_calc_24h": 19, //Number of news articles collected in the last 24 hours
      "news_calc_24h_percent": 86.36363636363636, //Precent change in number of news articles in the last 24 hours vs previous 24 hour period
      "average_sentiment_calc_24h": 3.8, //Average sentiment over the last 24 hours
      "average_sentiment_calc_24h_percent": 100, //Precent change in average sentiment 24 hours vs previous 24 hour period
      "social_score_calc_24h": 5442709, //Sum of social engagement over the last 24 hours
      "social_score_calc_24h_percent": 43.818034093750654, //Precent change in social engagement over the last 24 hours vs previous 24 hour period
      "social_volume_calc_24h": 2978, //Number of social posts over the last 24 hours
      "social_volume_calc_24h_percent": 83.84009009009009, //Precent change in nunber if social posts over the last 24 hours vs previous 24 hour period
      "asset_id": 4, //The LunarCRUSH id for an asset/coin
      "time": 1616745600, //A unix timestamp (in seconds)
      "open": 177.482237, //Open price for the time period
      "high": 178.347045, //Higest price fo rthe time period
      "low": 176.226972, //Lowest price for the time period
      "volume": 69990176, //Volume for the time period in USD
      "url_shares": 48, //Number of urls shared and collected on social
      "unique_url_shares": 10, //Number of unique url shares posted and collected on social
      "reddit_posts": 1, //Number of reddit posts collected
      "reddit_posts_score": 1, //Sum of reddit karma on social posts
      "reddit_comments": 1, //Number of reddit comments collected
      "reddit_comments_score": 1, //Sum of reddit karma on collected comments
      "tweets": 89, //Number of tweets collected
      "tweet_spam": 123, //Number of tweets classified as spam
      "tweet_followers": 80969, //Sum of follower count for every tweet collected
      "tweet_retweets": 6, //Sum of the number of times all collected tweets were retweeted
      "tweet_replies": 1, //Sum of the number of times all collected tweet reply counts
      "tweet_favorites": 23, //Sum of the number of times all collected tweet likes
      "tweet_sentiment1": 1, //Sum of tweets classified as sentiment 1 (Very Bearish)
      "tweet_sentiment2": 6, //Sum of tweets classified as sentiment 2 (Bearish)
      "tweet_sentiment3": 2, //Sum of tweets classified as sentiment 3 (Neutral)
      "tweet_sentiment4": 77, //Sum of tweets classified as sentiment 4 (Bullish)
      "tweet_sentiment5": 3, //Sum of tweets classified as sentiment 5 (Very Bullish)
      "tweet_sentiment_impact1": 130, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
      "tweet_sentiment_impact2": 1234, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
      "tweet_sentiment_impact3": 94, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
      "tweet_sentiment_impact4": 78803, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
      "tweet_sentiment_impact5": 738, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
      "social_score": 81047, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
      "average_sentiment": 3.8, //Average sentiment of collected social posts
      "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
      "sentiment_relative": 92, //Percent tweets that are bullish (excluding neutral in the count)
      "news": 1, //Number of news articles published
      "price_score": 3.2, //A proprietary score based mostly on the change in MACD over time
      "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
      "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
      "galaxy_score": 65.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
      "volatility": 0.04171771, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
      "alt_rank": 99, //A proprietary score based on how an asset is performing relative to all other assets supported
      "alt_rank_30d": 148, //AltRank™ but using 30 day metrics instead of 24 hour metrics
      "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
      "percent_change_24h_rank": 987, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
      "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
      "social_volume_24h_rank": 21, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
      "social_score_24h_rank": 18, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
      "social_contributors": 27, //The number of unique accounts posting on social
      "social_volume": 99, //Number of social posts
      "social_volume_global": 29224,
      "social_dominance": 0.3387626608267178,
      "market_cap_global": 1712415637920,
      "market_dominance": 0.6931576778531221,
      "close": 178.114411, //Close price for the time period
      "timeSeries": [{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616659200, //A unix timestamp (in seconds)
          "open": 175.299804, //Open price for the time period
          "close": 176.733554, //Close price for the time period
          "high": 177.605207, //Higest price fo rthe time period
          "low": 175.02874, //Lowest price for the time period
          "volume": 203995692, //Volume for the time period in USD
          "market_cap": 11741130895, //Total available supply multiplied by the current price in USD
          "url_shares": 45, //Number of urls shared and collected on social
          "unique_url_shares": 37, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 118, //Sum of reddit karma on social posts
          "reddit_comments": 9, //Number of reddit comments collected
          "reddit_comments_score": 43, //Sum of reddit karma on collected comments
          "tweets": 210, //Number of tweets collected
          "tweet_spam": 84, //Number of tweets classified as spam
          "tweet_followers": 6224632, //Sum of follower count for every tweet collected
          "tweet_quotes": 1, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 107, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 39, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 126, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 22, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 9, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 172, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 7, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 121207, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 26816, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 6040211, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 36671, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 6225111, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 89, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 3, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.5, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 66, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.03816809, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 95, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 139, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1314, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 7, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 23, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 13, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 276, //The number of unique accounts posting on social
          "social_volume": 260, //Number of social posts
          "price_btc": 0.0033278453498723362, //Current price in BTC
          "social_volume_global": 31488,
          "social_dominance": 0.8257113821138211,
          "market_cap_global": 1689872674790,
          "market_dominance": 0.6947938190940371,
          "percent_change_24h": -10.01191807661581 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616662800, //A unix timestamp (in seconds)
          "open": 176.771543, //Open price for the time period
          "close": 177.810687, //Close price for the time period
          "high": 178.109566, //Higest price fo rthe time period
          "low": 176.002525, //Lowest price for the time period
          "volume": 159427676, //Volume for the time period in USD
          "market_cap": 11826290631, //Total available supply multiplied by the current price in USD
          "url_shares": 29, //Number of urls shared and collected on social
          "unique_url_shares": 23, //Number of unique url shares posted and collected on social
          "reddit_posts": 5, //Number of reddit posts collected
          "reddit_posts_score": 6, //Sum of reddit karma on social posts
          "reddit_comments": 4, //Number of reddit comments collected
          "reddit_comments_score": 22, //Sum of reddit karma on collected comments
          "tweets": 152, //Number of tweets collected
          "tweet_spam": 58, //Number of tweets classified as spam
          "tweet_followers": 400535, //Sum of follower count for every tweet collected
          "tweet_quotes": 1, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 6, //Sum of the number of times all collected tweets were retweeted
          "tweet_favorites": 12, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 15, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 5, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 124, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 8, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 23119, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 1532, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 375183, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 720, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 400611, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 90, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 2.9, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.6, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 66.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.03904469, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 85, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 142, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1278, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 24, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 8, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 204, //The number of unique accounts posting on social
          "social_volume": 185, //Number of social posts
          "price_btc": 0.003332586062631515, //Current price in BTC
          "social_volume_global": 30975,
          "social_dominance": 0.5972558514931396,
          "market_cap_global": 1699044337665,
          "market_dominance": 0.6960554453365764,
          "percent_change_24h": -9.413684285539347 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616666400, //A unix timestamp (in seconds)
          "open": 177.568345, //Open price for the time period
          "close": 178.177402, //Close price for the time period
          "high": 178.456104, //Higest price fo rthe time period
          "low": 176.494001, //Lowest price for the time period
          "volume": 141558669, //Volume for the time period in USD
          "market_cap": 11862591689, //Total available supply multiplied by the current price in USD
          "url_shares": 88, //Number of urls shared and collected on social
          "unique_url_shares": 83, //Number of unique url shares posted and collected on social
          "reddit_posts": 5, //Number of reddit posts collected
          "reddit_posts_score": 129, //Sum of reddit karma on social posts
          "reddit_comments": 14, //Number of reddit comments collected
          "reddit_comments_score": 32, //Sum of reddit karma on collected comments
          "tweets": 130, //Number of tweets collected
          "tweet_spam": 55, //Number of tweets classified as spam
          "tweet_followers": 301693, //Sum of follower count for every tweet collected
          "tweet_quotes": 5, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 12, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 8, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 25, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 12, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 11, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 106, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 1, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 1888, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 1565, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 297981, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 309, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 301992, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.7, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 90, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 2.9, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.6, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 65.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.03976793, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 78, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 142, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1268, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 23, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 8, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 186, //The number of unique accounts posting on social
          "social_volume": 233, //Number of social posts
          "price_btc": 0.0033449770930313945, //Current price in BTC
          "social_volume_global": 32485,
          "social_dominance": 0.7172541172849007,
          "market_cap_global": 1699219679464,
          "market_dominance": 0.6981199566110206,
          "percent_change_24h": -9.112510614768366 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616670000, //A unix timestamp (in seconds)
          "open": 177.91754, //Open price for the time period
          "close": 175.757193, //Close price for the time period
          "high": 178.21597, //Higest price fo rthe time period
          "low": 175.606687, //Lowest price for the time period
          "volume": 151093773, //Volume for the time period in USD
          "market_cap": 11718315108, //Total available supply multiplied by the current price in USD
          "url_shares": 24, //Number of urls shared and collected on social
          "unique_url_shares": 20, //Number of unique url shares posted and collected on social
          "reddit_posts": 2, //Number of reddit posts collected
          "reddit_posts_score": 110, //Sum of reddit karma on social posts
          "reddit_comments": 16, //Number of reddit comments collected
          "reddit_comments_score": 32, //Sum of reddit karma on collected comments
          "tweets": 125, //Number of tweets collected
          "tweet_spam": 70, //Number of tweets classified as spam
          "tweet_followers": 929600, //Sum of follower count for every tweet collected
          "tweet_quotes": 1, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 21, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 7, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 105, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 1, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 11, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 2, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 103, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 8, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 372, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 36150, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 48, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 174478, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 718686, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 929900, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 90, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.1, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.6, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 67, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.0408635, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 70, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 143, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1251, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 24, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 9, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 158, //The number of unique accounts posting on social
          "social_volume": 163, //Number of social posts
          "price_btc": 0.0033435804818113036, //Current price in BTC
          "social_volume_global": 34679,
          "social_dominance": 0.4700250872285821,
          "market_cap_global": 1675692038635,
          "market_dominance": 0.6993119760565079,
          "percent_change_24h": -10.24486094469641 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616673600, //A unix timestamp (in seconds)
          "open": 174.628246, //Open price for the time period
          "close": 171.566424, //Close price for the time period
          "high": 175.664154, //Higest price fo rthe time period
          "low": 169.215177, //Lowest price for the time period
          "volume": 404834295, //Volume for the time period in USD
          "market_cap": 11453788078, //Total available supply multiplied by the current price in USD
          "url_shares": 69, //Number of urls shared and collected on social
          "unique_url_shares": 68, //Number of unique url shares posted and collected on social
          "reddit_posts": 1, //Number of reddit posts collected
          "reddit_posts_score": 38, //Sum of reddit karma on social posts
          "reddit_comments": 21, //Number of reddit comments collected
          "reddit_comments_score": 104, //Sum of reddit karma on collected comments
          "tweets": 123, //Number of tweets collected
          "tweet_spam": 71, //Number of tweets classified as spam
          "tweet_followers": 70018, //Sum of follower count for every tweet collected
          "tweet_retweets": 6, //Sum of the number of times all collected tweets were retweeted
          "tweet_favorites": 3, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 7, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 6, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 104, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 6, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 8444, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 1763, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 50437, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 9383, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 70238, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 94, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.3, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 66, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04281234, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 56, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 142, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1244, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 23, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 8, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 192, //The number of unique accounts posting on social
          "social_volume": 213, //Number of social posts
          "price_btc": 0.0033408467902580866, //Current price in BTC
          "social_volume_global": 40375,
          "social_dominance": 0.5275541795665635,
          "market_cap_global": 1638507542934,
          "market_dominance": 0.6990378608505048,
          "percent_change_24h": -13.016229739405084 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616677200, //A unix timestamp (in seconds)
          "open": 171.865778, //Open price for the time period
          "close": 173.896244, //Close price for the time period
          "high": 174.659391, //Higest price fo rthe time period
          "low": 170.689234, //Lowest price for the time period
          "volume": 289475196, //Volume for the time period in USD
          "market_cap": 11615177362, //Total available supply multiplied by the current price in USD
          "url_shares": 67, //Number of urls shared and collected on social
          "unique_url_shares": 50, //Number of unique url shares posted and collected on social
          "reddit_posts": 4, //Number of reddit posts collected
          "reddit_posts_score": 6, //Sum of reddit karma on social posts
          "reddit_comments": 33, //Number of reddit comments collected
          "reddit_comments_score": 120, //Sum of reddit karma on collected comments
          "tweets": 147, //Number of tweets collected
          "tweet_spam": 99, //Number of tweets classified as spam
          "tweet_followers": 274223, //Sum of follower count for every tweet collected
          "tweet_retweets": 27, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 14, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 83, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 7, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 5, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 130, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 5, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 37450, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 1648, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 233447, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 1802, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 274540, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 95, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 3.1, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3.3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 67, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04409564, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 55, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 141, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1182, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 24, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 9, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 239, //The number of unique accounts posting on social
          "social_volume": 235, //Number of social posts
          "price_btc": 0.003349554765298039, //Current price in BTC
          "social_volume_global": 45165,
          "social_dominance": 0.5203144027454888,
          "market_cap_global": 1658301381063,
          "market_dominance": 0.7004262008486339,
          "percent_change_24h": -11.287555138219988 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616680800, //A unix timestamp (in seconds)
          "open": 174.345964, //Open price for the time period
          "close": 174.161352, //Close price for the time period
          "high": 175.570451, //Higest price fo rthe time period
          "low": 172.669382, //Lowest price for the time period
          "volume": 217586316, //Volume for the time period in USD
          "market_cap": 11576761224, //Total available supply multiplied by the current price in USD
          "url_shares": 121, //Number of urls shared and collected on social
          "unique_url_shares": 81, //Number of unique url shares posted and collected on social
          "reddit_posts": 10, //Number of reddit posts collected
          "reddit_posts_score": 42, //Sum of reddit karma on social posts
          "reddit_comments": 14, //Number of reddit comments collected
          "reddit_comments_score": 48, //Sum of reddit karma on collected comments
          "tweets": 114, //Number of tweets collected
          "tweet_spam": 84, //Number of tweets classified as spam
          "tweet_followers": 360022, //Sum of follower count for every tweet collected
          "tweet_quotes": 3, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 11, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 9, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 64, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 2, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 9, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 3, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 98, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 2, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 87, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 14929, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 15457, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 329612, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 24, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 360320, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 90, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 1, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3.1, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 55, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04524731, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 44, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 145, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1179, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 22, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 9, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 198, //The number of unique accounts posting on social
          "social_volume": 220, //Number of social posts
          "price_btc": 0.0033685629826405088, //Current price in BTC
          "social_volume_global": 46342,
          "social_dominance": 0.4747313452160028,
          "market_cap_global": 1654728906139,
          "market_dominance": 0.6996167880460977,
          "percent_change_24h": -10.912231361553518 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616684400, //A unix timestamp (in seconds)
          "open": 173.6447, //Open price for the time period
          "close": 171.860615, //Close price for the time period
          "high": 173.929541, //Higest price fo rthe time period
          "low": 170.867921, //Lowest price for the time period
          "volume": 232052568, //Volume for the time period in USD
          "market_cap": 11457516385, //Total available supply multiplied by the current price in USD
          "url_shares": 44, //Number of urls shared and collected on social
          "unique_url_shares": 36, //Number of unique url shares posted and collected on social
          "reddit_posts": 8, //Number of reddit posts collected
          "reddit_posts_score": 62, //Sum of reddit karma on social posts
          "reddit_comments": 23, //Number of reddit comments collected
          "reddit_comments_score": 92, //Sum of reddit karma on collected comments
          "tweets": 127, //Number of tweets collected
          "tweet_spam": 65, //Number of tweets classified as spam
          "tweet_followers": 282378, //Sum of follower count for every tweet collected
          "tweet_quotes": 2, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 37, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 44, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 268, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 10, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 6, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 99, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 12, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 85729, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 14090, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 148953, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 33957, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 282927, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 92, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 1, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 54.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04677971, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 54, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 145, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1219, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 23, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 9, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 198, //The number of unique accounts posting on social
          "social_volume": 195, //Number of social posts
          "price_btc": 0.003351528603903529, //Current price in BTC
          "social_volume_global": 42932,
          "social_dominance": 0.4542066523805087,
          "market_cap_global": 1641274746941,
          "market_dominance": 0.6980864359458686,
          "percent_change_24h": -11.672612631714802 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616688000, //A unix timestamp (in seconds)
          "open": 172.05816, //Open price for the time period
          "close": 172.874012, //Close price for the time period
          "high": 175.235657, //Higest price fo rthe time period
          "low": 170.262493, //Lowest price for the time period
          "volume": 327872522, //Volume for the time period in USD
          "market_cap": 11541943230, //Total available supply multiplied by the current price in USD
          "url_shares": 179, //Number of urls shared and collected on social
          "unique_url_shares": 73, //Number of unique url shares posted and collected on social
          "reddit_posts": 12, //Number of reddit posts collected
          "reddit_posts_score": 261, //Sum of reddit karma on social posts
          "reddit_comments": 34, //Number of reddit comments collected
          "reddit_comments_score": 101, //Sum of reddit karma on collected comments
          "tweets": 109, //Number of tweets collected
          "tweet_spam": 47, //Number of tweets classified as spam
          "tweet_followers": 118491, //Sum of follower count for every tweet collected
          "tweet_retweets": 12, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 2, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 9, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 8, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 1, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 98, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 2, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 15638, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 17, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 101804, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 1055, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 119055, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 93, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 3.4, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.8, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 66, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.0479746, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 46, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 145, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1177, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 22, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 184, //The number of unique accounts posting on social
          "social_volume": 229, //Number of social posts
          "price_btc": 0.0033494700386301414, //Current price in BTC
          "social_volume_global": 47237,
          "social_dominance": 0.4847894658847937,
          "market_cap_global": 1648343770185,
          "market_dominance": 0.7002145692402867,
          "percent_change_24h": -10.57552298073734 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616691600, //A unix timestamp (in seconds)
          "open": 173.191087, //Open price for the time period
          "close": 174.815336, //Close price for the time period
          "high": 175.00181, //Higest price fo rthe time period
          "low": 172.604227, //Lowest price for the time period
          "volume": 174982146, //Volume for the time period in USD
          "market_cap": 11649080996, //Total available supply multiplied by the current price in USD
          "url_shares": 45, //Number of urls shared and collected on social
          "unique_url_shares": 31, //Number of unique url shares posted and collected on social
          "reddit_posts": 6, //Number of reddit posts collected
          "reddit_posts_score": 17, //Sum of reddit karma on social posts
          "reddit_comments": 13, //Number of reddit comments collected
          "reddit_comments_score": 49, //Sum of reddit karma on collected comments
          "tweets": 98, //Number of tweets collected
          "tweet_spam": 89, //Number of tweets classified as spam
          "tweet_followers": 138821, //Sum of follower count for every tweet collected
          "tweet_quotes": 4, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 42, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 14, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 166, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 2, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 15, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 4, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 71, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 6, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 610, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 38279, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 2104, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 97820, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 234, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 139158, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.7, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 82, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 2.7, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 62.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04877929, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 45, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 145, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1202, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 21, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 9, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 187, //The number of unique accounts posting on social
          "social_volume": 149, //Number of social posts
          "price_btc": 0.0033663579188138214, //Current price in BTC
          "social_volume_global": 43031,
          "social_dominance": 0.34626199716483463,
          "market_cap_global": 1661310954595,
          "market_dominance": 0.7011981088657694,
          "percent_change_24h": -9.513126586102079 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616695200, //A unix timestamp (in seconds)
          "open": 175.247696, //Open price for the time period
          "close": 175.825464, //Close price for the time period
          "high": 176.721478, //Higest price fo rthe time period
          "low": 174.822357, //Lowest price for the time period
          "volume": 168612291, //Volume for the time period in USD
          "market_cap": 11712656163, //Total available supply multiplied by the current price in USD
          "url_shares": 83, //Number of urls shared and collected on social
          "unique_url_shares": 77, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 71, //Sum of reddit karma on social posts
          "reddit_comments": 16, //Number of reddit comments collected
          "reddit_comments_score": 69, //Sum of reddit karma on collected comments
          "tweets": 108, //Number of tweets collected
          "tweet_spam": 52, //Number of tweets classified as spam
          "tweet_followers": 180059, //Sum of follower count for every tweet collected
          "tweet_quotes": 2, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 13, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 7, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 77, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 2, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 9, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 6, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 88, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 3, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 1290, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 4675, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 3533, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 147123, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 23537, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 180381, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 89, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 2, //Number of news articles published
          "price_score": 2.7, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.8, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 62, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04924271, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 59, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 144, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1225, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 168, //The number of unique accounts posting on social
          "social_volume": 206, //Number of social posts
          "price_btc": 0.0033448558510135932, //Current price in BTC
          "social_volume_global": 39657,
          "social_dominance": 0.5194543208008675,
          "market_cap_global": 1678979816573,
          "market_dominance": 0.6976055368495698,
          "percent_change_24h": -8.068076950494838 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616698800, //A unix timestamp (in seconds)
          "open": 175.783383, //Open price for the time period
          "close": 175.631564, //Close price for the time period
          "high": 176.383993, //Higest price fo rthe time period
          "low": 174.520073, //Lowest price for the time period
          "volume": 165137633, //Volume for the time period in USD
          "market_cap": 11711489299, //Total available supply multiplied by the current price in USD
          "url_shares": 70, //Number of urls shared and collected on social
          "unique_url_shares": 23, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 10, //Sum of reddit karma on social posts
          "reddit_comments": 14, //Number of reddit comments collected
          "reddit_comments_score": 38, //Sum of reddit karma on collected comments
          "tweets": 159, //Number of tweets collected
          "tweet_spam": 68, //Number of tweets classified as spam
          "tweet_followers": 202313, //Sum of follower count for every tweet collected
          "tweet_quotes": 2, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 69, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 26, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 199, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 3, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 11, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 1, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 138, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 6, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 6770, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 9779, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 67, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 177376, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 8617, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 202727, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 91, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 2.7, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.8, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 62, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04930885, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 67, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 145, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1202, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 220, //The number of unique accounts posting on social
          "social_volume": 200, //Number of social posts
          "price_btc": 0.0033446135747567216, //Current price in BTC
          "social_volume_global": 37952,
          "social_dominance": 0.5269814502529512,
          "market_cap_global": 1676458984475,
          "market_dominance": 0.6985848987333008,
          "percent_change_24h": -6.9858693818268005 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616702400, //A unix timestamp (in seconds)
          "open": 175.512646, //Open price for the time period
          "close": 175.693919, //Close price for the time period
          "high": 176.502269, //Higest price fo rthe time period
          "low": 175.178901, //Lowest price for the time period
          "volume": 164246737, //Volume for the time period in USD
          "market_cap": 11709599870, //Total available supply multiplied by the current price in USD
          "url_shares": 54, //Number of urls shared and collected on social
          "unique_url_shares": 42, //Number of unique url shares posted and collected on social
          "reddit_posts": 1, //Number of reddit posts collected
          "reddit_posts_score": 2, //Sum of reddit karma on social posts
          "reddit_comments": 9, //Number of reddit comments collected
          "reddit_comments_score": 23, //Sum of reddit karma on collected comments
          "tweets": 140, //Number of tweets collected
          "tweet_spam": 60, //Number of tweets classified as spam
          "tweet_followers": 298366, //Sum of follower count for every tweet collected
          "tweet_retweets": 16, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 2, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 19, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 4, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 12, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 6, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 113, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 5, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 1550, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 14943, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 4765, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 264032, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 13113, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 298482, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.7, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 88, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 2, //Number of news articles published
          "price_score": 2.6, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.8, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 61, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04939207, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 83, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 145, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1246, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 18, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 204, //The number of unique accounts posting on social
          "social_volume": 194, //Number of social posts
          "price_btc": 0.0033598776974978393, //Current price in BTC
          "social_volume_global": 34655,
          "social_dominance": 0.559803780118309,
          "market_cap_global": 1672874744108,
          "market_dominance": 0.6999687162019844,
          "percent_change_24h": -6.871805302818136 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616706000, //A unix timestamp (in seconds)
          "open": 176.196838, //Open price for the time period
          "close": 176.282624, //Close price for the time period
          "high": 176.77689, //Higest price fo rthe time period
          "low": 175.585457, //Lowest price for the time period
          "volume": 116420984, //Volume for the time period in USD
          "market_cap": 11735227840, //Total available supply multiplied by the current price in USD
          "url_shares": 30, //Number of urls shared and collected on social
          "unique_url_shares": 25, //Number of unique url shares posted and collected on social
          "reddit_posts": 1, //Number of reddit posts collected
          "reddit_posts_score": 1, //Sum of reddit karma on social posts
          "reddit_comments": 14, //Number of reddit comments collected
          "reddit_comments_score": 36, //Sum of reddit karma on collected comments
          "tweets": 103, //Number of tweets collected
          "tweet_spam": 59, //Number of tweets classified as spam
          "tweet_followers": 98768, //Sum of follower count for every tweet collected
          "tweet_retweets": 4, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 1, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 18, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 2, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 9, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 2, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 88, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 2, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 729, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 9855, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 79, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 87743, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 385, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 98858, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 89, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 2, //Number of news articles published
          "price_score": 2.7, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.6, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 65, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.0493151, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 80, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 143, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1235, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 18, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 159, //The number of unique accounts posting on social
          "social_volume": 145, //Number of social posts
          "price_btc": 0.0033408358172718937, //Current price in BTC
          "social_volume_global": 32032,
          "social_dominance": 0.4526723276723277,
          "market_cap_global": 1686492347278,
          "market_dominance": 0.6958364121213279,
          "percent_change_24h": -5.4728846158063735 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616709600, //A unix timestamp (in seconds)
          "open": 175.829751, //Open price for the time period
          "close": 173.711949, //Close price for the time period
          "high": 177.039777, //Higest price fo rthe time period
          "low": 173.365036, //Lowest price for the time period
          "volume": 191540407, //Volume for the time period in USD
          "market_cap": 11585941571, //Total available supply multiplied by the current price in USD
          "url_shares": 39, //Number of urls shared and collected on social
          "unique_url_shares": 33, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 4, //Sum of reddit karma on social posts
          "reddit_comments": 18, //Number of reddit comments collected
          "reddit_comments_score": 32, //Sum of reddit karma on collected comments
          "tweets": 92, //Number of tweets collected
          "tweet_spam": 53, //Number of tweets classified as spam
          "tweet_followers": 658230, //Sum of follower count for every tweet collected
          "tweet_retweets": 10, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 1, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 19, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 8, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 3, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 79, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 2, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 7593, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 1337, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 637285, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 12045, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 658335, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 91, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 3.3, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.6, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 68, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04935498, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 94, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 146, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1167, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 9, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 19, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 154, //The number of unique accounts posting on social
          "social_volume": 147, //Number of social posts
          "price_btc": 0.0033318658998454224, //Current price in BTC
          "social_volume_global": 30540,
          "social_dominance": 0.48133595284872305,
          "market_cap_global": 1665302227289,
          "market_dominance": 0.6957260598793009,
          "percent_change_24h": -2.6163947089997124 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616713200, //A unix timestamp (in seconds)
          "open": 173.372981, //Open price for the time period
          "close": 173.146221, //Close price for the time period
          "high": 174.502373, //Higest price fo rthe time period
          "low": 172.568138, //Lowest price for the time period
          "volume": 168669417, //Volume for the time period in USD
          "market_cap": 11583817784, //Total available supply multiplied by the current price in USD
          "url_shares": 50, //Number of urls shared and collected on social
          "unique_url_shares": 41, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 3, //Sum of reddit karma on social posts
          "reddit_comments": 15, //Number of reddit comments collected
          "reddit_comments_score": 31, //Sum of reddit karma on collected comments
          "tweets": 99, //Number of tweets collected
          "tweet_spam": 50, //Number of tweets classified as spam
          "tweet_followers": 157900, //Sum of follower count for every tweet collected
          "tweet_quotes": 2, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 14, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 2, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 32, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 1, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 14, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 3, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 80, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 1, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 84, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 99447, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 86, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 58225, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 108, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 158034, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.7, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 84, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 1.9, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.5, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 60, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04939511, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 73, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 148, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1007, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 149, //The number of unique accounts posting on social
          "social_volume": 159, //Number of social posts
          "price_btc": 0.0033517868927077075, //Current price in BTC
          "social_volume_global": 29046,
          "social_dominance": 0.5474075604214005,
          "market_cap_global": 1655711939183,
          "market_dominance": 0.6996276048909786,
          "percent_change_24h": -2.3636590814402667 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616716800, //A unix timestamp (in seconds)
          "open": 173.61258, //Open price for the time period
          "close": 178.011406, //Close price for the time period
          "high": 178.846404, //Higest price fo rthe time period
          "low": 173.307628, //Lowest price for the time period
          "volume": 259906816, //Volume for the time period in USD
          "market_cap": 11853659246, //Total available supply multiplied by the current price in USD
          "url_shares": 20, //Number of urls shared and collected on social
          "unique_url_shares": 19, //Number of unique url shares posted and collected on social
          "reddit_posts": 2, //Number of reddit posts collected
          "reddit_posts_score": 59, //Sum of reddit karma on social posts
          "reddit_comments": 14, //Number of reddit comments collected
          "reddit_comments_score": 42, //Sum of reddit karma on collected comments
          "tweets": 77, //Number of tweets collected
          "tweet_spam": 60, //Number of tweets classified as spam
          "tweet_followers": 136346, //Sum of follower count for every tweet collected
          "tweet_quotes": 1, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 14, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 2, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 30, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 5, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 3, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 68, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 1, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 9447, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 2738, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 124206, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 2, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 136514, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 93, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 1.5, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.5, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.8, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 58, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04825946, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 84, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 143, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1052, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 122, //The number of unique accounts posting on social
          "social_volume": 113, //Number of social posts
          "price_btc": 0.0033932594851216495, //Current price in BTC
          "social_volume_global": 26819,
          "social_dominance": 0.42134307766881685,
          "market_cap_global": 1685758417405,
          "market_dominance": 0.7031647668855853,
          "percent_change_24h": -0.6317406786794607 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616720400, //A unix timestamp (in seconds)
          "open": 178.205103, //Open price for the time period
          "close": 177.747776, //Close price for the time period
          "high": 178.766875, //Higest price fo rthe time period
          "low": 177.425571, //Lowest price for the time period
          "volume": 148997097, //Volume for the time period in USD
          "market_cap": 11831422739, //Total available supply multiplied by the current price in USD
          "url_shares": 168, //Number of urls shared and collected on social
          "unique_url_shares": 70, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 97, //Sum of reddit karma on social posts
          "reddit_comments": 13, //Number of reddit comments collected
          "reddit_comments_score": 47, //Sum of reddit karma on collected comments
          "tweets": 94, //Number of tweets collected
          "tweet_spam": 42, //Number of tweets classified as spam
          "tweet_followers": 169145, //Sum of follower count for every tweet collected
          "tweet_retweets": 10, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 5, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 111, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 7, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 1, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 84, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 2, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 30888, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 137, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 134494, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 3752, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 169583, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 92, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 2, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.5, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3.4, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 64, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04681106, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 76, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 148, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 789, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 127, //The number of unique accounts posting on social
          "social_volume": 180, //Number of social posts
          "price_btc": 0.0033807781856302756, //Current price in BTC
          "social_volume_global": 25002,
          "social_dominance": 0.7199424046076314,
          "market_cap_global": 1690427034676,
          "market_dominance": 0.699907330887411,
          "percent_change_24h": 2.156406478524828 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616724000, //A unix timestamp (in seconds)
          "open": 177.442046, //Open price for the time period
          "close": 174.60121, //Close price for the time period
          "high": 177.910525, //Higest price fo rthe time period
          "low": 174.252016, //Lowest price for the time period
          "volume": 176424825, //Volume for the time period in USD
          "market_cap": 11640369804, //Total available supply multiplied by the current price in USD
          "url_shares": 27, //Number of urls shared and collected on social
          "unique_url_shares": 21, //Number of unique url shares posted and collected on social
          "reddit_posts": 1, //Number of reddit posts collected
          "reddit_posts_score": 1, //Sum of reddit karma on social posts
          "reddit_comments": 13, //Number of reddit comments collected
          "reddit_comments_score": 41, //Sum of reddit karma on collected comments
          "tweets": 92, //Number of tweets collected
          "tweet_spam": 40, //Number of tweets classified as spam
          "tweet_followers": 150785, //Sum of follower count for every tweet collected
          "tweet_retweets": 3, //Sum of the number of times all collected tweets were retweeted
          "tweet_favorites": 5, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 3, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 5, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 10, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 73, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 1, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 12303, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 11212, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 58945, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 67547, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 786, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 150862, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.7, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 90, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.4, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.7, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3.1, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 69.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04545389, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 167, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 149, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1284, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 128, //The number of unique accounts posting on social
          "social_volume": 127, //Number of social posts
          "price_btc": 0.0033547311636941807, //Current price in BTC
          "social_volume_global": 25158,
          "social_dominance": 0.5048096033070991,
          "market_cap_global": 1672034476689,
          "market_dominance": 0.696180011015713,
          "percent_change_24h": -1.501753321515847 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616727600, //A unix timestamp (in seconds)
          "open": 174.784049, //Open price for the time period
          "close": 176.530719, //Close price for the time period
          "high": 177.367529, //Higest price fo rthe time period
          "low": 174.56366, //Lowest price for the time period
          "volume": 172925851, //Volume for the time period in USD
          "market_cap": 11775055061, //Total available supply multiplied by the current price in USD
          "url_shares": 14, //Number of urls shared and collected on social
          "unique_url_shares": 13, //Number of unique url shares posted and collected on social
          "reddit_posts": 1, //Number of reddit posts collected
          "reddit_posts_score": 4, //Sum of reddit karma on social posts
          "reddit_comments": 7, //Number of reddit comments collected
          "reddit_comments_score": 13, //Sum of reddit karma on collected comments
          "tweets": 106, //Number of tweets collected
          "tweet_spam": 38, //Number of tweets classified as spam
          "tweet_followers": 75751, //Sum of follower count for every tweet collected
          "tweet_quotes": 1, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 22, //Sum of the number of times all collected tweets were retweeted
          "tweet_favorites": 72, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 15, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 5, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 83, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 3, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 3739, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 577, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 69236, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 2294, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 75877, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.7, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 85, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.4, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.7, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 68.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04373595, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 155, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 148, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1184, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 19, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 139, //The number of unique accounts posting on social
          "social_volume": 127, //Number of social posts
          "price_btc": 0.003348066474396103, //Current price in BTC
          "social_volume_global": 23653,
          "social_dominance": 0.536929776349723,
          "market_cap_global": 1690212718212,
          "market_dominance": 0.6966611323015188,
          "percent_change_24h": -0.32599078274664145 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616731200, //A unix timestamp (in seconds)
          "open": 176.690765, //Open price for the time period
          "close": 176.725565, //Close price for the time period
          "high": 177.157374, //Higest price fo rthe time period
          "low": 175.42102, //Lowest price for the time period
          "volume": 141440176, //Volume for the time period in USD
          "market_cap": 11797300619, //Total available supply multiplied by the current price in USD
          "url_shares": 19, //Number of urls shared and collected on social
          "unique_url_shares": 16, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 33, //Sum of reddit karma on social posts
          "reddit_comments": 14, //Number of reddit comments collected
          "reddit_comments_score": 46, //Sum of reddit karma on collected comments
          "tweets": 105, //Number of tweets collected
          "tweet_spam": 31, //Number of tweets classified as spam
          "tweet_followers": 227811, //Sum of follower count for every tweet collected
          "tweet_quotes": 2, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 54, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 41, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 443, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 1, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 5, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 2, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 95, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 2, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 7120, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 1072, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 329, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 216915, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 2915, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 228449, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 94, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 3.3, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.7, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 69.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.0433468, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 120, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 147, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1093, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 145, //The number of unique accounts posting on social
          "social_volume": 139, //Number of social posts
          "price_btc": 0.003335276960452284, //Current price in BTC
          "social_volume_global": 23183,
          "social_dominance": 0.599577276452573,
          "market_cap_global": 1695410776664,
          "market_dominance": 0.6958373027575732,
          "percent_change_24h": -0.007164267863797201 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616734800, //A unix timestamp (in seconds)
          "open": 177.031575, //Open price for the time period
          "close": 177.323255, //Close price for the time period
          "high": 177.585549, //Higest price fo rthe time period
          "low": 176.442878, //Lowest price for the time period
          "volume": 124376129, //Volume for the time period in USD
          "market_cap": 11796788279, //Total available supply multiplied by the current price in USD
          "url_shares": 59, //Number of urls shared and collected on social
          "unique_url_shares": 8, //Number of unique url shares posted and collected on social
          "reddit_posts": 3, //Number of reddit posts collected
          "reddit_posts_score": 4, //Sum of reddit karma on social posts
          "reddit_comments": 9, //Number of reddit comments collected
          "reddit_comments_score": 25, //Sum of reddit karma on collected comments
          "tweets": 77, //Number of tweets collected
          "tweet_spam": 88, //Number of tweets classified as spam
          "tweet_followers": 60592, //Sum of follower count for every tweet collected
          "tweet_retweets": 6, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 1, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 2, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 6, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 1, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 69, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 1, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 1200, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 7, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 58946, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 448, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 60689, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 92, //Percent tweets that are bullish (excluding neutral in the count)
          "news": 1, //Number of news articles published
          "price_score": 3.4, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.7, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 2.9, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 69, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04293093, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 131, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 147, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1168, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 19, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 163, //The number of unique accounts posting on social
          "social_volume": 98, //Number of social posts
          "price_btc": 0.0033390840140479694, //Current price in BTC
          "social_volume_global": 22830,
          "social_dominance": 0.4292597459483136,
          "market_cap_global": 1700691428055,
          "market_dominance": 0.6936466006941322,
          "percent_change_24h": -0.6754171705738606 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616738400, //A unix timestamp (in seconds)
          "open": 177.183835, //Open price for the time period
          "close": 177.043165, //Close price for the time period
          "high": 178.288708, //Higest price fo rthe time period
          "low": 176.468838, //Lowest price for the time period
          "volume": 130492017, //Volume for the time period in USD
          "market_cap": 11813777449, //Total available supply multiplied by the current price in USD
          "url_shares": 231, //Number of urls shared and collected on social
          "unique_url_shares": 20, //Number of unique url shares posted and collected on social
          "reddit_posts": 2, //Number of reddit posts collected
          "reddit_posts_score": 4, //Sum of reddit karma on social posts
          "reddit_comments": 2, //Number of reddit comments collected
          "reddit_comments_score": 2, //Sum of reddit karma on collected comments
          "tweets": 81, //Number of tweets collected
          "tweet_spam": 428, //Number of tweets classified as spam
          "tweet_followers": 63622, //Sum of follower count for every tweet collected
          "tweet_quotes": 1, //Sum of the number of times all collected tweets were quoted
          "tweet_retweets": 276, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 60, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 105, //Sum of the number of times all collected tweet likes
          "tweet_sentiment2": 8, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 3, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 70, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact2": 2822, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 9807, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 51435, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "social_score": 64301, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 90, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.2, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 65.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04254163, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 133, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 149, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 1199, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 19, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 10, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 339, //The number of unique accounts posting on social
          "social_volume": 105, //Number of social posts
          "price_btc": 0.0033447239445385498, //Current price in BTC
          "social_volume_global": 25679,
          "social_dominance": 0.40889442735309006,
          "market_cap_global": 1693343403901,
          "market_dominance": 0.6976598734659661,
          "percent_change_24h": -0.8842762707802386 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616742000, //A unix timestamp (in seconds)
          "open": 177.482237, //Open price for the time period
          "close": 177.690631, //Close price for the time period
          "high": 178.347045, //Higest price fo rthe time period
          "low": 176.226972, //Lowest price for the time period
          "volume": 69990176, //Volume for the time period in USD
          "market_cap": 11869740471, //Total available supply multiplied by the current price in USD
          "url_shares": 88, //Number of urls shared and collected on social
          "unique_url_shares": 25, //Number of unique url shares posted and collected on social
          "reddit_posts": 1, //Number of reddit posts collected
          "reddit_posts_score": 1, //Sum of reddit karma on social posts
          "reddit_comments": 1, //Number of reddit comments collected
          "reddit_comments_score": 1, //Sum of reddit karma on collected comments
          "tweets": 99, //Number of tweets collected
          "tweet_spam": 161, //Number of tweets classified as spam
          "tweet_followers": 24088, //Sum of follower count for every tweet collected
          "tweet_retweets": 5, //Sum of the number of times all collected tweets were retweeted
          "tweet_sentiment2": 8, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 2, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 84, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 5, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact2": 1122, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 84, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 21611, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 1276, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 24183, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.9, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 92, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.3, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 66.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04212946, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 80, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 148, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 866, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 20, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 17, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 182, //The number of unique accounts posting on social
          "social_volume": 126, //Number of social posts
          "price_btc": 0.003317608746349696, //Current price in BTC
          "social_volume_global": 27893,
          "social_dominance": 0.4517262395583121,
          "market_cap_global": 1712415637920,
          "market_dominance": 0.6931576778531221,
          "percent_change_24h": 1.5682437830398193 //Percent change in price since 24 hours ago
      },{ //An array of metrics for hourly or daily data points
          "asset_id": 4, //The LunarCRUSH id for an asset/coin
          "time": 1616745600, //A unix timestamp (in seconds)
          "close": 177.956454, //Close price for the time period
          "market_cap": 11875931013, //Total available supply multiplied by the current price in USD
          "url_shares": 48, //Number of urls shared and collected on social
          "unique_url_shares": 10, //Number of unique url shares posted and collected on social
          "tweets": 89, //Number of tweets collected
          "tweet_spam": 123, //Number of tweets classified as spam
          "tweet_followers": 80969, //Sum of follower count for every tweet collected
          "tweet_retweets": 6, //Sum of the number of times all collected tweets were retweeted
          "tweet_replies": 1, //Sum of the number of times all collected tweet reply counts
          "tweet_favorites": 23, //Sum of the number of times all collected tweet likes
          "tweet_sentiment1": 1, //Sum of tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment2": 6, //Sum of tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment3": 2, //Sum of tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment4": 77, //Sum of tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment5": 3, //Sum of tweets classified as sentiment 5 (Very Bullish)
          "tweet_sentiment_impact1": 130, //Sum of social score (engagement) of all tweets classified as sentiment 1 (Very Bearish)
          "tweet_sentiment_impact2": 1234, //Sum of social score (engagement) of all tweets classified as sentiment 2 (Bearish)
          "tweet_sentiment_impact3": 94, //Sum of social score (engagement) of all tweets classified as sentiment 3 (Neutral)
          "tweet_sentiment_impact4": 78803, //Sum of social score (engagement) of all tweets classified as sentiment 4 (Bullish)
          "tweet_sentiment_impact5": 738, //Sum of social score (engagement) of all tweets classified as sentiment 5 (Very Bullish)
          "social_score": 81047, //Sum of followers, retweets, likes, reddit karma etc of social posts collected
          "average_sentiment": 3.8, //Average sentiment of collected social posts
          "sentiment_absolute": 3, //Percent of bullish or very bullish tweets
          "sentiment_relative": 92, //Percent tweets that are bullish (excluding neutral in the count)
          "price_score": 3.2, //A proprietary score based mostly on the change in MACD over time
          "social_impact_score": 3.1, //A proprietary score based on the relative trend of social_score
          "correlation_rank": 3, //A score based on how the assets social metrics correlate with price and volume
          "galaxy_score": 65.5, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
          "volatility": 0.04171771, //degree of variation of a trading price series over time as measured by the standard deviation of logarithmic returns
          "alt_rank": 99, //A proprietary score based on how an asset is performing relative to all other assets supported
          "alt_rank_30d": 148, //AltRank™ but using 30 day metrics instead of 24 hour metrics
          "market_cap_rank": 10, //Position/rank of the asset relative to all other supported assets, lower is better
          "percent_change_24h_rank": 987, //Position/rank of the assets percent change in 24 hours, lower is better (positive percent change)
          "volume_24h_rank": 8, //Position/rank of the assets 24 hour volume in USD relative to all other supported assets, lower is more volume
          "social_volume_24h_rank": 21, //Position/rank of the assets 24 hour social volume relative to all other supported assets, lower is most volume
          "social_score_24h_rank": 18, //Position/rank of the assets 24 hour social score relative to all other supported assets, lower is best/highest social score
          "social_contributors": 27, //The number of unique accounts posting on social
          "social_volume": 99, //Number of social posts
          "price_btc": 0.0033100730035958677, //Current price in BTC
          "social_volume_global": 29224,
          "social_dominance": 0.3387626608267178,
          "percent_change_24h": 0.77 //Percent change in price since 24 hours ago
      } ]
  } ]
}