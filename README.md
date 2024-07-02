# Transaction Validator Server

This server validates transaction hashes by scraping transaction details from TaikoScan using Playwright and Express.js.

## Setup

### Prerequisites

- Node.js (version >= 14)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chimmykk/txnvalidator.git
   cd txnvalidator
  
2. Run the code
  ``` bash
  node validator.js
  ```
#### Example

**Request:**

```http
GET /validatetxn/your_transaction_hash_here


