# Termbridge

Manage terminall access to all your homelab devices from a single web interface.

## Requirements

You'll need a CouchDB instance running to store terminal credentials. You can use a compose file to run both Termbridge and CouchDB.


## Usage

### Docker Run

```bash
docker run -d \
-p 3000:3000 \
--name termbridge \
-e COUCHDB_HOST=you-couch-db-host \
-e COUCHDB_PORT=5984 \
-e COUCHDB_USER=COUCH_USER \
-e COUCHDB_PASS=COUCHDB_PASS \
sidhantpanda/termbridge:latest
```

### Docker Compose (with CouchDB)

```yaml
services:
  termbridge:
    container_name: termbridge
    image: sidhantpanda/termbridge
    restart: unless-stopped
    environment:
      - COUCHDB_HOST=couchdb
      - COUCHDB_PORT=5984
      - COUCHDB_USER=${COUCHDB_USER:-admin}
      - COUCHDB_PASS=${COUCHDB_PASS:-password}
    ports:
      - 3000:3000

  couchdb:
    image: couchdb
    container_name: couchdb
    restart: unless-stopped
    environment:
      - COUCHDB_USER=${COUCHDB_USER:-admin}
      - COUCHDB_PASSWORD=${COUCHDB_PASS:-password}
    volumes:
      - ./data/coubchdb:/opt/couchdb/data
    ports:
      - 5984:5984
```

### Docker Compose (with existing CouchDB)

```yaml
services:
  termbridge:
    container_name: termbridge
    image: sidhantpanda/termbridge
    restart: unless-stopped
    environment:
      - COUCHDB_HOST=you-couch-db-host
      - COUCHDB_PORT=5984
      - COUCHDB_USER=${COUCHDB_USER:-admin}
      - COUCHDB_PASS=${COUCHDB_PASS:-password}
    ports:
      - 3000:3000
```

<img width="1324" alt="Termbridge Homepage" src="https://github.com/user-attachments/assets/a5b94432-bc6c-4b98-a0db-50b2fe6435c7">
<img width="1105" alt="Termbridge Terminal Page" src="https://github.com/user-attachments/assets/ba73419a-32cc-48c3-b4ee-92b56a7bc961">

### Motivations for this project

1. Access from anyone's device
2. Access from any device (phone, tablet, laptops etc...)
3. Run same commands across multiple devices.
