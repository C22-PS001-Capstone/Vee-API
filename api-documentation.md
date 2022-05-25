# API DOCUMENTATION

#### v1.0.0

| No  | Endpoint                 | Body Request              | Responses                                         | Function                    |
|:---:|:-------------------------|:--------------------------|:--------------------------------------------------|:----------------------------|
|  1  | POST /users              | - firstname: string       | status code: 201                                  | Sign up                     |
|     |                          | - lastname: string        | body:                                             |                             |
|     |                          | - email: string           |   - status: “success”                             |                             |
|     |                          | - password: string        |   - message: “User berhasil ditambahkan”          |                             |
|     |                          | - passwordConfirm: string |   - data:                                         |                             |
|     |                          |                           |       - userId: “userId”                          |                             |
|  2  | GET /users/{id}          | token                     | status code: 200                                  | Dapatkan detail akun        |
|     |                          |                           | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: any                                  |                             |
|     |                          |                           |   - data:                                         |                             |
|     |                          |                           |       - user: “user”                              |                             |
|  3  | POST /authentications    | - email: string           | status code: 201                                  | Login                       |
|     |                          | - password: string        | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: “Authentication berhasil ditambahkan”|                             |
|     |                          |                           |   - data:                                         |                             |
|     |                          |                           |       - accessToken: “token”                      |                             |
|     |                          |                           |       - refreshToken: “token”                     |                             |
|  4  | PUT /authentications     | - refreshToken: string    | status code: 200                                  | Update access token         |
|     |                          |                           | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: “Access Token berhasil diperbarui”   |                             |
|     |                          |                           |   - data:                                         |                             |
|     |                          |                           |       - accessToken: “token”                      |                             |
|  5  | DELETE /authentications  | - refreshToken: string    | status code: 200                                  | Logout                      |
|     |                          |                           | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: “Refresh Token berhasil dihapus”     |                             |
|     |                          |                           |   - data: []                                      |                             |
|  6  | POST /activities         | token                     | status code: 201                                  | Input aktivitas             |
|     |                          | - date: timestamp         | body:                                             |                             |
|     |                          | - lat: optional           |   - status: “success”                             |                             |
|     |                          | - lon: optional           |   - message:  “Catatan berhasil ditambahkan”      |                             |
|     |                          | - km: integer             |   - data:                                         |                             |
|     |                          | - price: integer          |       - actId: “actId”                            |                             |
|     |                          | - liter: float            |                                                   |                             |
|  7  | GET /activities?size&page| token                     | status code: 200                                  | Mendapatkan list aktivitas  |
|     |                          |                           | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: any                                  |                             |
|     |                          |                           |   - data:                                         |                             |
|     |                          |                           |       - activities: activites[]                   |                             |
|  6  | PUT /activities          | token                     | status code: 200                                  | Mengedit aktivitas          |
|     |                          | - date: timestamp         | body:                                             |                             |
|     |                          | - lat: optional           |   - status: “success”                             |                             |
|     |                          | - lon: optional           |   - message:  “Activities berhasil diperbarui”    |                             |
|     |                          | - km: integer             |   - data: []                                      |                             |
|     |                          | - price: integer          |                                                   |                             |
|     |                          | - liter: float            |                                                   |                             |
|  9  | DELETE /activites/{id}   | token                     | status code: 200                                  | Menghapus aktivitas         |
|     |                          |                           | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: “Activities berhasil dihapus”        |                             |
|     |                          |                           |   - data: []                                      |                             |
| 10  | GET /activities/{id}     | token                     | status code: 200                                  | Mendapatkan detail aktivitas|
|     |                          |                           | body:                                             |                             |
|     |                          |                           |   - status: “success”                             |                             |
|     |                          |                           |   - message: any                                  |                             |
|     |                          |                           |   - data:                                         |                             |
|     |                          |                           |       - act: "act"                                |                             |
