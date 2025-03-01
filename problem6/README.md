# Scoreboard API Services

## Overview

API to show top 10 user's scores.

## Table of Contents

- [API Feature](#api-feature)
- [Function](#function)
  - [Scoreboard Display](#scoreboard-display)
  - [Authorization](#authorization)

## API Feature

- Show top 10 user's scores
- Live update for the scoreboard
- API to increase user's scores
- Authorization for increasing user's scores

## Function

### Scoreboard Display

```mermaid
classDiagram
    class User {
        +UUID userid
        +number score
        +text name
    }
```

```mermaid
sequenceDiagram
    participant db as Database
    participant sv as Services
    participant cl as Client

    db ->> sv: Query get 10 users with highest scores
    sv ->> cl: Send data to client
    cl -->> sv: Detect user's score update
    sv -->> db: Update user's score
    db ->> sv: Query get 10 users with highest scores
    sv ->> cl: Send data to client
```

### Authorization

```mermaid
sequenceDiagram
    participant db as Database
    participant sv as Services
    participant ct as Controller
    participant cl as Client

    cl --> ct: User Login
    ct -->> sv: Login credentials
    sv -->> db: Validate credentials
    alt is login success
        sv -->> ct: Encode User ID to JWT Token
        ct -->> cl: JWT Token
        ct ->> cl: Login Success
    else is login failed
        sv -->> ct: Login failed
        ct ->> cl: Login failed
    end

    cl --> ct: Update user score
    cl -->> ct: JWT Token, UserID
    ct -->> sv: Validate JWT Token and UserID
    sv -->> db: Check UserID and JWT Token
    alt both pass
        db -->> db: Update user's score
        db -->> sv: Updated user's information
        sv -->> ct: Generate new JWT
        sv -->> ct: User information
        ct ->> cl: Response with new JWT in Header and Data in Body

        db -->> sv: Trigger user's score update
        Note right of sv: Check Scoreboard Display
    else not both pass
        db -->> sv: Failed validation
        alt jwt not valid
            sv -->> ct: Failed validation
            ct ->> cl: Error
        else jwt valid but user validation failed
            sv -->> ct: Generate new JWT
            ct ->> cl: Update failed
            ct -->> cl: New JWT in Header
            Note right of ct: New JWT for session token
        end
    end
```
