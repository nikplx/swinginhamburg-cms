--
-- PostgreSQL database dump
--

\restrict DeFcyQMQKZTH9BubbvgX7vXjC5Gwf1kC33EqMuxDh6z8eM1Te7aHbIah2mthMd4

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.schools_rels DROP CONSTRAINT IF EXISTS schools_rels_teachers_fk;
ALTER TABLE IF EXISTS ONLY public.schools_rels DROP CONSTRAINT IF EXISTS schools_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_users_fk;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_users_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_teachers_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_schools_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_media_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_classes_fk;
ALTER TABLE IF EXISTS ONLY public.index_locales DROP CONSTRAINT IF EXISTS index_locales_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.classes DROP CONSTRAINT IF EXISTS classes_school_id_schools_id_fk;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_teachers_fk;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_parent_fk;
DROP INDEX IF EXISTS public.users_updated_at_idx;
DROP INDEX IF EXISTS public.users_sessions_parent_id_idx;
DROP INDEX IF EXISTS public.users_sessions_order_idx;
DROP INDEX IF EXISTS public.users_email_idx;
DROP INDEX IF EXISTS public.users_created_at_idx;
DROP INDEX IF EXISTS public.teachers_updated_at_idx;
DROP INDEX IF EXISTS public.teachers_created_at_idx;
DROP INDEX IF EXISTS public.schools_updated_at_idx;
DROP INDEX IF EXISTS public.schools_rels_teachers_id_idx;
DROP INDEX IF EXISTS public.schools_rels_path_idx;
DROP INDEX IF EXISTS public.schools_rels_parent_idx;
DROP INDEX IF EXISTS public.schools_rels_order_idx;
DROP INDEX IF EXISTS public.schools_created_at_idx;
DROP INDEX IF EXISTS public.payload_preferences_updated_at_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_users_id_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_path_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_parent_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_order_idx;
DROP INDEX IF EXISTS public.payload_preferences_key_idx;
DROP INDEX IF EXISTS public.payload_preferences_created_at_idx;
DROP INDEX IF EXISTS public.payload_migrations_updated_at_idx;
DROP INDEX IF EXISTS public.payload_migrations_created_at_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_updated_at_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_users_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_teachers_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_schools_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_path_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_parent_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_order_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_media_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_classes_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_global_slug_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_created_at_idx;
DROP INDEX IF EXISTS public.payload_kv_key_idx;
DROP INDEX IF EXISTS public.media_updated_at_idx;
DROP INDEX IF EXISTS public.media_filename_idx;
DROP INDEX IF EXISTS public.media_created_at_idx;
DROP INDEX IF EXISTS public.index_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.classes_updated_at_idx;
DROP INDEX IF EXISTS public.classes_school_idx;
DROP INDEX IF EXISTS public.classes_rels_teachers_id_idx;
DROP INDEX IF EXISTS public.classes_rels_path_idx;
DROP INDEX IF EXISTS public.classes_rels_parent_idx;
DROP INDEX IF EXISTS public.classes_rels_order_idx;
DROP INDEX IF EXISTS public.classes_created_at_idx;
ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.teachers DROP CONSTRAINT IF EXISTS teachers_pkey;
ALTER TABLE IF EXISTS ONLY public.schools_rels DROP CONSTRAINT IF EXISTS schools_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.schools DROP CONSTRAINT IF EXISTS schools_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_preferences DROP CONSTRAINT IF EXISTS payload_preferences_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_migrations DROP CONSTRAINT IF EXISTS payload_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents DROP CONSTRAINT IF EXISTS payload_locked_documents_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_kv DROP CONSTRAINT IF EXISTS payload_kv_pkey;
ALTER TABLE IF EXISTS ONLY public.media DROP CONSTRAINT IF EXISTS media_pkey;
ALTER TABLE IF EXISTS ONLY public.index DROP CONSTRAINT IF EXISTS index_pkey;
ALTER TABLE IF EXISTS ONLY public.index_locales DROP CONSTRAINT IF EXISTS index_locales_pkey;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.classes DROP CONSTRAINT IF EXISTS classes_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.teachers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.schools_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.schools ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_preferences_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_preferences ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_locked_documents_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_locked_documents ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_kv ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.index_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.index ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.classes_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.classes ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users_sessions;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.teachers_id_seq;
DROP TABLE IF EXISTS public.teachers;
DROP SEQUENCE IF EXISTS public.schools_rels_id_seq;
DROP TABLE IF EXISTS public.schools_rels;
DROP SEQUENCE IF EXISTS public.schools_id_seq;
DROP TABLE IF EXISTS public.schools;
DROP SEQUENCE IF EXISTS public.payload_preferences_rels_id_seq;
DROP TABLE IF EXISTS public.payload_preferences_rels;
DROP SEQUENCE IF EXISTS public.payload_preferences_id_seq;
DROP TABLE IF EXISTS public.payload_preferences;
DROP SEQUENCE IF EXISTS public.payload_migrations_id_seq;
DROP TABLE IF EXISTS public.payload_migrations;
DROP SEQUENCE IF EXISTS public.payload_locked_documents_rels_id_seq;
DROP TABLE IF EXISTS public.payload_locked_documents_rels;
DROP SEQUENCE IF EXISTS public.payload_locked_documents_id_seq;
DROP TABLE IF EXISTS public.payload_locked_documents;
DROP SEQUENCE IF EXISTS public.payload_kv_id_seq;
DROP TABLE IF EXISTS public.payload_kv;
DROP SEQUENCE IF EXISTS public.media_id_seq;
DROP TABLE IF EXISTS public.media;
DROP SEQUENCE IF EXISTS public.index_locales_id_seq;
DROP TABLE IF EXISTS public.index_locales;
DROP SEQUENCE IF EXISTS public.index_id_seq;
DROP TABLE IF EXISTS public.index;
DROP SEQUENCE IF EXISTS public.classes_rels_id_seq;
DROP TABLE IF EXISTS public.classes_rels;
DROP SEQUENCE IF EXISTS public.classes_id_seq;
DROP TABLE IF EXISTS public.classes;
DROP TYPE IF EXISTS public.enum_classes_weekday;
DROP TYPE IF EXISTS public._locales;
--
-- Name: _locales; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public._locales AS ENUM (
    'en',
    'de'
);


ALTER TYPE public._locales OWNER TO postgres;

--
-- Name: enum_classes_weekday; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_classes_weekday AS ENUM (
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
);


ALTER TYPE public.enum_classes_weekday OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    weekday public.enum_classes_weekday NOT NULL,
    cancelled character varying,
    school_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.classes OWNER TO postgres;

--
-- Name: classes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.classes_id_seq OWNER TO postgres;

--
-- Name: classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;


--
-- Name: classes_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    teachers_id integer
);


ALTER TABLE public.classes_rels OWNER TO postgres;

--
-- Name: classes_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.classes_rels_id_seq OWNER TO postgres;

--
-- Name: classes_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_rels_id_seq OWNED BY public.classes_rels.id;


--
-- Name: index; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.index (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.index OWNER TO postgres;

--
-- Name: index_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.index_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.index_id_seq OWNER TO postgres;

--
-- Name: index_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.index_id_seq OWNED BY public.index.id;


--
-- Name: index_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.index_locales (
    intro jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL,
    donation jsonb,
    donation_box jsonb,
    disclaimer jsonb,
    subtitle character varying,
    learn_header character varying,
    learn_description character varying
);


ALTER TABLE public.index_locales OWNER TO postgres;

--
-- Name: index_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.index_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.index_locales_id_seq OWNER TO postgres;

--
-- Name: index_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.index_locales_id_seq OWNED BY public.index_locales.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_id_seq OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


ALTER TABLE public.payload_kv OWNER TO postgres;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_kv_id_seq OWNER TO postgres;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    classes_id integer,
    schools_id integer,
    teachers_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_migrations_id_seq OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: schools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schools (
    id integer NOT NULL,
    name character varying NOT NULL,
    description jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.schools OWNER TO postgres;

--
-- Name: schools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schools_id_seq OWNER TO postgres;

--
-- Name: schools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schools_id_seq OWNED BY public.schools.id;


--
-- Name: schools_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schools_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    teachers_id integer
);


ALTER TABLE public.schools_rels OWNER TO postgres;

--
-- Name: schools_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schools_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schools_rels_id_seq OWNER TO postgres;

--
-- Name: schools_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schools_rels_id_seq OWNED BY public.schools_rels.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying NOT NULL,
    description jsonb,
    email character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teachers_id_seq OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    enable_a_p_i_key boolean,
    api_key character varying,
    api_key_index character varying,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO postgres;

--
-- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


--
-- Name: classes_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_rels ALTER COLUMN id SET DEFAULT nextval('public.classes_rels_id_seq'::regclass);


--
-- Name: index id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.index ALTER COLUMN id SET DEFAULT nextval('public.index_id_seq'::regclass);


--
-- Name: index_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.index_locales ALTER COLUMN id SET DEFAULT nextval('public.index_locales_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: schools id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools ALTER COLUMN id SET DEFAULT nextval('public.schools_id_seq'::regclass);


--
-- Name: schools_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_rels ALTER COLUMN id SET DEFAULT nextval('public.schools_rels_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes (id, title, description, weekday, cancelled, school_id, updated_at, created_at) FROM stdin;
1	Beginner 1	Lindy Hop	Monday	\N	1	2026-03-24 17:16:07.892+00	2026-03-24 17:16:07.892+00
2	Intermediate	Lindy Hop	Monday	\N	1	2026-03-24 17:16:26.976+00	2026-03-24 17:16:26.976+00
3	Improver	Lindy Hop	Friday	\N	1	2026-03-24 17:16:48.907+00	2026-03-24 17:16:48.907+00
4	Solo Jazz	Classic Routines	Wednesday	\N	2	2026-03-24 17:35:05.596+00	2026-03-24 17:35:05.596+00
\.


--
-- Data for Name: classes_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes_rels (id, "order", parent_id, path, teachers_id) FROM stdin;
1	1	1	teachers	3
2	1	2	teachers	4
3	2	2	teachers	5
4	1	3	teachers	3
5	2	3	teachers	1
6	3	3	teachers	2
7	1	4	teachers	2
\.


--
-- Data for Name: index; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.index (id, updated_at, created_at) FROM stdin;
1	2026-03-24 16:06:26.195+00	2026-03-24 15:29:46.122+00
\.


--
-- Data for Name: index_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.index_locales (intro, id, _locale, _parent_id, donation, donation_box, disclaimer, subtitle, learn_header, learn_description) FROM stdin;
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Swing in ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Hamburg", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " lists all of the regular Swing Dance classes in Hamburg which teach ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "69c2b2c717be3f4a0b6fd8e5", "type": "link", "fields": {"url": "https://de.wikipedia.org/wiki/Lindy_Hop", "newTab": false, "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "Liny Hop", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": ", Charleston, Balboa, Blues, Shag, Tap and ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Authentic", "type": "text", "style": "", "detail": 0, "format": 8, "version": 1}, {"mode": "normal", "text": " Jazz. It also lists all of the opportunities for Social Dancing to vintage jazz music.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	18	en	1	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Did we forget something? Contact us at ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "69c2b79d3b58ac3bc22b2930", "type": "link", "fields": {"url": "mailto:team@swinginhamburg.de", "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "team@swinginhamburg.de", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": ".", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "If you find Swing in Hamburg useful, please consider making a contribution to hosting costs:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Please note: The listings below are only a guide. Always check the source website before making any plans", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	 LISTINGS OF LINDY HOP CLASSES AND SOCIALS IN HAMBURG 	Learn Lindy Hop!	Weekly Classes
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Swing in ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Hamburg", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " listet alle regelmäßigen Swing Dance Kurse in Hamburg bei denen Lindy Hop, Charleston, Balboa, Blues, Shag, Tap und Authentic Jazz gelehrt wird. Ebenso listen wir Social Dance Veranstaltungen bei denen zu vintage Jazz Music getanzt wird.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	19	de	1	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Haben wir etwas vergessen? Schreibt uns eine Mail an ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "autolink", "fields": {"url": "mailto:team@swinginhamburg.de", "linkType": "custom"}, "format": "", "indent": 0, "version": 2, "children": [{"mode": "normal", "text": "team@swinginhamburg.de", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": ".", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Findest du Swing in Hamburg hilfreich? Unterstütze uns mit einer Spende:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bitte beachte: All angaben ohne Gewähr. Bitte checke die Website der Anbieter für aktuelle Informationen. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	Lindy Hop Kurse und Socials in Hamburg	LIndy hop lernen!	Wöchentliche Kurse
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
10	\N	2026-03-24 16:57:59.046+00	2026-03-24 16:56:35.329+00
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, classes_id, schools_id, teachers_id) FROM stdin;
10	\N	10	document	1	\N	\N	\N	\N
11	\N	10	user	1	\N	\N	\N	\N
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-03-24 17:42:22.131+00	2026-03-24 15:10:59.203+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
4	global-index	{"editViewType": "default"}	2026-03-24 15:20:24.197+00	2026-03-24 15:20:24.198+00
6	collection-users	{"limit": 10, "editViewType": "default"}	2026-03-24 17:00:20.944+00	2026-03-24 16:56:31.097+00
7	collection-media	{}	2026-03-24 17:01:49.883+00	2026-03-24 17:01:49.883+00
2	collection-schools	{"editViewType": "default"}	2026-03-24 17:14:26.428+00	2026-03-24 15:11:56.175+00
3	collection-teachers	{"limit": 10, "editViewType": "default"}	2026-03-24 17:38:54.055+00	2026-03-24 15:11:58.139+00
1	collection-classes	{"limit": 10, "editViewType": "default"}	2026-03-24 17:42:22.153+00	2026-03-24 15:11:54.641+00
5	locale	"de"	2026-03-24 17:42:35.831+00	2026-03-24 16:31:42.432+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
4	\N	4	user	1
8	\N	6	user	1
9	\N	7	user	1
12	\N	2	user	1
15	\N	3	user	1
16	\N	1	user	1
18	\N	5	user	1
\.


--
-- Data for Name: schools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools (id, name, description, updated_at, created_at) FROM stdin;
1	Dance Emotion	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lindy Hop school focused on feeling and flow.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	2026-03-24 17:15:04.684+00	2026-03-24 17:15:04.684+00
2	Swingwerkstatt	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Älteste Swing-Tanzschule Hamburgs.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	2026-03-24 17:34:36.235+00	2026-03-24 17:34:36.235+00
\.


--
-- Data for Name: schools_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools_rels (id, "order", parent_id, path, teachers_id) FROM stdin;
1	1	2	teachers	2
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, name, description, email, updated_at, created_at) FROM stdin;
1	Anika	\N	\N	2026-03-24 17:15:15.862+00	2026-03-24 17:15:15.862+00
2	Matthias	\N	\N	2026-03-24 17:15:24.872+00	2026-03-24 17:15:24.872+00
3	Fabi	\N	\N	2026-03-24 17:15:30.354+00	2026-03-24 17:15:30.354+00
4	Almut	\N	\N	2026-03-24 17:15:36.207+00	2026-03-24 17:15:36.207+00
5	Niklas	\N	\N	2026-03-24 17:15:40.743+00	2026-03-24 17:15:40.743+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, updated_at, created_at, enable_a_p_i_key, api_key, api_key_index, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2026-03-24 15:11:18.747+00	2026-03-24 15:11:18.745+00	\N	\N	\N	test@test.de	\N	\N	47e9a9a9fd97d9eb04c7b52c1da0adb4862e1f56585e9869332fda6608a91fa1	36d2d8d651212a2cf23109107e090201c7eefc90a02cee8344447773fe207c2a6e96c8ca9867d9330b161c47b7cd865113b7eeaf611f178a8873d0c5692ff4886c1c7ce816555aa10bf3efadcd6f5233f8b77bbc7e271ed68cc5a9beb31242ef983e85c111bcda3dc66b08d26a7d0c2ed6fc27f5417223874d339818d0ba7b0501dcdcd344403f7bd31a37deed3610e8cb4be228014ff58055d61cf38f93e791c3a980551d3acadc356a2733b92568674e1a6d495be0c061f35a204e225541cc41452c88454e729f837c7b61323520c4fa7102c5a1c24e5cfd98ca8825f5a257323db86443e49d311eecb2b77da4cec3f0d35a355df50f9496e88da9b2cc5fa9c77351346b273df610c0b896ee9b17e56973b49bd5c23337936ca0607a7da88426250ec0f7d98e54c14fc2cb17a1dbfdf19242127392b1f3384dd83099edc7e0623fff445e2ba7f03328488c4644636a15f58035c0530491689902bd204f202428ae2ce14937fa15e2ce64a7f7e42d098f3882eafbb7fe5bb9fd07f9054e26b73072ce3d224634c1f213e7ef1a60b4e51dea24b83a89f890d797a2e51c6ef4d7b2d42bc31c1bb78f20ad394cd27ecc90b88b62c7c69c12011d4d2470512a4f9674f54e02240fddeb9cc3d5f6d5d9659be4b91d3304c49773a4c9d09c53bf4c1e85420d11d80969853b0af3f065c81cd1a8598569f909eeb318f8b9d0f6c63fdf	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	1f651e77-c454-4111-bfa0-0e1b80fec35d	2026-03-24 15:11:18.793+00	2026-03-24 19:10:41.669+00
\.


--
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_id_seq', 4, true);


--
-- Name: classes_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_rels_id_seq', 7, true);


--
-- Name: index_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.index_id_seq', 1, true);


--
-- Name: index_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.index_locales_id_seq', 19, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 1, false);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 16, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 17, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 7, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 18, true);


--
-- Name: schools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_id_seq', 2, true);


--
-- Name: schools_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_rels_id_seq', 1, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);


--
-- Name: classes_rels classes_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_rels
    ADD CONSTRAINT classes_rels_pkey PRIMARY KEY (id);


--
-- Name: index_locales index_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.index_locales
    ADD CONSTRAINT index_locales_pkey PRIMARY KEY (id);


--
-- Name: index index_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.index
    ADD CONSTRAINT index_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (id);


--
-- Name: schools_rels schools_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_rels
    ADD CONSTRAINT schools_rels_pkey PRIMARY KEY (id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: classes_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_created_at_idx ON public.classes USING btree (created_at);


--
-- Name: classes_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_rels_order_idx ON public.classes_rels USING btree ("order");


--
-- Name: classes_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_rels_parent_idx ON public.classes_rels USING btree (parent_id);


--
-- Name: classes_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_rels_path_idx ON public.classes_rels USING btree (path);


--
-- Name: classes_rels_teachers_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_rels_teachers_id_idx ON public.classes_rels USING btree (teachers_id);


--
-- Name: classes_school_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_school_idx ON public.classes USING btree (school_id);


--
-- Name: classes_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_updated_at_idx ON public.classes USING btree (updated_at);


--
-- Name: index_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_locales_locale_parent_id_unique ON public.index_locales USING btree (_locale, _parent_id);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_classes_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_classes_id_idx ON public.payload_locked_documents_rels USING btree (classes_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_schools_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_schools_id_idx ON public.payload_locked_documents_rels USING btree (schools_id);


--
-- Name: payload_locked_documents_rels_teachers_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_teachers_id_idx ON public.payload_locked_documents_rels USING btree (teachers_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: schools_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_created_at_idx ON public.schools USING btree (created_at);


--
-- Name: schools_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_rels_order_idx ON public.schools_rels USING btree ("order");


--
-- Name: schools_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_rels_parent_idx ON public.schools_rels USING btree (parent_id);


--
-- Name: schools_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_rels_path_idx ON public.schools_rels USING btree (path);


--
-- Name: schools_rels_teachers_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_rels_teachers_id_idx ON public.schools_rels USING btree (teachers_id);


--
-- Name: schools_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_updated_at_idx ON public.schools USING btree (updated_at);


--
-- Name: teachers_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teachers_created_at_idx ON public.teachers USING btree (created_at);


--
-- Name: teachers_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teachers_updated_at_idx ON public.teachers USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: classes_rels classes_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_rels
    ADD CONSTRAINT classes_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.classes(id) ON DELETE CASCADE;


--
-- Name: classes_rels classes_rels_teachers_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_rels
    ADD CONSTRAINT classes_rels_teachers_fk FOREIGN KEY (teachers_id) REFERENCES public.teachers(id) ON DELETE CASCADE;


--
-- Name: classes classes_school_id_schools_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_school_id_schools_id_fk FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE SET NULL;


--
-- Name: index_locales index_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.index_locales
    ADD CONSTRAINT index_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.index(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_classes_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_classes_fk FOREIGN KEY (classes_id) REFERENCES public.classes(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_schools_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_schools_fk FOREIGN KEY (schools_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_teachers_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_teachers_fk FOREIGN KEY (teachers_id) REFERENCES public.teachers(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: schools_rels schools_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_rels
    ADD CONSTRAINT schools_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: schools_rels schools_rels_teachers_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_rels
    ADD CONSTRAINT schools_rels_teachers_fk FOREIGN KEY (teachers_id) REFERENCES public.teachers(id) ON DELETE CASCADE;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict DeFcyQMQKZTH9BubbvgX7vXjC5Gwf1kC33EqMuxDh6z8eM1Te7aHbIah2mthMd4

