# Hoover Problem


## To build the project follow below steps:

* Install NodeJS, if not installed (Require Node version >= 8.0.0)
```
	$ wget -qO- https://deb.nodesource.com/setup_8.x | bash -
	$ sudo apt-get install -y nodejs
```

* Install npm, if not installed (Require NPM version >= 5.0.0)
```
	$ sudo apt-get install npm
	$ sudo npm install -g yarn
```

* Install mongodb, if not installed

	Install mongo (v4) from [here](https://docs.mongodb.com/manual/administration/install-community)

* To build the application
```
	$ yarn
```

* To run the application
```
	$ yarn start
```

## Server will run on http://localhost:3000


# To Check the result execute below API

```bash
URL: http://localhost:3000/get_output
Method: POST
Headers: {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}
Payload: {
	"roomSize": [5, 5],
	"coords": [1, 2],
	"patches": [
		[1, 0],
		[2, 2],
		[2, 3]
	],
	"instructions": "NNESEESWNWW"
}
```

The response will be like:
```bash
{
	"coords": [1, 3],
	"patches": 1
}
```

# To fetch the records from DB execute below API

```bash
URL: http://localhost:3000/get_records
Method: GET
Headers: {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}
```

The response will be like:
```bash
{
	data: [
		{
			"_id": "5d01f6dc3a16821f5559a62d",
			"input": {
				"roomSize": [5, 5],
				"coords": [1, 2],
				"patches": [
					[1, 0],
					[2, 2],
					[2, 3]
				],
				"instructions": "NNESEESWNWW"
			},
			"output": {
				"coords": [1, 3],
				"patches": 1
			}
		}
	]
}
```
