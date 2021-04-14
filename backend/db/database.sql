CREATE TABLE public.users (
    user_id SERIAL Primary Key ,
    name text NOT NULL,
    email text NOT NULL unique,
    mobile character varying(10) unique NOT NULL,
    password text  NOT NULL
);

 CREATE TABLE public.cards (
    card_id SERIAL Primary Key,
    card_number character varying(16) NOT NULL unique,
    name_on_card text NOT NULL,
    expiry_date text NOT NULL,
    balance numeric default 0,
    user_id INTEGER NOT NULL
     REFERENCES users (user_id)
     ON DELETE CASCADE
);

CREATE TABLE public.transactions (
    transaction_id SERIAL Primary Key,
    amount INTEGER NOT NULL,
    vendor text NOT NULL,
    credit_debit text NOT NULL,
    date text NOT NULL,
    category text NOT NULL,
    year integer NOT NULL,
    month integer NOT NULL,
    card_id integer NOT NULL 
    REFERENCES cards (card_id)
    ON DELETE CASCADE
);

