import request from "supertest";
import app from "./index.js";

it("GET /test/mirror", function (done) {
  request(app)
    .get("/test/mirror")
    .expect("Content-Type", "text/plain; charset=UTF-8")
    .expect(200, done);
});

it("GET /test.txt", function (done) {
  request(app)
    .get("/test.txt")
    .expect("Content-Type", "text/plain; charset=UTF-8")
    .expect(200, done)
    .expect((res) => {
      res.body = "Hello World!";
    });
});

it("GET /invalid.html", function (done) {
  request(app).get("/invalid.html").expect(404, done);
});
