module.exports = {
  logonInvalidToken: {
    "data":{},
    "errors":[
      {
        "message":"Error 3: Not logged in",
        "detail":null,
        "code":"3"
      }
    ],
    "warnings":[],
    "meta":{
      "jsdbInvalidator":"p0LLwfK3IkOEyisVD8iG1A2",
      "clientVersionAllowed":{"min":5,"max":5}
    },
    "errorCode":400,
    "maxCacheAge":null},
  logonValidToken: {
    "data": {"token":"validtoken"},
    "errors":[],
    "warnings":[],
    "meta": {
      "jsdbInvalidator":"p0LLwfK3IkOEyisVD8iG1A2",
      "clientVersionAllowed":{"min":5,"max":5}
    },
    "errorCode":null,
    "maxCacheAge":null
  },
  new: {
    "data": {
      "case": {
        "ixBug": 5518,
        "operations": [
          "edit",
          "assign",
          "resolve",
          "email"
        ]
      }
    },
    "errors": [],
    "warnings": [],
    "meta": {
      "jsdbInvalidator": "p0LLwfK3IkOEyisVD8iG1A2",
      "clientVersionAllowed": {
        "min": 5,
        "max": 5
      }
    },
    "errorCode": null,
    "maxCacheAge": null
  },
  noSuchCommand:{
    "data": {},
    "errors": [
      {
        "message": "Error 27: No such API command",
        "detail": null,
        "code": "27"
      }
    ],
    "warnings": [],
    "meta": {
      "jsdbInvalidator": "p0LLwfK3IkOEyisVD8iG1A2",
      "clientVersionAllowed": {
        "min": 5,
        "max": 5
      }
    },
    "errorCode": 400,
    "maxCacheAge": null
  }
};

