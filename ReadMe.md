# Redux Persist MongoDb Storage

This is an object to be used with [redux-persist](https://github.com/rt2zz/redux-persist).  It conforms to the current storage object definition in that it has the following methods exposed:
```
getItem(key)
setItem(key, value)
removeItem(key)
```
The intent is for this to provide a server side storage object that uses [MongoDb](https://www.mongodb.com) as the backing store.

## Usage
First install the store using npm, eg:

`npm install - S redux-persist-mongodb-storage`

Then in your code include the store, for example in `store.js`:

```
import { createStore } from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import MongoDBStore from 'redux-persist-mongodb-storage';
import reducer from '../reducers';

export default function makeStore() {

	const persistConfig = {
  		key: 'root',
  		storage: MongoDBStore
		}

	const persistedReducer = persistReducer(persistConfig, reducer);

	let store = createStore(persistedReducer);
	let persistor = persistStore(store);

	return { store, persistor };
	}
```

In order to supply a custom configuration you can do something like the following:

```
var options = {
	name:			'testdb',
	collection:		'stuff'
	}

MongoDBStore.configure(options);

const persistConfig = {
	key: 'root',
	storage: MongoDBStore
	}
```

## Configuring MongoDb
To configure this object to work with MongoDb pass a configuration object to the `configure` method.  The configuration values are in the table below with their defaults:

| Config | Default | Description|
| --- | --- | --- |
| `url` | `mongodb://localhost/` | The url used to connect to MongoDb upon.  This conforms the the MongoDb [URL documentation](https://docs.mongodb.com/manual/reference/connection-string/). |
| `connect_opts` | `{}` | Connection options passed tot he connect method call.  These conform to the connection options used by the [MongoClient](http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html#.connect). |
| `name` | `redux-db` | The name of the MongoDb database used. |
| `collection` | `state-collection` | The name of the document collection used in the database. |
