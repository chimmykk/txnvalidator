# Rust API for Ethereum Transaction Validation

This project uses Actix Web to provide an API endpoint that validates Ethereum transaction hashes. It queries Taikoscan API for transaction status based on provided hashes. 

## Setup and Usage

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/chimmykk/txnvalidator
cd txnvalidator
cargo build --release
cargo run
