# PLC Connection Simulator

A web-based PLC connection simulator built with React, TypeScript, and Supabase.

The application simulates a PLC device at the IP address `192.168.1.166`. Users can attempt connections, view the simulated connection status, and store connection attempts in a database.

**Note:** This is a simulation. It does not establish a real network connection to a physical PLC.

## Features

- React and TypeScript user interface.
- Simulated PLC at `192.168.1.166`.
- Successful connection when the specified IP is entered.
- Unreachable status for other valid IPv4 addresses.
- Input validation for invalid IP addresses.
- Connection history stored in Supabase.
- Connection history remains available after refreshing the application.

## Requirements

Before running the project, install:

- [Node.js](https://nodejs.org/) — use a version supported by Vite 8.
- [pnpm](https://pnpm.io/installation).
- A Supabase project.

## Installation

### 1. Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/Zeyneb00/plc_connection_simulation
```

Navigate into the project directory:

```bash
cd plc_con_sim
```

### 2. Install dependencies

```bash
pnpm install
```

This installs the dependencies defined in `package.json` and `pnpm-lock.yaml`.

### 3. Configure Supabase

Create a `.env.local` file in the project root.

Add your Supabase project credentials:

```dotenv
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Replace the example values with your own Supabase Project URL and Publishable Key.

**Important:** Never put your Supabase secret key or service-role key in frontend environment variables.

### 4. Set up the database

In your Supabase dashboard, open the SQL Editor and create the `connection_logs` table.

Run the SQL schema and Row Level Security policies provided in this repository's project setup instructions.

The application requires permission to insert and read connection history records.

### 5. Start the application

Run:

```bash
pnpm dev
```

Vite will start the development server.

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

## How to Use

1. Enter a PLC IP address.
2. Click **Connect to PLC**.
3. Observe the simulated connection result.
4. View the connection attempt in the Connection History section.

### Simulation behavior

| Entered IP | Expected result |
|---|---|
| `192.168.1.166` | Connected |
| `192.168.1.100` | Device unreachable |
| `hello` | Invalid IP address |

Only `192.168.1.166` is configured as reachable in this simulation.

## Project Structure

```text
src/
├── components/
│   ├── ConnectionPanel.tsx
│   └── ConnectionHistory.tsx
├── lib/
│   └── supabase.ts
├── logic/
│   └── connection.ts
├── services/
│   └── connectionLog.ts
├── types/
│   └── connection.ts
├── App.tsx
└── main.tsx
```

### Architecture

- **components:** React user interface components.
- **logic:** PLC simulation and connection validation.
- **services:** Database operations and connection history.
- **lib:** Supabase client configuration.
- **types:** TypeScript data type definitions.

## Technologies

- React
- TypeScript
- Vite
- Supabase
- PostgreSQL
- pnpm

## Limitations

This project simulates PLC connectivity using a predefined IP address. It does not perform actual network communication, PLC discovery, or industrial protocol operations such as Modbus TCP or Siemens S7.

Database access is configured for a development demonstration. Production deployment requires appropriate authentication and restrictive Row Level Security policies.
