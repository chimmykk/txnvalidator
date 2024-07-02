# Rust API for Taiko Transaction Validation

This project uses Actix Web to provide an API endpoint that validates Taiko transaction hashes. It queries Taikoscan API for transaction status based on provided hashes. 

## Setup and Usage

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/chimmykk/txnvalidator
cd txnvalidator
cargo build --release
cargo run
