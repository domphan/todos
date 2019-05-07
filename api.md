# API Documentation

## Create new task

**METHOD**: `POST`

**URL**: `/todo`

**Request Params**: 
```json
{
  "group": "Purchases",
  "task": "Buy wood",
  "dependencyIds": [1]
}
```
*group*: (required) name of the task group as a string
*task:* (required) description of the task as a string
*depenencyIds:* array of other task ids that the task is dependent on

**Response**:

200 OK

```json
{
    "id": 3,
    "group": "Purchases",
    "task": "Buy wood",
    "dependencyIds": [1],
    "completedAt": null
  },
```

422 Unprocessable Entity
Occurs if body parameters are missing or if dependencyIds are invalid

## Get all tasks

**METHOD**: `GET`

**URL**: `/todo`

**Request Params**: `n/a`

**Response**:

200 OK
```json
[
  {
    "id": 1,
    "group": "Purchases",
    "task": "Go to the bank",
    "dependencyIds": [],
    "completedAt": null
  },
  {
    "id": 2,
    "group": "Purchases",
    "task": "Buy hammer",
    "dependencyIds": [
      1
    ],
    "completedAt": null
  }
  ...
]
```

## Get single task

**METHOD**: `GET`

**URL**: `/todo/:taskid`

**URL Parameter**: `taskid=[integer] where taskid is the ID of a task`

**Response**:

200 OK
```json
{
    "id": 3,
    "group": "Purchases",
    "task": "Buy wood",
    "dependencyIds": [1],
    "completedAt": null
}
```

404 Not Found
Occurs if a task of id, 'taskid' doesn't exist

## Modify Task

**METHOD**: `PATCH`

**URL**: `/todo/:taskid`

**URL Parameter**: `taskid=[integer] where taskid is the ID of a task`

**Request Params**: 
```json
{
  "completedAt": 1557248214
}
```
*group*: (optional) name of the task group as a string
*task:* (optional) description of the task as a string
*depenencyIds:* (optional) array of other task ids that the task is dependent on
*completedAt*: (optional) timestamp at which task was completed

**Response**:

200 OK
```json
{
    "id": 3,
    "group": "Purchases",
    "task": "Buy wood",
    "dependencyIds": [1],
    "completedAt": 1557248214
}
```

422 Unprocessable Entity
Occurs if an empty body is sent with request

404 Not found
Occurs if a task of id, 'taskid' doesn't exist

## Delete task

**METHOD**: `DELETE`

**URL**: `/todo/:taskid`

**URL Parameter**: `taskid=[integer] where taskid is the ID of a task`

**Response**

204 OK
Occurs if delete was successful
 
404 Not Found
Occurs if a task of id, 'taskid' doesn't exist
