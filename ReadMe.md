# Redux Persist MongoDb Storage

This is an object to be used with [redux-persist](https://github.com/rt2zz/redux-persist).  It conforms to the current storage object definition in that it has the following methods exposed:
```
getItem(key)
setItem(key, value)
removeItem(key)
```
The intent is for this to provide a server side storage object that uses [MongoDb](https://www.mongodb.com) as the backing store.

## Configuring MongoDb
There are two ways to set up MongoDb so that you can connect to your own instance of MongoDb.  The first is to edit the `db.json` file in the `src` folder.  The other is to set environment variables in the system or container running the `redux-persist` module.  The configuration values and their environment variable equivalents are in the table below:

| Config | Env | Default | Description|
| --- | --- | --- | --- |
| `url` | `MONGO_URL` | `mongodb://localhost/` | The url used to connect to MongoDb upon.  This conforms the the MongoDb [URL documentation](https://docs.mongodb.com/manual/reference/connection-string/). |
| `connect_opts` | `MONGO_CONNECT` | `{}` | Connection options passed tot he connect method call.  These conform to the connection options used by the [MongoClient](http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html#.connect). |
| `name` | `MONGO_DB_NAME` | `redux-db` | The name of the MongoDb database used. |
| `collection` | `MONGO_COLLECTION` | `state-collection` | The name of the document collection used in the database. |
