const request = require("supertest");
const app = require("../app");
const { User, Cuisine, Category } = require("../models");

beforeAll(async () => {
  try {
    const users = require("../data/admin.json");
    const cuisines = require("../data/cuisine.json");
    const categories = require("../data/category.json");

    await User.bulkCreate(users, { individualHooks: true });
    await Category.bulkCreate(categories);
    await Cuisine.bulkCreate(cuisines);
  } catch (error) {
    console.log(error);
  }
});

let token;
let invalid_token = "asdasdasdasdasd";

/*
 [ ] Login (Admin), perlu melakukan pengecekan pada status dan response ketika:

  - [ ] Email tidak diberikan / tidak diinput
  - [ ] Password tidak diberikan / tidak diinput
  - [ ] Email diberikan invalid / tidak terdaftar
  - [ ] Password diberikan salah / tidak match
  , expect.any(string)
  /login

*/

describe("POST /login", () => {
  test("Succes post /login", async () => {
    let staff = {
      username: "Staff1",
      password: "12341234",
    };
    const response = await request(app).post("/login").send(staff);
    const { body, status } = response;
    token = body.acces_token;
    console.log(token, "<<< ini token");
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("acces_token", expect.any(String));
  });

  test("failed post /login no email ", async () => {
    const dataToInsert = {
      password: "12341234",
    };
    const response = await request(app).post("/login").send(dataToInsert);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Username/ email/ passwword cannot be empty");
  });

  test("failed post /login no password", async () => {
    const dataToInsert = {
      username: "Admin1",
    };
    const response = await request(app).post("/login").send(dataToInsert);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Username/ email/ passwword cannot be empty");
  });

  test("failed post /login wrong email", async () => {
    const dataToInsert = {
      email: "admin@KKitchen.com",
      password: "12341234",
    };
    const response = await request(app).post("/login").send(dataToInsert);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error login user not found / password not matched");
  });

  test("failed post /login wrong password", async () => {
    const dataToInsert = {
      email: "admin1@KKitchen.com",
      password: "123412345",
    };

    const response = await request(app).post("/login").send(dataToInsert);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error login user not found / password not matched");
  });
});
/*
- [ ] Create, perlu melakukan pengecekan pada status dan response ketika:

  - [ ] Berhasil membuat entitas utama
  - [ ] Gagal menjalankan fitur karena belum login
  - [ ] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [ ] Gagal ketika request body tidak sesuai (validation required)

  /cuisines
*/
describe("POST /cuisines", () => {
  test("Succes post /cuisines", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/cuisines")
      .send(dataToInsert)
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", 36);
    expect(body).toHaveProperty("name", "tuna mayo sasimi");
    expect(body).toHaveProperty("description", "fresh tuna sasimi with mayonaisu");
    expect(body).toHaveProperty("price", 30000);
    expect(body).toHaveProperty("imgUrl", expect.any(String));
    expect(body).toHaveProperty("categoryId", 1);
    expect(body).toHaveProperty("authorId", 3);
  });

  test("failed post /cuisines not login", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app).post("/cuisines").send(dataToInsert);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("failed post /cuisines invalid token", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app).post("/cuisines").send(dataToInsert).set("Authorization", invalid_token);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("failed post /login eror from validation", async () => {
    const dataToInsert = {
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/cuisines")
      .send(dataToInsert)
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", expect.any(Array));
    expect(body.message[0]).toBe("Cuisine name is required");
  });
});

/*

 [ ] Update PUT, perlu melakukan pengecekan pada status dan response ketika:

  - [ ] Berhasil mengupdate data Entitas Utama berdasarkan params id yang diberikan
  - [ ] Gagal menjalankan fitur karena belum login
  - [ ] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [ ] Gagal karena id entity yang dikirim tidak terdapat di database
  - [ ] Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya
  - [ ] Gagal ketika request body yang diberikan tidak sesuai

  /cuisines/:id
*/

describe("PUT /cuisines", () => {
  test("Succes put /cuisines", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi2",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app)
      .put("/cuisines/36")
      .send(dataToInsert)
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", 36);
    expect(body).toHaveProperty("name", "tuna mayo sasimi2");
    expect(body).toHaveProperty("description", "fresh tuna sasimi with mayonaisu");
    expect(body).toHaveProperty("price", 30000);
    expect(body).toHaveProperty("imgUrl", expect.any(String));
    expect(body).toHaveProperty("categoryId", 1);
    expect(body).toHaveProperty("authorId", 3);
  });

  test("failed put /cuisines not login", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi2",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app).put("/cuisines/36").send(dataToInsert);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("failed put /cuisines invalid token", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi2",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app).put("/cuisines/36").send(dataToInsert).set("Authorization", invalid_token);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("failed put /cuisines id notfound", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi2",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app)
      .put("/cuisines/37")
      .send(dataToInsert)
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(404);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error not found");
  });

  test("failed put /cuisines wrong role", async () => {
    const dataToInsert = {
      name: "tuna mayo sasimi2",
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app)
      .put("/cuisines/35")
      .send(dataToInsert)
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(403);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Forbidden error authorization");
  });

  test("failed put /cuisines eror from validation", async () => {
    const dataToInsert = {
      name: null,
      description: "fresh tuna sasimi with mayonaisu",
      price: 30000,
      imgUrl:
        "https://img.freepik.com/free-photo/freshly-cooked-ramen-noodles-with-pork-vegetables-generative-ai_188544-12759.jpg?t=st=1711444460~exp=1711448060~hmac=c48e91edbc16edf54e1f12b52594399c5473ca5c16568095fc3a10a604bc9d1b&w=996",
      categoryId: 1,
    };
    const response = await request(app)
      .put("/cuisines/36")
      .send(dataToInsert)
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", expect.any(Array));
    expect(body.message[0]).toBe("Cuisine name is required");
  });
});

/*
- [ ] Delete, perlu melakukan pengecekan pada status dan response ketika:

  - [ ] Berhasil menghapus data Entitas Utama berdasarkan params id yang diberikan
  - [ ] Gagal menjalankan fitur karena belum login
  - [ ] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [ ] Gagal karena id entity yang dikirim tidak terdapat di database
  - [ ] Gagal menjalankan fitur ketika Staff menghapus entity yang bukan miliknya
   /cuisines/:id
  */

describe("DEL /cuisines", () => {
  test("Succes delete /cuisines", async () => {
    const response = await request(app)
      .delete("/cuisines/36")
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "tuna mayo sasimi2 success to delete");
  });

  test("failed delete /cuisines not login", async () => {
    const response = await request(app).delete("/cuisines/36");
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("failed delete /cuisines invalid token", async () => {
    const response = await request(app).delete("/cuisines/36").set("Authorization", invalid_token);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("failed delete /cuisines id notfound", async () => {
    const response = await request(app)
      .delete("/cuisines/39")
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(404);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error not found");
  });

  test("failed delete /cuisines wrong role", async () => {
    const response = await request(app)
      .delete("/cuisines/35")
      .set("Authorization", "Bearer " + token);
    const { body, status } = response;
    expect(status).toBe(403);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Forbidden error authorization");
  });
});

/*
- [ ] Endpoint List pada public site, perlu melakukan pengecekan pada status dan response ketika:

  - [ ] Berhasil mendapatkan Entitas Utama tanpa menggunakan query filter parameter
  - [ ] Berhasil mendapatkan Entitas Utama dengan 1 query filter parameter
  - [ ] Berhasil mendapatkan Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu (cek pagination-nya)
  - Pastikan untuk testing ini sediakan dulu sekitar 20 data untuk diinput di beforeAll, sehingga kita bisa melakukan ekspektasi pada data dan jumlahnya yang kita dapat ketika filter dan pagination

  /cuisines
*/

describe("GET /pub/cuisine", () => {
  test("Succes GET  /pub/cuisines without filter", async () => {
    const response = await request(app).get("/pub/cuisines?sort=-&page");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("page", 1);
    expect(body).toHaveProperty("data", expect.any(Array));
    expect(body.data[0]).toHaveProperty("id", 1);
    expect(body.data[0]).toHaveProperty("name", "tuna sashimi");
    expect(body.data[0]).toHaveProperty("description", "mackerel sashimi");
    expect(body.data[0]).toHaveProperty("price", 34263);
    expect(body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(body.data[0]).toHaveProperty("categoryId", 1);
    expect(body.data[0]).toHaveProperty("authorId", 1);
    expect(body).toHaveProperty("totalData", 35);
    expect(body).toHaveProperty("totalPage", 4);
    expect(body).toHaveProperty("dataPerPage", 10);
  });

  test("Succes GET  /pub/cuisines with filter", async () => {
    const response = await request(app).get("/pub/cuisines?sort=-&search=&filter=1&page");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("page", 1);
    expect(body).toHaveProperty("data", expect.any(Array));
    expect(body.data[0]).toHaveProperty("id", 1);
    expect(body.data[0]).toHaveProperty("name", "tuna sashimi");
    expect(body.data[0]).toHaveProperty("description", "mackerel sashimi");
    expect(body.data[0]).toHaveProperty("price", 34263);
    expect(body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(body.data[0]).toHaveProperty("categoryId", 1);
    expect(body.data[0]).toHaveProperty("authorId", 1);
    expect(body).toHaveProperty("totalData", 10);
    expect(body).toHaveProperty("totalPage", 1);
    expect(body).toHaveProperty("dataPerPage", 10);
  });

  test("Succes GET  /pub/cuisines with filter 1 and page 1", async () => {
    const response = await request(app).get("/pub/cuisines?sort=-&search=&filter=1&page=1");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("page", 1);
    expect(body).toHaveProperty("data", expect.any(Array));
    expect(body.data[0]).toHaveProperty("id", 1);
    expect(body.data[0]).toHaveProperty("name", "tuna sashimi");
    expect(body.data[0]).toHaveProperty("description", "mackerel sashimi");
    expect(body.data[0]).toHaveProperty("price", 34263);
    expect(body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(body.data[0]).toHaveProperty("categoryId", 1);
    expect(body.data[0]).toHaveProperty("authorId", 1);
    expect(body).toHaveProperty("totalData", 10);
    expect(body).toHaveProperty("totalPage", 1);
    expect(body).toHaveProperty("dataPerPage", 10);
  });
});

/*
- [ ] Endpoint Detail pada public site, perlu melakukan pengecekan pada status dan response ketika:
  - [ ] Berhasil mendapatkan 1 Entitas Utama sesuai dengan params id yang diberikan
  - [ ] Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid

http://localhost:3000/pub/cuisines?sort=-&search=&filter=1&page=1
*/

describe("GET /pub/cuisines", () => {
  test("Succes get /pub/cuisines", async () => {
    const response = await request(app).get("/pub/cuisines/32");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", 32);
    expect(body).toHaveProperty("name", "seared salmon");
    expect(body).toHaveProperty("description", "snapper");
    expect(body).toHaveProperty("price", 42159);
    expect(body).toHaveProperty("imgUrl", expect.any(String));
    expect(body).toHaveProperty("categoryId", 3);
    expect(body).toHaveProperty("authorId", 1);
  });

  test("failed get /pub/cuisines", async () => {
    const response = await request(app).get("/pub/cuisines/38");
    const { body, status } = response;
    expect(status).toBe(404);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error not found");
  });
});

// Clean Up Database
afterAll(async () => {
  Cuisine.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  Category.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
