See <https://github.com/o-wth/politirate/tree/master/v3> for the monorepo.

# API

## Stack

-   [GraphQL](https://github.com/graphql/graphql-spec) JSON API
    -   [Rust](https://github.com/rust-lang/rust)
    -   [Rocket](https://github.com/SergioBenitez/Rocket) for web
    -   [Juniper](https://github.com/graphql-rust/juniper) for GraphQL
-   [tokenizers](https://github.com/huggingface/tokenizers)
-   bindings from Rust to Python with [RustPython](https://github.com/RustPython/RustPython#embedding-rustpython-into-your-rust-applications), [pyo3](https://github.com/PyO3/pyo3#using-python-from-rust), or [rust-cpython](https://github.com/dgrunwald/rust-cpython)
-   Python functions using [🤗 Transformers](https://github.com/huggingface/transformers) and [torchMoji](https://github.com/huggingface/torchMoji)
-   [rayon](https://github.com/rayon-rs/rayon) for parallelism

## Routes

A score dictionary is defined as a dictionary containing the various [subscores](https://github.com/o-wth/politirate/tree/master/v3#algorithm) for a single post.

-   **`/politicians`** returns a list of U.S. politicians, where each politician is represented by a dictionary containing the name, the party, the state, Twitter username, etc.
-   **`/posts/<politician>`** returns a list of all the politician's social media posts, from all platforms
-   **`/score/<politician>`** returns a politician's score, which is a function of their score dictionary over many dates, with more recent dates weighted more than older dates
-   **`/history/<politician>`** returns a dictionary of the format `{date: score_dictionary}`
    1. when a user makes a request to this route, we look in the MySQL database and `/posts/<politician>` to see if the politician has posted anything new since the last cache
    2. if so, we recalculate the score for the politician's latest posts, returns this value to the user, and cache this value in the DB
    3. if there were no new posts since the last cache, we simply return the data in the DB
