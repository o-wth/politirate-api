See <https://github.com/o-wth/politirate/tree/master/v3> for the monorepo.

# API

## Stack

-   REST JSON API
    -   routing and load-balancing in [Elixir](https://github.com/elixir-lang/elixir) with [Cowboy](https://github.com/ninenines/cowboy) and [Absinthe](https://github.com/absinthe-graphql/absinthe)
    -   NIFs to [Rust](https://github.com/rust-lang/rust) using [rustler](https://github.com/rusterlium/rustler)
    -   [Rebar3](https://github.com/erlang/rebar3)
    -   we recommend applications use [GraphQL](https://github.com/graphql/graphql-spec); see [Apollo GraphQL](https://github.com/apollographql/apollo-client) and [`graphql_flutter`](https://github.com/zino-app/graphql-flutter)
-   [tokenizers](https://github.com/huggingface/tokenizers), [tch-rs](https://github.com/LaurentMazare/tch-rs), [rs-natural](https://github.com/christophertrml/rs-natural), and [rust-bert](https://github.com/guillaume-be/rust-bert)

## Routes

-   **`/politicians`** returns a list of U.S. politicians, where each politician is represented by a dictionary containing the name, the party, the state, etc.
-   **`/score/<politician>`** returns a dictionary containing the various [pooled subscores](https://github.com/o-wth/politirate/tree/master/v3#algorithm)
-   **`/score/<politician>?platform=<platform>`** returns a dictionary containing the various [subscores](https://github.com/o-wth/politirate/tree/master/v3#algorithm) without pooling (so subscores only calculated for a single platform)
