/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from "@testing-library/react";
import { useTerminalChat } from "@/hooks/use-terminal-chat";

// ─── Mock window.matchMedia (prefers-reduced-motion: reduce) ──────────────────
// Enables reduced-motion mode so all typewriter animations resolve instantly,
// removing character-delay timers from the test surface.

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// ─── Mock global.fetch ────────────────────────────────────────────────────────

const mockFetch = jest.fn();
global.fetch = mockFetch;

// ─── Stub crypto.randomUUID ───────────────────────────────────────────────────

let uuidCounter = 0;
Object.defineProperty(global, "crypto", {
  value: { randomUUID: () => `uuid-${++uuidCounter}` },
  configurable: true,
  writable: true,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Advance all pending fake timers (and flush the resulting Promises) so the
 * boot sequence completes before sendMessage tests run.
 */
const completeBoot = async () => {
  await act(async () => {
    await jest.runAllTimersAsync();
  });
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useTerminalChat", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    uuidCounter = 0;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ response: "Hello!" }),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  // ── 1. Boot sequence ────────────────────────────────────────────────────────
  it("boot sequence: messages contain user 'whoami' and assistant response after timers fire", async () => {
    const { result } = renderHook(() => useTerminalChat());

    // Advance through all boot delays: 400 ms initial + 300 ms pause.
    // Reduced motion skips the 30 ms/char and 120 ms/line timeouts.
    await completeBoot();

    expect(
      result.current.messages.some(
        (m) => m.role === "user" && m.text === "whoami",
      ),
    ).toBe(true);

    expect(
      result.current.messages.some(
        (m) =>
          m.role === "assistant" && m.text.includes("Nitesh Kumar Mehta"),
      ),
    ).toBe(true);
  });

  // ── 2. sendMessage pushes user message ──────────────────────────────────────
  it("sendMessage: pushes user message to messages array", async () => {
    const { result } = renderHook(() => useTerminalChat());
    // Boot must finish before sendMessage so the boot reset doesn't clobber
    // the user message added by sendMessage.
    await completeBoot();

    await act(async () => {
      result.current.sendMessage("hello");
      await jest.runAllTimersAsync();
    });

    expect(
      result.current.messages.some(
        (m) => m.role === "user" && m.text === "hello",
      ),
    ).toBe(true);
  });

  // ── 3. isLoading true during fetch, false after ──────────────────────────────
  it("sendMessage: sets isLoading true during fetch, false after", async () => {
    const { result } = renderHook(() => useTerminalChat());
    await completeBoot();

    // Hold the fetch open so we can verify isLoading while in-flight.
    let resolveFetch!: (v: unknown) => void;
    mockFetch.mockReturnValueOnce(
      new Promise((r) => {
        resolveFetch = r;
      }),
    );

    // sendMessage sets isLoading synchronously before awaiting fetch.
    act(() => {
      result.current.sendMessage("hello");
    });

    expect(result.current.isLoading).toBe(true);

    // Resolve the pending fetch and drain all async work.
    await act(async () => {
      resolveFetch({
        ok: true,
        status: 200,
        json: async () => ({ response: "done" }),
      });
      await jest.runAllTimersAsync();
    });

    expect(result.current.isLoading).toBe(false);
  });

  // ── 4. On success, appends assistant message with response text ──────────────
  it("sendMessage: on fetch success, appends assistant message with response text", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ response: "Skill list here" }),
    });

    const { result } = renderHook(() => useTerminalChat());
    await completeBoot();

    await act(async () => {
      result.current.sendMessage("skills");
      await jest.runAllTimersAsync();
    });

    expect(
      result.current.messages.some(
        (m) => m.role === "assistant" && m.text.includes("Skill list here"),
      ),
    ).toBe(true);
  });

  // ── 5. On network error, appends error message with correct text ─────────────
  it("sendMessage: on network error, appends error message with correct text", async () => {
    mockFetch.mockRejectedValueOnce(new Error("ECONNREFUSED"));

    const { result } = renderHook(() => useTerminalChat());
    await completeBoot();

    await act(async () => {
      result.current.sendMessage("hello");
      await jest.runAllTimersAsync();
    });

    expect(
      result.current.messages.some(
        (m) =>
          m.role === "error" &&
          m.text === "[system error: could not connect. try again.]",
      ),
    ).toBe(true);
  });

  // ── 6. On AbortError/timeout, appends timeout error message ─────────────────
  it("sendMessage: on timeout error (AbortError), appends timeout error message", async () => {
    const abortError = Object.assign(new Error("The operation was aborted"), {
      name: "AbortError",
    });
    mockFetch.mockRejectedValueOnce(abortError);

    const { result } = renderHook(() => useTerminalChat());
    await completeBoot();

    await act(async () => {
      result.current.sendMessage("hello");
      await jest.runAllTimersAsync();
    });

    expect(
      result.current.messages.some(
        (m) =>
          m.role === "error" && m.text === "[timeout: no response received]",
      ),
    ).toBe(true);
  });

  // ── 7. setInput updates the input value ─────────────────────────────────────
  it("input state: setInput updates the input value", () => {
    const { result } = renderHook(() => useTerminalChat());

    act(() => {
      result.current.setInput("new value");
    });

    expect(result.current.input).toBe("new value");
  });

  // ── 8. sendMessage with no arg uses current input value ──────────────────────
  it("sendMessage with no arg uses current input value", async () => {
    const { result } = renderHook(() => useTerminalChat());
    await completeBoot();

    act(() => {
      result.current.setInput("typed text");
    });

    await act(async () => {
      result.current.sendMessage();
      await jest.runAllTimersAsync();
    });

    expect(
      result.current.messages.some(
        (m) => m.role === "user" && m.text === "typed text",
      ),
    ).toBe(true);
  });

  // ── 9. Max messages: only last 20 are kept ───────────────────────────────────
  it("max messages: when >20 messages exist, only last 20 are kept", async () => {
    const { result } = renderHook(() => useTerminalChat());
    // Start with boot messages (2): future sends grow from here.
    await completeBoot();

    // 12 sends × 2 messages each = 24 additions → must stay capped at 20.
    for (let i = 0; i < 12; i++) {
      await act(async () => {
        result.current.sendMessage(`message ${i}`);
        await jest.runAllTimersAsync();
      });
    }

    expect(result.current.messages.length).toBeLessThanOrEqual(20);
  });
});
