# Kalshi Integration

## Overview

Kalshi is a regulated prediction market exchange based in the United States. As a CFTC-regulated exchange, it provides a legal framework for trading on event contracts. This document provides guidance on integrating with Kalshi and maintaining up-to-date documentation.

## What is Kalshi?

Kalshi is the first federally regulated exchange dedicated to event contracts in the United States. It allows users to trade on the outcomes of events across categories like economics, politics, weather, and more. Unlike decentralized alternatives, Kalshi operates under U.S. regulatory oversight.

## Official Documentation

### Where to Pull Documentation

- **Official Docs**: [https://kalshi.com/docs](https://kalshi.com/docs)
- **API Documentation**: [https://trading-api.readme.io/reference](https://trading-api.readme.io/reference)
- **Developer Portal**: [https://kalshi.com/developers](https://kalshi.com/developers)
- **API Swagger/OpenAPI**: Available through their developer portal

### API Endpoints

The Kalshi API provides access to:
- Market listings and details
- Order management
- Portfolio and position data
- Historical market data
- Exchange status

### Key Concepts

1. **Event Contracts**: Binary contracts that settle based on real-world event outcomes
2. **Markets**: Structured as YES/NO propositions with defined settlement criteria
3. **Order Types**: Limit orders, market orders with various time-in-force options
4. **Settlement**: Contracts settle at $1 (YES) or $0 (NO) based on outcome

## Integration Guidelines

### Authentication

Kalshi uses API keys and requires proper authentication:

```typescript
// Use environment variables for API credentials
const KALSHI_API_KEY = process.env.KALSHI_API_KEY
const KALSHI_PRIVATE_KEY = process.env.KALSHI_PRIVATE_KEY
```

### API Environments

Kalshi provides different environments:
- **Production**: Live trading environment
- **Demo**: Paper trading environment for testing

Always test integrations in the demo environment first.

### Rate Limits

Respect Kalshi's API rate limits:
- Monitor response headers for rate limit information
- Implement proper retry logic with backoff
- Use WebSocket connections for real-time data where available

### Data Fetching

When fetching market data:
- Use efficient pagination for large datasets
- Cache static data appropriately
- Subscribe to WebSocket feeds for real-time updates

## Keeping Documentation Updated

When making changes to Kalshi integration:

1. **Update this document** with any new endpoints or features used
2. **Document API version changes** and migration notes
3. **Add examples** for new integration patterns
4. **Record regulatory considerations** that may affect usage

## Regulatory Considerations

As a CFTC-regulated exchange, Kalshi has specific requirements:
- User verification (KYC) requirements
- Geographic restrictions (US users primarily)
- Position limits and trading rules

Ensure compliance with all applicable regulations when integrating.

## Resources

- [Kalshi Blog](https://kalshi.com/blog)
- [Kalshi Help Center](https://help.kalshi.com)
- [Kalshi Twitter](https://twitter.com/Kalshi)
- [Kalshi API Changelog](https://trading-api.readme.io/changelog)
