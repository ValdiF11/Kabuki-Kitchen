# Kabuki Kicthen App API Docs

## Link

Cms:
[https://kabuki-kitchen.valdifirstianto.online/](https://kabuki-kitchen.valdifirstianto.online/)
Publik:
[https://kabuki-kitchen-public.valdifirstianto.online/](https://kabuki-kitchen-public.valdifirstianto.online/)

List of available endpoint

- `GET` /cuisines
- `GET` /cuisines/:id
- `GET` /categories
- `GET` /pub/cuisines
- `GET` /pub/cuisines/:id
- `POST` /add-user
- `POST` /login
- `POST` /cuisines
- `POST` /categories
- `PUT` /cuisines/:id
- `PUT` /categories/:id
- `PATCH` /cuisines/:id/coverUrl
- `DELETE` /cuisines/:id
- `DELETE` /categories/:id

## GET /cuisines

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - OK_

```json
[
  {
    "id": 1,
    "name": "tuna sashimi",
    "description": "mackerel sashimi",
    "price": 34263,
    "imgUrl": "https://www.example.com/imaged.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2024-03-29T07:17:06.037Z",
    "updatedAt": "2024-03-29T07:17:06.037Z",
    "User": {
      "id": 1,
      "username": "Admin1",
      "email": "admin1@KKitchen.com",
      "role": "admin",
      "phoneNumber": "021331331331",
      "address": "Kabuki Kitchen",
      "createdAt": "2024-03-29T07:17:05.868Z",
      "updatedAt": "2024-03-29T07:17:05.868Z"
    }
  },
  {
    "id": 2,
    "name": "salmon sashimi",
    "description": "eel sashimi",
    "price": 30396,
    "imgUrl": "https://www.example.com/imagedd.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2024-03-29T07:17:06.037Z",
    "updatedAt": "2024-03-29T07:17:06.037Z",
    "User": {
      "id": 1,
      "username": "Admin1",
      "email": "admin1@KKitchen.com",
      "role": "admin",
      "phoneNumber": "021331331331",
      "address": "Kabuki Kitchen",
      "createdAt": "2024-03-29T07:17:05.868Z",
      "updatedAt": "2024-03-29T07:17:05.868Z"
    }
  },...
]
```

_401-Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

## GET /cuisines/:id

### Request

- params

```json
{
    "id": string
}
```

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - OK_

```json
{
  "id": 1,
  "name": "tuna sashimi",
  "description": "mackerel sashimi",
  "price": 34263,
  "imgUrl": "https://www.example.com/imaged.jpg",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2024-03-29T07:17:06.037Z",
  "updatedAt": "2024-03-29T07:17:06.037Z",
  "User": {
    "id": 1,
    "username": "Admin1",
    "email": "admin1@KKitchen.com",
    "role": "admin",
    "phoneNumber": "021331331331",
    "address": "Kabuki Kitchen",
    "createdAt": "2024-03-29T07:17:05.868Z",
    "updatedAt": "2024-03-29T07:17:05.868Z"
  }
}
```

_401-Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_404-Not Found_

```json
{
  "message": "Error not found"
}
```

## GET /categories

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - OK_

```json
[
  {
    "id": 1,
    "name": "Sashimi",
    "createdAt": "2024-03-29T07:17:06.030Z",
    "updatedAt": "2024-03-29T07:17:06.030Z"
  },
  {
    "id": 2,
    "name": "Sushi",
    "createdAt": "2024-03-29T07:17:06.030Z",
    "updatedAt": "2024-03-29T07:17:06.030Z"
  },
  {
    "id": 3,
    "name": "Nigiri",
    "createdAt": "2024-03-29T07:17:06.030Z",
    "updatedAt": "2024-03-29T07:17:06.030Z"
  }
]
```

## GET pub/cuisines

### Request

- Query

```json
{
 "filter": string,
 "sort": string,
 "search": string,
 "page": string
}

```

### Response

_200 - OK_

```json
{
  "page": 1,
  "data": [
    {
      "id": 1,
      "name": "tuna sashimi",
      "description": "mackerel sashimi",
      "price": 34263,
      "imgUrl": "https://www.example.com/imaged.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 2,
      "name": "salmon sashimi",
      "description": "eel sashimi",
      "price": 30396,
      "imgUrl": "https://www.example.com/imagedd.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 3,
      "name": "yellowtail sashimi",
      "description": "eel sashimi",
      "price": 37816,
      "imgUrl": "https://www.example.com/imaged.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 4,
      "name": "octopus sashimi",
      "description": "tuna sashimi",
      "price": 36096,
      "imgUrl": "https://www.example.com/imagedd.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 5,
      "name": "mackerel sashimi",
      "description": "squid sashimi",
      "price": 36005,
      "imgUrl": "https://www.example.com/imagedd.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 6,
      "name": "shrimp sashimi",
      "description": "tuna sashimi",
      "price": 44060,
      "imgUrl": "https://www.example.com/imagedd.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 7,
      "name": "scallop sashimi",
      "description": "mackerel sashimi",
      "price": 43657,
      "imgUrl": "https://www.example.com/imaged.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 8,
      "name": "squid sashimi",
      "description": "octopus sashimi",
      "price": 35724,
      "imgUrl": "https://www.example.com/imagedd.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 9,
      "name": "eel sashimi",
      "description": "yellowtail sashimi",
      "price": 37175,
      "imgUrl": "https://www.example.com/imaged.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    },
    {
      "id": 10,
      "name": "snapper sashimi",
      "description": "squid sashimi",
      "price": 36658,
      "imgUrl": "https://www.example.com/imagedd.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-03-29T07:17:06.037Z",
      "updatedAt": "2024-03-29T07:17:06.037Z"
    }
  ],
  "totalData": 10,
  "totalPage": 1,
  "dataPerPage": 10
}
```

## GET pub/cuisines/:id

### Request

- Params

```json
{
 "id":string
}

```

### Response

_200 - OK_

```json
{
  "id": 32,
  "name": "seared salmon",
  "description": "snapper",
  "price": 42159,
  "imgUrl": "https://example.com/image2.jpg",
  "categoryId": 3,
  "authorId": 1,
  "createdAt": "2024-03-29T07:17:06.037Z",
  "updatedAt": "2024-03-29T07:17:06.037Z"
}
```

_404-Not Found_

```json
{
  "message": "Error not found"
}
```

## POST /add-user

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
  "username": string,
  "email": string,
  "password": string,
  "phoneNumber": string,
  "address": string
}
```

### Response

_201 - Created_

```json
{
  "id": 4,
  "username": "Staff1",
  "email": "staff1@KKitchen.com",
  "role": "Staff",
  "phoneNumber": "00000000",
  "address": "Kabuki Kitchen",
  "createdAt": "2024-03-29T16:01:44.698Z",
  "updatedAt": "2024-03-29T16:01:44.698Z"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_403 - Forbidden_

```json
{
  "message": "Forbidden error authorization"
}
```

_400 - Bad Request_

```json
{
  "message": ["username is required", "Email is required", "Password is required"]
}
Or
{
    "message": [
        "Email already Exist"
    ]
}
Or
{
    "message": [
        "Invalid email format",
        "Password atleast 5 character"
    ]
}
```

## POST /login

### Request

- body

```json
{
  "username": string,
  "password": string,
}
Or
{
  "email": string,
  "password": string,
}
```

### Response

_200 - OK_

```json
{
  "acces_token": "<token>"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error login user not found / password not matched"
}
```

_400 - Bad Request_

```json
{
  "message": "Username/ email/ passwword cannot be empty"
}
```

## POST /Cuisines

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
    "id": integer,
    "name": string,
    "description": string,
    "price": integer,
    "imgUrl": string,
    "categoryId": integer,
}
```

### Response

_201 - Created_

```json
{
  "id": 40,
  "name": "Tuna Mayo Sashimi",
  "description": "Tuna Sashimi With Mayonaise",
  "price": 30000,
  "imgUrl": "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
  "categoryId": 1,
  "authorId": 3,
  "updatedAt": "2024-03-30T00:22:39.411Z",
  "createdAt": "2024-03-30T00:22:39.411Z"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_400 - Bad Request_

```json
{
  "message": [
    "Cuisine name is required",
    "Description is required",
    "Price is required",
    "Image Url is required",
    "CategoryId is required"
    ]
}
Or
{
    "message": [
        "Minimum price is 20000",
        "Must be URL format"
    ]
}
```

## POST /Categories

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
    "name": string,
}
```

### Response

_201 - Created_

```json
{
  "id": 4,
  "name": "Drinks",
  "updatedAt": "2024-03-30T00:35:28.227Z",
  "createdAt": "2024-03-30T00:35:28.227Z"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_400 - Bad Request_

```json
{
  "message": ["Category is required"]
}
```

## PUT /Cuisines/:id

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
    "id": integer,
    "name": string,
    "description": string,
    "price": integer,
    "imgUrl": string,
    "categoryId": integer,
}
```

### Response

_200 - Ok_

```json
{
  "id": 40,
  "name": "tuna mayo sashimi5",
  "description": "Hot",
  "price": "35000",
  "imgUrl": "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
  "categoryId": "1",
  "authorId": 3,
  "createdAt": "2024-03-30T00:22:39.411Z",
  "updatedAt": "2024-03-30T01:06:45.277Z"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_400 - Bad Request_

```json
{
  "message": [
    "Cuisine name is required",
    "Description is required",
    "Price is required",
    "Image Url is required",
    "CategoryId is required"
    ]
}
Or
{
    "message": [
        "Minimum price is 20000",
        "Must be URL format"
    ]
}
```

_404 - Not Found_

```json
{
  "message": "Error not found"
}
```

_403 - Forbidden_

```json
{
  "message": "Forbidden error authorization"
}
```

## PUT /Categories/:id

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
    "name": string,
}
```

### Response

_200 - Ok_

```json
{
  "id": 2,
  "name": "tempura",
  "createdAt": "2024-03-29T07:17:06.030Z",
  "updatedAt": "2024-03-30T01:21:58.271Z"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_400 - Bad Request_

```json
{
  "message": ["Category is required"]
}
```

_404 - Not Found_

```json
{
  "message": "Error not found"
}
```

_403 - Forbidden_

```json
{
  "message": "Forbidden error authorization"
}
```

## PATCH /Cuisines/:id/coverUrl

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
    "avatar": file
}
```

### Response

_200 - Ok_

```json
{
  "message": "Image sushi succes to update"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_400 - Bad Request_

```json
{
  "message": ["file is required"]
}
```

_404 - Not Found_

```json
{
  "message": "Error not found"
}
```

_403 - Forbidden_

```json
{
  "message": "Forbidden error authorization"
}
```

## DELETE /Cuisines/:id

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "message": "tuna mayo sashimi6 success to delete"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_404 - Not Found_

```json
{
  "message": "Error not found"
}
```

_403 - Forbidden_

```json
{
  "message": "Forbidden error authorization"
}
```

## DELETE /Categories/:id

### Request

- Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "message": "tempura success to delete"
}
```

_401 - Unauthorized_

```json
{
  "message": "Error Authentication"
}
```

_404 - Not Found_

```json
{
  "message": "Error not found"
}
```

_403 - Forbidden_

```json
{
  "message": "Forbidden error authorization"
}
```

## Global Error

_500 - Internal Server Error_

```json
{
  "message": "Internal Server Error"
}
```
