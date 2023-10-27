# Hotelnesia

Hotelnesia App is an hotel application to booking room. It performs standard CRUD actions based on RESTful concept.

This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

Tech Stack used to build this app :

- Node JS
- Express JS framework
- PostgreSQL

&nbsp;

## RESTful endpoints

### GET /register

> customer register

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "string",,
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "dateOfBirth": "string",
  "profilePicture": "string"

}
```

_Request File_

```
  "profilePicture": "file"

```

_Response (201 - Created)_

```
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Phone number is required"
}
OR
{
  "message": "Profile picture is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Date of Birth is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Invalid email format"
}

```

---

### POST /login

> customer login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

{
"message": "Email is required"
}
OR
{
"message": "Password is required"
}

```
_Response (401 - Unauthorized)_

{
  "message": "Invalid email/password"
}
```

---

### GET /rooms

> get all rooms

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "name": string,
    "description": string,
    "price": integer,
    "adult": integer,
    "children": integer,
    "imageUrl": string,
    "availability": boolean,
    "features": string,
    "facilities": string
  },
]
```

---

### GET /rooms/:roomId

> Get detail room

_Request Params_

```
{
  "roomId": integer
}
```

_Response (200 - OK)_

```
{
    "name": string,
    "description": string,
    "price": integer,
    "adult": integer,
    "children": integer,
    "imageUrl": string,
    "availability": boolean,
    "features": string,
    "facilities": string
  },
```

_Response (404 - Not Found)_

```
{
  "message": "Room not found"
}
```

### GET /customers

> Get detail customer

_Request Header_

```
"access_token": string
```

_Response (200 - OK)_

```

 {
    "name": string,
    "email": string,
    "phoneNumber": string,
    "profilePicture": string,
    "address": string,
    "dateOfBirth": date
}

```

### PUT /customers

> Update detail customer

_Request Header_

```
"access_token": string
```

_Request Body_

```
{
  "name": "string",,
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "dateOfBirth": "string",
  "profilePicture": "string"

}
```

_Request File_

```
  "profilePicture": "file"

```

_Response (200 - OK)_

```
 {
   message: 'Data has been updated'
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Phone number is required"
}
OR
{
  "message": "Profile picture is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Date of Birth is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Invalid email format"
}

```

_Response (404 - Not Found)_

```
{
  "message": "Customer not found"
}
```

### POST /generate-midtrans-token

> generate midtrans

_Request Header_

```
"access_token": string
```

_Request Body_

```
{
    "RoomId": integer,
    "CustomerId" : integer,
    "bookingDate" : date,
    "statusPayment" : string,
    "checkinDate": date,
    "checkoutDate": date,
    "totalPayment": integer,
},
```

_Response (201 - Created)_

```
{
    "midtransToken": object,
    "bookingId": integer,
},
```

_Response (400 - Bad Request)_

```
{
    "message": string,
},
```

### PATCH /bookings/:bookingId

> update status payment of the booking

_Request Header_

```
"access_token": string
```

_Request Params_

```
"bookingId": integer
```

_Response (200 - OK)_

```
{
    message: "update status payment with booking id success"
},
```

## Global Error

> These error are applied globally on all endpoints

_Response (401 - Unauthorized)_

```
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
