--
-- PostgreSQL database dump
--

\restrict l7TgV7xTQLaui3tOqAFePtK8loPOBv3kY34CIeKyhbVJkocIOFXKKPF47dGRqDn

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13 (Debian 16.13-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: monte
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    last_name character varying(100) NOT NULL,
    mail character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(20) NOT NULL,
    promotions boolean DEFAULT false NOT NULL,
    rol character varying(15)
);


ALTER TABLE public.users OWNER TO monte;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: monte
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO monte;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monte
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: monte
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: monte
--

COPY public.users (user_id, username, name, last_name, mail, password, phone, promotions, rol) FROM stdin;
1	test	t	001	correo@gmail.com	123asd__21a	4433601265	t	ROLE_ADMIN
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monte
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: monte
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: monte
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: monte
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

\unrestrict l7TgV7xTQLaui3tOqAFePtK8loPOBv3kY34CIeKyhbVJkocIOFXKKPF47dGRqDn

