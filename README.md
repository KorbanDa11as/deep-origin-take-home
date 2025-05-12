# Installation

1. within the root folder ( where `package.json` exists) run: `npm install`
2. `cd ./serverGo/datalayer`
3. `sqlite3 test.db <taskDB_schema.sql`

# Run the app

1. navigate to `serverGo/` dir
2. enter cmd: `go run .` the echo server should run on port 8000
3. in a separate terminal navigate to the root where `package.json` exists
4. run `npm start`

# Packages Used

react-table:

- fully featured,
- highly extensible,
- headless,
- supports server data,
- configurable column def

react-select:

- most popular autocomplete package
- includes functional multi-select
- over-writable composite components

radix-ui/tooltip:

- context pattern which provides component isolation between the tooltip content, and the trigger
- context pattern keeps the logic localized to the relevant render tree

# Code Organization

## client side

- relevant entry point: `src/App.tsx`
- component library: `src/components/`
- Column configuration for table : `src/metadata/task-columns.tsx`
- api interface methods/ contracts: `src/api`

## server side

- relevant entry point: `serverGo/server.go` - has all the implemented api methods
- Persistence layer methods: `serverGo/datalayer/methods.go`
- schema + data population: `serverGo/datalayer/taskDB_schema.sql`

# Performance considerations

1. make top level initial call to `GET /Users` in `./src/App.tsx` to avoid each row needing get the users for each multi-select component
2. break up the `GET /Tasks` data into pages controlled by a paginated table component to handle large datasets gracefully

# Assumptions

1. column count is not orders of magnitude greater than page size
2. getting a single page of data is not costly
3. user list is relatively stable
4. both memoization of functions (useCallback) and react components (memo) are lower priority if the re-renders/recalcs observed are low,

# Error handling

1. wrap api calls in try catch to handle errors if they don't match the contract
2. create error state variables in the components to control the render should an error be detected in the api calls

# Known limitations

1. the react-select component re-renders sub components when a new menu entry is highlighted (naive memoization of the sub components did not help)
2. row updates force table to fetch page data

# Future Extensions

1. add better error states
2. error codes from the server
3. optimize render performance (ex. refreshing page data on row update)
4. build out persistent avatars
5. implement detail page routing for link column
