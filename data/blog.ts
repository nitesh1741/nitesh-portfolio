import type { BlogPost } from "@/types/portfolio";

export const blogPosts: BlogPost[] = [
  {
    slug: "redis-caching-dotnet-microservices",
    title: "How Redis Caching Reduces Database Load in .NET Microservices",
    description:
      "A practical guide to using Redis and in-memory caching in .NET microservices to reduce database load, improve API latency, and protect production systems.",
    date: "2026-06-17",
    keywords: [".NET microservices", "Redis caching", "database optimization", "backend engineering"],
    sections: [
      {
        heading: "Start with the read path",
        body:
          "The highest-impact caching work usually starts with static or slow-changing data that appears across many requests. In a .NET microservice, Redis works well as a shared cache while in-memory caching can protect hot paths inside each running instance.",
      },
      {
        heading: "Design cache invalidation before rollout",
        body:
          "Caching improves latency only when stale data is controlled. Versioned keys, short TTLs for volatile data, and explicit invalidation for administrative updates keep the cache predictable under production traffic.",
      },
      {
        heading: "Measure database pressure, not only response time",
        body:
          "Good caching reduces query volume, connection pressure, and repeated serialization work. Track cache hit rate, database CPU, query count, and API latency together so the optimization is visible end to end.",
      },
    ],
  },
  {
    slug: "idempotent-kafka-consumers-azure",
    title: "Designing Idempotent Kafka Consumers for Reliable Azure Workflows",
    description:
      "How to build fault-tolerant Kafka consumers with idempotency, dead-letter routing, retries, and observability for distributed backend systems.",
    date: "2026-06-17",
    keywords: ["Kafka consumers", "Azure Service Bus", "event-driven architecture", "distributed systems"],
    sections: [
      {
        heading: "Assume every event can arrive twice",
        body:
          "Reliable event-driven systems treat duplicate delivery as normal. Idempotency keys, durable processing records, and safe state transitions prevent duplicate side effects when retries or rebalances happen.",
      },
      {
        heading: "Separate retryable and terminal failures",
        body:
          "Transient network errors should follow a bounded retry policy. Invalid payloads, missing business entities, or repeated processing failures should move into a dead-letter path with enough context for debugging.",
      },
      {
        heading: "Make observability part of the contract",
        body:
          "Consumer lag, processing duration, retry count, dead-letter volume, and correlation IDs help teams understand whether the pipeline is healthy before users feel the failure.",
      },
    ],
  },
  {
    slug: "langchain-agentic-ai-app-builder",
    title: "Building an Agentic AI App Builder with LangChain and Multi-Agent LLMs",
    description:
      "A technical overview of building an Agentic AI app builder with planner, architect, and coder agents using Python, LangChain, RAG, and structured handoffs.",
    date: "2026-06-17",
    keywords: ["Agentic AI", "LangChain", "RAG", "multi-agent LLM", "AI software engineering"],
    sections: [
      {
        heading: "Give every agent a narrow responsibility",
        body:
          "Multi-agent systems become easier to validate when each agent owns a specific job. A planner clarifies the goal, an architect designs the system boundary, and a coder turns the plan into implementation steps.",
      },
      {
        heading: "Use structured handoffs",
        body:
          "Free-form messages make agent workflows hard to debug. Typed outputs, acceptance criteria, and explicit assumptions make it easier to inspect and correct the work between steps.",
      },
      {
        heading: "Treat RAG as context control",
        body:
          "Retrieval should provide relevant constraints, examples, and documentation. The goal is not more context; it is better evidence at the exact moment the agent needs it.",
      },
    ],
  },
  {
    slug: "azure-application-insights-observability",
    title: "Application Insights Observability for Production .NET APIs",
    description:
      "A concise guide to instrumenting .NET APIs with Azure Application Insights, correlation IDs, dependency tracking, and incident-focused telemetry.",
    date: "2026-06-17",
    keywords: ["Azure Application Insights", ".NET API observability", "production monitoring", "backend reliability"],
    sections: [
      {
        heading: "Start with request and dependency telemetry",
        body:
          "Request traces show user-facing behavior while dependency telemetry exposes database, cache, and service-call latency. Together they make slow paths easier to isolate.",
      },
      {
        heading: "Carry correlation IDs across service boundaries",
        body:
          "Distributed systems need a shared identifier for each workflow. Correlation IDs make it possible to connect frontend calls, API requests, queue messages, and downstream service logs.",
      },
      {
        heading: "Build alerts around user impact",
        body:
          "Useful alerts focus on error rate, latency, saturation, and failed business workflows. Raw log volume is rarely enough to detect incidents early.",
      },
    ],
  },
];
