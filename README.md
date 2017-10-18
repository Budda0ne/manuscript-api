# Manuscript API

This package is a lightweight wrapper around the Manuscript API.  


## Usage

Require manuscript-api with your Manuscript URL and API.  This is likely your best approach if you are looking to integrate with a single Mansucript account. 
  
```javascript
var manuscript = require('manuscript-api')('https://your.manuscript.url/', 'yourmanuscripttoken');
```

Or require it without account data and provide your data later.  This will be your best approach if you are writing a single app that will interface with multiple Manuscript accounts.  This returns a functi

```javascript
var mAPI = require('manuscript-api')
var manuscript = manuscript('https://your.manuscript.url/', 'yourmanuscripttoken');
```

Once you've required manuscript-api and passed it a Manuscript URL and token,
you'll have a proxy against which you can call any endpoint of the Manuscript 
API.  For a complete list of Manuscript API endpoints, see the documentation here.

For any endpoint, call the endpoint against your manuscript Object, and pass your parameters as an object.  Under the hood, this wrapper is returning request-promise-native, and returns a promise.  Choose your strategy for handling promises:

Both of the following post to http://example.manuscript.url/api/new.  First we'll handle the promise:

```javascript

manuscript.new({sTitle:"Case Title"})
  .then(function(data) {
    console.log(data);
  })
  
```

Alternatively, we can use async\await

```javascript
async () => {
  let data = await manuscript.new({sTitle:"Case Title"})
  console.log(data)
}

```

Made by Fog Creek
-----------------

\ ゜o゜)ノ
