import { agent } from "supertest";
import { expect } from "chai";
import app from "../src/index";

describe("Index Test", () => {
  it("should check service status on / route", async function () {
    const res = await agent(app).get("/").send();
    expect(res.text).to.include("API is Ready");
  });

  it("should parse data posted to POST /api/v1/parse", async function () {
    const res = await agent(app).post("/api/v1/parse").send({
      data: "JOHN0000MICHAEL0009994567",
    });
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an("object");
    expect(res.body.data.firstName).to.eq("JOHN0000");
    expect(res.body.data.lastName).to.eq("MICHAEL000");
    expect(res.body.data.clientId).to.eq("9994567");
  });

  it("should parse and check empty data posted to POST /api/v1/parse", async function () {
    const res = await agent(app).post("/api/v1/parse").send({
      data: "",
    });
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an("object");
    expect(res.body.data.firstName).to.eq("");
    expect(res.body.data.lastName).to.eq("");
    expect(res.body.data.clientId).to.eq("");
  });

  it("should parse data posted to POST /api/v2/parse", async function () {
    const res = await agent(app).post("/api/v2/parse").send({
      data: "JOHN0000MICHAEL0009994567",
    });
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an("object");
    expect(res.body.data.firstName).to.eq("JOHN");
    expect(res.body.data.lastName).to.eq("MICHAEL");
    expect(res.body.data.clientId).to.eq("9994-4567");
  });
});
