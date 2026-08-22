import { POST } from "@/app/api/chat/route";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const savedEnv = process.env;

describe("POST /api/chat", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...savedEnv, CHAT_API_URL: "https://test-api.example.com" };
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ response: "Hello there!" }),
    });
  });

  afterEach(() => {
    process.env = savedEnv;
  });

  it("forwards message to external API and returns its response", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "what are your skills?" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    const data = await res.json();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://test-api.example.com/api/chat",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ message: "what are your skills?" }),
      }),
    );
    expect(res.status).toBe(200);
    expect(data).toEqual({ response: "Hello there!" });
  });

  it("returns 422 when message is empty string", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(422);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns 422 when message exceeds 500 chars", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "x".repeat(501) }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(422);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns 503 when CHAT_API_URL is not set", async () => {
    delete process.env.CHAT_API_URL;

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "hello" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(503);
  });

  it("returns 504 on upstream timeout", async () => {
    const timeoutError = Object.assign(new Error("The operation was aborted"), {
      name: "TimeoutError",
    });
    mockFetch.mockRejectedValueOnce(timeoutError);

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "hello" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(504);
  });

  it("returns 502 on network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("ECONNREFUSED"));

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "hello" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(502);
  });
});
