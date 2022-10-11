--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-1.pgdg22.04+1)

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

--
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: uci73ftoa4sipi
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO uci73ftoa4sipi;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cartProducts; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public."cartProducts" (
    id integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    amount integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."cartProducts" OWNER TO zavbcrupzeqifv;

--
-- Name: cartProducts_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public."cartProducts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."cartProducts_id_seq" OWNER TO zavbcrupzeqifv;

--
-- Name: cartProducts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public."cartProducts_id_seq" OWNED BY public."cartProducts".id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.carts OWNER TO zavbcrupzeqifv;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO zavbcrupzeqifv;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "imageProfile" text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public.clients OWNER TO zavbcrupzeqifv;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO zavbcrupzeqifv;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orderProducts; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public."orderProducts" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    amount integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."orderProducts" OWNER TO zavbcrupzeqifv;

--
-- Name: orderProducts_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public."orderProducts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."orderProducts_id_seq" OWNER TO zavbcrupzeqifv;

--
-- Name: orderProducts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public."orderProducts_id_seq" OWNED BY public."orderProducts".id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "totalValue" integer NOT NULL,
    "orderCode" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO zavbcrupzeqifv;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO zavbcrupzeqifv;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: productTypes; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public."productTypes" (
    id integer NOT NULL,
    type text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."productTypes" OWNER TO zavbcrupzeqifv;

--
-- Name: productTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public."productTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productTypes_id_seq" OWNER TO zavbcrupzeqifv;

--
-- Name: productTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public."productTypes_id_seq" OWNED BY public."productTypes".id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    rate integer NOT NULL,
    "imageUrl" text NOT NULL,
    "restaurantId" integer NOT NULL,
    "typeId" integer NOT NULL,
    description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO zavbcrupzeqifv;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO zavbcrupzeqifv;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "imageProfile" text NOT NULL,
    password text NOT NULL,
    city text NOT NULL,
    "stateId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.restaurants OWNER TO zavbcrupzeqifv;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO zavbcrupzeqifv;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: states; Type: TABLE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE TABLE public.states (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.states OWNER TO zavbcrupzeqifv;

--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: zavbcrupzeqifv
--

CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.states_id_seq OWNER TO zavbcrupzeqifv;

--
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zavbcrupzeqifv
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- Name: cartProducts id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."cartProducts" ALTER COLUMN id SET DEFAULT nextval('public."cartProducts_id_seq"'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orderProducts id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."orderProducts" ALTER COLUMN id SET DEFAULT nextval('public."orderProducts_id_seq"'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: productTypes id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."productTypes" ALTER COLUMN id SET DEFAULT nextval('public."productTypes_id_seq"'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: states id; Type: DEFAULT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- Data for Name: cartProducts; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public."cartProducts" (id, "cartId", "productId", amount, "createdAt") FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public.carts (id, "clientId", "createdAt") FROM stdin;
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public.clients (id, name, email, "imageProfile", password, "createdAt") FROM stdin;
1	Samer	samervalente@gmail.com	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqS4EbhiRWPpik9K0oT7EvL1Z0qlbRMAzk2Rq9ydGTsM1ze_kgBXk3Go7sqb5O2g0AEsjx8o4VDSkhFN7jkn42khiNErDSlsnt-IC-LmHhqplB8hTWYXD3rOmf4fT1Qs6_5K4LnCg69pVtUgIL0YLdfFowLQcCDrZx9nVlNl9Iws2khcKY1BF5Zv_P/s1500/bolo-de-pote-0.jpg	$2b$10$5kO8rc7S3YJqNv8fNZKQS.REfafGQAAqO.1N/TiTI2FvAuiWnWPqi	2022-10-10 15:26:13.036027+00
2	SamDuiche	samduba123@gmail.com	https://i.pinimg.com/originals/63/5f/56/635f56e0a49c8c6096215831663faabd.jpg	$2b$10$FpkG1mF745Miu8kYb0fXTuuwWW9ijMEZ.9DGJ9BAhDtrmoqFU2obu	2022-10-10 16:53:39.008911+00
\.


--
-- Data for Name: orderProducts; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public."orderProducts" (id, "orderId", "productId", amount, "createdAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public.orders (id, "clientId", "totalValue", "orderCode", "createdAt") FROM stdin;
\.


--
-- Data for Name: productTypes; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public."productTypes" (id, type, "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public.products (id, name, price, rate, "imageUrl", "restaurantId", "typeId", description, "createdAt") FROM stdin;
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public.restaurants (id, name, email, "imageProfile", password, city, "stateId", "createdAt") FROM stdin;
1	Pizzarias Boulos	pizzariasboulos@gmail.com	https://i.pinimg.com/736x/38/49/c7/3849c7b63abaa8d7bee746cea021eee5.jpg	$2b$10$/w42BP9VYs5qEvAnvtNxWOY2PuHWEkyUQbKvfvTEw8Fl7kb3zKIN2	Rio de Janeiro	19	2022-10-10 16:26:33.576261+00
2	Churrascarias Grill	churrascariasgrill@gmail.com	https://img.freepik.com/psd-gratuitas/modelo-de-banner-de-churrascaria_23-2149084198.jpg?w=2000	$2b$10$hkzreNwHbWbYibluzWnHP.gOSD48FLCRZbYwVVkKYR/V8J7Mz4k.G	Rio de Janeiro	19	2022-10-10 20:31:57.474904+00
3	La Pizza Express	lapizzaexpress@gmail.com	https://static-images.ifood.com.br/image/upload/t_high/logosgde/3aad1885-47c2-4e1b-a29d-6baa7843fd67/201911221804_kB5T_.jpeg	$2b$10$9R/aIhRJRrFd4PYZ.6CLAetVlW4jriwa8dR0DGV24WMfjgt0hftki	Rio de Janeiro	19	2022-10-10 20:36:42.612551+00
4	Sorveteria Blaus	sorveteriablaus@gmail.com	https://pbs.twimg.com/profile_images/425350734574403584/6sIBydHO_400x400.png	$2b$10$6KCn4ufpHZUYWJc4kvGrE.AaPbBQtRYiGi3fVlHqkJ1Dqcg3w1cAm	Rio de Janeiro	19	2022-10-10 20:37:32.816545+00
5	Sorveteria Kibom	sorveteriakibom@gmail.com	https://www.kibon.com.br/content/dam/unilever/magnum/brazil/graphics_logos_and_icons/img_kibon_01_principal-29612577-png.png	$2b$10$tR4W4slL907bDWpaUnA/Xuc9E8nmkt794k/qRlaFjymiPD2KnuI3C	Rio de Janeiro	19	2022-10-10 20:38:31.721717+00
6	Restaurante Carioca	restaurantecarioca@gmail.com	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwOjeSVY7I2QlDLD7_Mvi98O3shgTV9ybKaRFiwnyfB2_DwHIW4J3MGNTvONhP31ApPpU&usqp=CAU	$2b$10$SQjML8/IVWzQK1tFozyZ.OR01P/33qeyz7JVSE5nAaCaKrCC3.AUC	Rio de Janeiro	19	2022-10-10 20:39:48.276749+00
7	Sushi Inkasa	sushiinkasa@gmail.com	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABTVBMVEUPDg67AAD///8AAAC4AAAADg68AAC/AADCAAC1AAAMDg7qw8MJDg4DDg7+/PyUBgbNY2PVgYH78vLenp7ovLzZjY2CCAjPamruzc3v0ND57OxlCgpFDAydBQX89PTz3Nzkr6/25OThp6eNBwdrCQm8vLzAJibBLi7KWVnSd3chDQ1zCQmsAwPx8fF5CAiRkZG+GhrEOzvXh4exsLA9DAxcCgqkBASko6Pn5+dOCwvblZXIT0/Ly8uHhoYpDQ3a2trJUVHFREQcFxc0MTFgXl5RT09xcnIyDQ0iISF2dnY8Ozs6AAAvAAC/Hx8/AAAaDQ0RISEmLi4lFRU6FhZESEgpBwc0OTkfKChHFhasXFyZSEiti4undnabhYXAbGy1V1eEVFSkZ2dNAADAra3AioqtKiqEjY1xWFhOWlp0ODiOmpqFcHBcb2+MKiq/lZULCfl1AAAYEElEQVR4nO1d+V8ay5aXqurqLlDQiIiAIoIrm0YRNRg0UaNmMXljkrfMezOT92bmvntn5v//cWrppbq6gW5oxNwP53M/19j2Ut86+6lT3TMzU5rSlKY0pSlNaUpTmtKUpvT7pTdv4aSHMG4C3es3kx7DOAkeArD5u+biWwCSv28WdgA4/12z8AqAk981QHgOwPWkBxGW4rNzmkxzs/HeJ58f3jZ/HhbGBbLZvaPTVr5abTSq1Wq+9aPwekYg9QEKk6AOfw47w8DNFSqZ1DHBBiXdIvaLEaulMvkCB+qCCdtd0JzUkEMQG3ihmqpxXBjHvIQxx0pSjVM2E/aVb9v1Z29m4gxd45iB84OmAGUwa42CxUp42H7mZobCm2mlsBEAnAzTiKXyDwzkdft5RzNU3Fqrejh4Nkh9Nf8ADzfB7aRR9CTKvkKKDjQ0Oot04/SmCZ6tp5jVtEptBHgMYQoeduuQOpdJg/GhWW0vg43wwuki42uzCa5OjczDs8M4q71ODaN8Cgszn9v1DqxRlSy/flYY49peeTTx5IQxbLfB94rBwBrlPa1PYPe0pM1mIsBHZbT6BVAzY4YHup6Ja9Yj3kzS+GhaFUeBL4YJ3KQBadm+mY4rmmYC7EzMwMa1AhnVvphktK4BuCoYEmajVuCi+uYEgJvJANRmUxHhi+Fj2AXMzLgOGuWH+Mx9HVDsk8AX105RJALKyCjcAPClYqiHVzWa8YOTt5MAqGmRMZA7+zpoQzULMVJwhopoZyL5onZEImMgRbjXdJkZE2AGtsFtsj0JgHGtER0DKcCGRo1JwS2j2MizqtsJhJWn942atqpqzCiEETz0mhn99HOnC+qPf6gZq3Pa4EFFCvBdlBJKpTH/DYBvedek6ejdt+456GqFGI7p5N2TQtROR45BXYRrVBoVM6PXHq46TXAI81wbsNF6QohaJUoVpGScXqlmxliF55uH4BxmTMZio/pUEONaJkoVpKSvwhNwcyTflRnRdgdcQUndjczT2Js49YLRAowZ/3Jb78JjSS6MCtxsntS/fHCpu5F6CojxgEYUWT8pDThVL891r7+0nNsyneucU9vaUtSdBjhjh0gBBjGiCC3vbFFs5GAl+WKxP0SsP7SpQUE2GBw7+k4BtmHVo+768bghBgW4CxitpF/wn+t9IerV7yAJM07SVNu7T3bBHfTTBn3cXNRSgQAuAxflSJ+TeVp498FGox9DGmonHx9qvo+iEMcKsBzMyLgBgpV+PDRaj0AyM0aZra11PzM3739+aowQA7oJ9FJB2E8ReVr4aJsZoyGW8PO9PS51GmMD6EneeiBcVBBu9TmZpoV128xQI8pC7SbsO5VGZUwQtVOD2kjCqL9xVNUw0UcNaVrY7n42zQzGBY0mgy437wvxdBwQIfwa258/S5eSAJSW+0JUEe72Odv42mw3TTOjk6/f6qD+5eugqB7rkYfhEMLr9sqaM+j+I9h3I9zufaae+d7uwlUuo8KIdmCAqB6TaH0GhFebSfeg+3s4UnSd3GekMdg+vBZmxkjBG+Dr5v1mJlqfcdsFKpX6i2k6IEKj8tjehIRBYqH2ff0OBvRHRiNCiEx2uvXg9t9jTF/1Oo+mhe3Nzw1d1Cs2qVt8OA6aWBtH0UGEcKapcjHRH+GZ6+SXvU6maWG7+dXg9QrqFU8+/zF4cTIyVWTwTjxCCkC/OExF2MsdUmdPZZQGujp6971O3XwrTGKtRxHbUBN61/GBR/UwBMJsr3ONo/P2FXWyNNR+HOjmfS4f1StCZkJ94fUTPIHQpYcXPc7Sy1q7Tc2MscqM6EA37yGMRpJTCO8P673wgeSAoGZXOrfYi4X6XrP9paHTULsJ6t+++qcS/YhO0fDw/JXPpo0Baft+gHP1xpd287VuVGmo3Q3i5r1kFIaCSKXzxl/5HBbuD3g0kcKfHjEbRnCzTiWThdqHcLjiHa4NgZBKZzvph6q4uDu/vU9Hi7YPBj4aSUFNj7ON/CO4+mEcfT4B50HdvPcmoQuMlH3e+EXQi+1BBSUZoRTU+J9BnX23A2tfH+vgGgZ285674H5NnH4Ar/tp32DWOQjXnZnxNzRG4Qrcth5ump0vRyOsQerhsmEWnsmk2NIXwZlouoskVces71X6Kqw3qbdthnTzHjJeh2lKgTcSps7dLWy7IfbL83wRrpV6ZSHGh2YdwnPqDxujlZdDeQyqhJaQds+ZSYW3boQ7gZ+LlvgFpWwPZ6FnIHXxzbZ/xTAUhWAivDLx1Zu3ULR2QJec9nTdPREWE/48xHjm8OZNs/3L6/BuXqXgTKSBBYd3eAWh1boCXYZ1J4QeLvArVtb9eWhUvl/f04Cm4Ns7HJKMh4BMhPed7mbz3oE3IzZ2DMNCG+GZbyaJyWd43WzORbNGF9ycQk7uQ3Lk3a8k2Ash/bHgRWicwrtu4Gx+EGE8QgAuG9PghtRBmFgGwFuW4/0VV8O7ec/9RiifQsdxr4SQUbuemN7x5k6YLQ3Wv0TYBzBUdCpo7r2DMLin4AjnBQ8RAAoLeb1iyFSiFxlHc4PB+JJWthH2iL0GISQbiinFsaPP9UP4JtJGh6HzxLiGEhbCQQlhD4Tq+i+vV9zBz2rr02g0tK3RWjhrIZwfEqH7MI1Gb5KP99d/jLgRYNhGFG3VSfNCPtIfIatXnLy57yqtT6PTkBXw+IyOcibA/qU1L/kiZPWKDoTdx3zUvRwxPT6MmGotA1nFiHQ4IbVKUTJCvjTYhns3h54Oy9FpODHVUjqyhPQsLMIFFSHGhc/dG5iBXS1aM8NpuOqwhmMfLYT91wu95OEhJu8eu98+xI6a50eRyyhzQkMgnCsYsZ1hYlJGXoR/uGH9Pzq8mzuOXEZjrCgS3ulrDd0u7A4oAHtJRYjJ3M0dTT9Lf3qfGVZGEbrc2e81EH2IxTbtGNvLD2FNqY+l+bOZXr8cFt8WL9+d9RgJPh4CoRFDGyZC/2pSCITEWarx5igBOt+clRDvgom43AiNkKmhHbS5YrbBw/EgdKI/r06jg/X0xu4gkE6FWYmu0CW7HCM9tCJqVT2GVvwm7mz9cvCUu7yFe1nfHQYQUdEBK8u9MaItaZHALQSWcGTnK2F3DbEGNmKFNPPS00r09wUyYMpdCEkWuMh14pJ9ODffQ8fQgft6SQiIs4x3chUSokZwDCW997zgB9ayi9v9rI+M0Py3Q1Kq6VqGA9mY77ztgPSa6zT7ye5bd2AYjPFZ6peJz6zbQQBIYDEepulky81UF0J364kr6992/yV54ANxfzmWc59mLS+gS/fx+m0IiMzQmM/PgTXpudKKRJLrI9ooppeKIOkK7FwIFxeX56VxFJ0TkTJ0OngvRLS/ppxkRcnohfKHZAiIWp465ldiRO72UK6IJhF5lSknjc6lh5TFMhudkMbT4UfF3wtw27vYh9TJtqgeAiENPcxyUtbdHiqrDvUispw57tg0IOaFZEM6SYoetti8KGNUsxj0ygPDMqcHPpcfBobITKlgRDKr2Pct534ryG0qVnwRuttNHQjMxu56GPTRjXBb/bt9D0J92bLnT8F5SNNwMbK1rLL0QOQnKZ0zL7aQB6F7EqQGKWonXnrl1F1B9qgaJx5jUau+65XTu6BM1BA2u2JyWaUwTxzJuPDoQvJARsiMitKKuWTfiwY6aQI85HboK94TgFjtoRKwgbx/ugmIMB6nhuZig11SKkqj4iOzn0otECkpTxAtfQ5CSY+yF7Ed2eNRldyQLxXsWpTCVOLlESfWzrkPisTVICgub3rXJnxpdo9FpVyEVopK/utYT8pbrD48LSOkVsWOR4qX7hCBCu9HueN9ZdsWjrWiiAvd7GdzmeRqy0JTaiRkiwCyH4m1FFjvPg6GOEcT8f0SR1gsKvVuRzAPvD3rOVMPxfEcscOiRUKUIIhcyDygdljWuQt+HwrJPrJOFhdfEbK1vi6SxP1LORp8SZwIjNJgiNqpgZZzFg/d3ZN2TrXmFdI1s9HG9Ic5K64GO2g5nVNaHZBkJ5dJzL2H4SN/UNHWeQbB9K7W5VJEw7gqcxQMfEMBq7NtCB5mi4oBt81nAplFQwemZSZshObxEtddpXAu5VS7HpPEVPhsxeaST+YrsXAZeWPUQQjzOsraCJWpP6OKwp+KxBhzTgeUPb/icaUN+alqJ60z6Rts/Ird3HcyK//VWSfjWOSXu8VpIMKKTl6sWFKqmIglkOPIqGjwm13Ys5lVEK65/LkyTMdiiT8owYuMwa9f15EAvvCH5t2XD0RY1RFfo2aWZs2DsMgFalvIa5HY8aUdfSteXpDSB2B3963FqJKp3e/ME1lHfBM1WwJyiNV+iDt+6wZAuA2y3CAWEzkPwhWuXzHCjd88oiZBMMvOi3wRKlq4YR3PMhejWmU6WVYt03dDiiMBzPOrXcmDXyupNfR5kOXDLC4pwTBFmGbYkoRzknKYPk1Mt3OOD8I15TbOX1izlbJFA0gYfLvNJEfMOKAmmoO9RRUvgcRLcb0a7S9Ry1BiCDks6vYpO7gmOmVV32gLKXexiTo/RUYZVy3T4dtELSdeBx4zEyDFoAg3gIhpPHsHqVU/Y7YlKTRhiz8u6zrVsdxryxe2OLmKbJLepIkpZJKgUvtv1QbWfRE60QENUkX09xfnclGz6QdTq+AESPDgJel5wAHYJcyQ8XljhozKJEdo5ZGSK99Gjs13xdQ7znDoBbz6s3EpH3Nip0XvRjLJd1LBEXb07E/O5QwbhP2copbHKyCRMO+gEthSlr+3BULLWeA1sCH+uiI7OlmfJW/PDDAzVCXiGHwuDTbg3I46y5K3f4mEDhfRv9rH+GsXYbff2xe1Fs6B9RVrOhW6lGJTXkpFLzmfTLeFStSCSwgtKyLPlWNn1ix5PLDN0wuedslR68qBYs+duUBmtedjzJLSOo9oYKdvdKqd6msgIRD69XQ7CEUJWkhi1i6PvrKGIEJJk6OOmEq2dhcJKDRCsrR3l92JLIKE5OMSH+X5cczUMuIaQxNnbCG8Y+9dhIf93744d6TTmwpV99tb5wjZgpQt8Soay+nSdk4hEi/zNyeoQbaUlYh5LXFg7y/Mc2OFXasBCw4bnRS1SERRmAoL/qt5DJ5fQdaH2Nee0vyQXiXCzcu+COV8kGkPM2tM+U2EZrXN9MdORGCHc8um9u1LgRdNk9EOV1CyI2VUTuzmCOkFEdOCYzH9zkLIdhsMcvpxuG3nZn7rv84kygiTpt2mVxALgguRzUQ74iwRYXe5AJuRKZuoLbPpGsmOr2QVIi8cFl7aY8RmDze1L/B+8LukoWPNfZoLJXeUlpk0zwEy82Ij3HUx0QxNHTW8iHFBEV7dMk/0pBf2IhP66IhqyZVfU7rc58+hHpW1dIpjHQjf0KPXgxD+zb6t71ZD5a+mLUnywTDTZCO0XITFMjFEy6asiGAkKZhjRgEJwqrOTihDLm2t3XDNFz2HX8GNNK6ZHc2bkP1jYIIIHefi12niZDomjySTwDHbCM1o1BI283SLhwcr0lHLQuc4bNmEo5jlOeQqEDWCwhZybuurZjfsCWTLzQPDNmgZJtc6g/1EJ582q4dSWMkqAhgpJ1hMTIpfTGdeEgNPW+wyJ44JrtLfYgVGomRkqlBR8FaEdXrG2kzBJnfwK+ul3llv2CbFvaYXl6JMZicOgLOYsuRmokAjV42s6lVMzhHVzgHL/ZtrtdLVlnLqeQ3a+2EGpofu7mCvy3dyO2tlwhkxyzWkvMFZ6TZ/5yLVY9nbCTeVyrcdYQiESEpdkmYVySjMQctfBKkLs5dTWORtnnWVTPkBR0pdEwCchMMyD0JOpZKFnPrbTJSWsRDZWrQn0FQKqWTxyjzVmInPWEwcnB66EVKV4C+LkJ4qWXvX8EXB3b1qZo/ezOF4yk5sJrp7M7adu3Bw6NWSHLtZDQVO/ml5a0w0OupHcbAdBKHUpZ8gr84SJWbanVql6ZHsvN1aGuYcchf2DpTRC0yWR1W6R0wB59ccbGSVxTNpNtaUI6KzzVSuIN+okRFaIpLbXZi3VrMRPiuBZM6WMLTAz0qKWrVr9XlHGb0Z6e5ziJ46KI8ZuIPyrI6n5Y4o0Z7hzI8udiJy2Qu0iAh77XG2V7MRYf85k48OFhZ2TPyuJSVn4q2sLmcuK6Y3fPpW0PbCS2HbEBUdi4nF9C5WuZ3ekFadrQ2z8P482MdNYO99sj23ITrNCkjuL5FEyxJNUT3r1SUk3QcRfLmwcLGNfNpb3JfbPVGBVp56IUycrRcDdWIKS1RUpDTmqOtimB1Gg583TF+bF2FpgbeVFNUNFL7ErP46QbuMl67RWl4i1A6cABS2NxGaG9kkfDvCWaBisHZhtMy2DdMZWd5Wjps3DLERLgiF2bcOeZVKAbhgO0O/nh5fiMpP+7jlrF9FCRHjwAAhvIZO8GNS8mOEo7EhRsnF4H3e8C3wbHAe8EK50IQuk5FDDN6r7+8GQ2ziDkIIFy3Zj+qW+kzA/Rbq1maLIjZ8dldoeisWYpN/bwq+Z0ZlYXExMRaENHCxQ+debxxEaP+SmbV5yf9vXzLnaEblkqMMLKRcCyVqEkR2kpFLKSdyYWLs0UOOllgqsnZBkiyYpxEbOuCB0jpaXrqkoUNxfeuM/YNR8L1rihe8YS/2RbH1tf6v2xmWENpdTyR6uX6qqiedLlhv8LI/DYIWWKNMJwnIOsvq/w0AmnWbvjnEhnWXkF7DOb69BQ14h+AoGHuGpuvgjhV2T3b/nTIZ/wfFAjos5DwvHW9SPuq/gdIPOzsNvoeUVYptYlV/LeptdAEJkw44+fvfap8ejHOWDTfB5Z8B6PxjqwyPVzs0Z8LnIP3Dqq+E2QcMpQIRi9CDvuwyatJT8K9dqv/zZfwrZR/5FRjwmgnYekYvd8EBIU1w9sOqkYXZyy0pIq+oxrVoX0welDA5hfC2nQQva7+C3Rj9H85A/u6cEs6ciDWpxU9mnRPrYfbIOvU4Ua3Sht6lNCJEg2Q+QPh38J+/guXY8X8BpOurLQj/W6Db/O0QbH0yy3jhXlFju3yzYXr2YTJiyr9RdnwET/5xx3j4C/PIuhGrwt9yv7GFiR9toH8wC32B34thQrwXqmhtzxjHdsjgIP8JXj0yS/OLsCnYSHU6EPzl2Ki1S/i9KKqG3qpOU8NuvWvvP5l9PRkm7jNXsgCKMVgHsa2T7nxsnyab20VwmQeXGNd+TeAfJ7xPLtxLhkyMcqljQkzcX0pTn98pG5+uk8nu7T/P0DyrLdZ/Myp1Zon+ZwNXNtmJI7yVzmLi3iSYiMuZcuYTfE/tC3z/v+/JJ+M4Uy5XIKwZlf/jm2IP9Ax7K2jM2Bv542WTMad6LVOtshcp6sf5jKEf08g01ahmqEmtsFfy6lUd11g4EvJdX74Un41+c3kAYt8o1c1/MKaJA5gKqHjnMIu3h3hfmz8TJxTY9CDXdEf0Zu9JRaeDaYQ307gRFp4VEyUa8t2XPhAn6Pb70eiewqL4TK/vFEyUMIrCzAjSWs9RTiP9PFKwD3c8LUXyLmib4hp6bnIa9av1tXG8kWQkisyO2hCrzwviGD7gFewjQU9F4/ieTlwjz0cVMZkbwzeRtHeTKUv5EDbG86lA9p2Z50Fj+1Dgc8kyxviZwMg/CzgUjfF7Tyy2mTzEsX6z6zn4jHF/Wi7gt/N+XoAThzh+gMG/YTkWeopvWI7lO6SBAT7Jd0jH8S3ZoACf6FuyM2P4HnAQesLvAc9E/03nIAD1sXwSsDfEiL/LPZCe+rvckX9bfRBRI/rEAJm9aTyZMjIVfCobI5N29ESSqpMIv5MXDqJWfgI2YuoFJwSQSerp2Nmox1oTkVCLxs1GysCZiTFQUFw7qo0NIzZqhYkyUNCclo+NR1R1XJmcBrpI0zL6GN5CrmcmLaAOxbW9csQYdaO89wwE1KFZjjEqfcQU32tt5DaSiGlWm2ngSGwONvTMw7PDxyiuaZWaMSIjKftq1L48R3yMKMajMmXB0Ph0A5ePtGelfx6a07TWqj4UJ+lVq3lNG/a7P09HlJEzrRQOB5IKJ07lH545+xyiILVC49gwgphXrOuGUcucaj8NPJM0hrKaqjGYum9rHGataoZBUg2G7ieDZxJVSm2uUMmkjgmFYnCwnPgvqJbK5AszPy06i+IMJlXNvaPTVitfqTYa1Wq+9aPwmkP7ycHJFJ8VSC2ai66faUpTmtKUpjSlKU1pSlOa0pSmNKUpTWlKU3oW9P+eTT7Ed/QQWQAAAABJRU5ErkJggg==	$2b$10$HBv.ugwjzk6C59KDZqvK3eGO1bWrkRSDWEj3UKhDTR.Au96MwkHja	Rio de Janeiro	19	2022-10-10 20:40:41.891412+00
8	Doceria Ana	doceriaana@gmail.com	data:image/jpeg;base64,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	$2b$10$Teu0a9uXrY8g8cDBlIm17eNVbitaCGDQlPUil8KXywNl6vsXQKv.m	Rio de Janeiro	19	2022-10-10 20:42:55.332031+00
9	Boa Pizza	boapizza@gmail.com	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9IfNp4uwBsQmA0Buen7HtFyS-FgStSWq6y6Ux_F1aWiDAOznyF15kArh1Vfx-vSXdGnQ&usqp=CAU	$2b$10$R8zf4YVqhmjUuEwFxH3j6OgMHuveLdTCCIq81lCi8K2q.6Up3b7iu	Acrelândia	1	2022-10-10 21:00:05.449769+00
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: zavbcrupzeqifv
--

COPY public.states (id, name, "createdAt") FROM stdin;
2	Alagoas	2022-10-10 13:50:21.538081+00
3	Amazonas	2022-10-10 13:50:21.538081+00
4	Amapá	2022-10-10 13:50:21.538081+00
5	Bahia	2022-10-10 13:50:21.538081+00
6	Ceará	2022-10-10 13:50:21.538081+00
7	Distrito Federal	2022-10-10 13:50:21.538081+00
8	Espírito Santo	2022-10-10 13:50:21.538081+00
9	Goiás	2022-10-10 13:50:21.538081+00
10	Maranhão	2022-10-10 13:50:21.538081+00
11	Minas Gerais	2022-10-10 13:50:21.538081+00
12	Mato Grosso do Sul	2022-10-10 13:50:21.538081+00
13	Mato Grosso	2022-10-10 13:50:21.538081+00
14	Pará	2022-10-10 13:50:21.538081+00
15	Paraíba	2022-10-10 13:50:21.538081+00
16	Pernambuco	2022-10-10 13:50:21.538081+00
17	Piauí	2022-10-10 13:50:21.538081+00
18	Paraná	2022-10-10 13:50:21.538081+00
19	Rio de Janeiro	2022-10-10 13:50:21.538081+00
20	Rio Grande do Norte	2022-10-10 13:50:21.538081+00
21	Rondônia	2022-10-10 13:50:21.538081+00
22	Roraima	2022-10-10 13:50:21.538081+00
23	Rio Grande do Sul	2022-10-10 13:50:21.538081+00
24	Santa Catarina	2022-10-10 13:50:21.538081+00
25	Sergipe	2022-10-10 13:50:21.538081+00
26	São Paulo	2022-10-10 13:50:21.538081+00
27	Tocantins	2022-10-10 13:50:21.538081+00
1	Acre	2022-10-10 21:00:01.47468+00
\.


--
-- Name: cartProducts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public."cartProducts_id_seq"', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public.clients_id_seq', 2, true);


--
-- Name: orderProducts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public."orderProducts_id_seq"', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: productTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public."productTypes_id_seq"', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 9, true);


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zavbcrupzeqifv
--

SELECT pg_catalog.setval('public.states_id_seq', 1, false);


--
-- Name: cartProducts cartProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."cartProducts"
    ADD CONSTRAINT "cartProducts_pkey" PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: clients clients_email_key; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orderProducts orderProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."orderProducts"
    ADD CONSTRAINT "orderProducts_pkey" PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: productTypes productTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."productTypes"
    ADD CONSTRAINT "productTypes_pkey" PRIMARY KEY (id);


--
-- Name: productTypes productTypes_type_key; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."productTypes"
    ADD CONSTRAINT "productTypes_type_key" UNIQUE (type);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: restaurants restaurants_email_key; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_email_key UNIQUE (email);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- Name: cartProducts cartProducts_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."cartProducts"
    ADD CONSTRAINT "cartProducts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public.carts(id);


--
-- Name: carts carts_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: orderProducts orderProducts_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public."orderProducts"
    ADD CONSTRAINT "orderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: products products_restaurantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public.restaurants(id);


--
-- Name: products products_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."productTypes"(id);


--
-- Name: restaurants restaurants_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zavbcrupzeqifv
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT "restaurants_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states(id);


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: uci73ftoa4sipi
--

GRANT USAGE ON SCHEMA heroku_ext TO zavbcrupzeqifv;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: zavbcrupzeqifv
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO zavbcrupzeqifv;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO zavbcrupzeqifv;


--
-- PostgreSQL database dump complete
--

