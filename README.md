# Termbridge

Manage terminall access to all your homelab devices from a single web interface.

## Requirements

You'll need a Postgres instance running to store terminal credentials. You can use a compose file to run both Termbridge and Postgres.


## Usage

### Docker Run

```bash
docker run -d \
  -p 3000:3000 \
  --name termbridge \
  -e PG_HOST=you-postgres-db-host \
  -e PG_PORT=5432 \
  -e PG_USER=PG_USER \
  -e PG_PASS=PG_PASS \
  ghcr.io/sidhantpanda/termbridge:latest
```

### Docker Compose

```yaml
services:
  termbridge:
    container_name: termbridge
    image: sidhantpanda/termbridge
    restart: unless-stopped
    environment:
      - PG_HOST=postgres
      - PG_PORT=5432
      - PG_USER=${PG_USER}
      - PG_PASS=${PG_PASS}
      - PG_DB=${PG_DB}
    ports:
      - 3000:3000
  postgres:
    container_name: postgres
    image: postgres:17
    restart: unless-stopped
    environment:
      - POSTGRES_USER=${PG_USER}
      - POSTGRES_PASSWORD=${PG_PASS}
      - POSTGRES_DB=${PG_DB}
    ports:
      - 5432:5432
    volumes:
      - ./data/postgresql/data:/var/lib/postgresql/data
```


<img width="1486" alt="Termbridge Homepage" src="https://github.com/user-attachments/assets/3a8eb44e-9079-4a91-be3e-5b7591d808de">
<img width="1105" alt="Termbridge Terminal Page" src="https://github.com/user-attachments/assets/ba73419a-32cc-48c3-b4ee-92b56a7bc961">

### Motivations for this project

1. Access from anyone's device
2. Access from any device (phone, tablet, laptops etc...)
3. Run same commands across multiple devices.
