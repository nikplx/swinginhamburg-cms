--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

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
ALTER TABLE IF EXISTS ONLY public.schools DROP CONSTRAINT IF EXISTS schools_owner_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.schools_locales DROP CONSTRAINT IF EXISTS schools_locales_parent_id_fk;
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
ALTER TABLE IF EXISTS ONLY public.classes_locales DROP CONSTRAINT IF EXISTS classes_locales_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._schools_v DROP CONSTRAINT IF EXISTS _schools_v_version_owner_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public._schools_v_rels DROP CONSTRAINT IF EXISTS _schools_v_rels_teachers_fk;
ALTER TABLE IF EXISTS ONLY public._schools_v_rels DROP CONSTRAINT IF EXISTS _schools_v_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public._schools_v DROP CONSTRAINT IF EXISTS _schools_v_parent_id_schools_id_fk;
ALTER TABLE IF EXISTS ONLY public._schools_v_locales DROP CONSTRAINT IF EXISTS _schools_v_locales_parent_id_fk;
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
DROP INDEX IF EXISTS public.schools_owner_idx;
DROP INDEX IF EXISTS public.schools_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.schools_created_at_idx;
DROP INDEX IF EXISTS public.schools__status_idx;
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
DROP INDEX IF EXISTS public.classes_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.classes_created_at_idx;
DROP INDEX IF EXISTS public._schools_v_version_version_updated_at_idx;
DROP INDEX IF EXISTS public._schools_v_version_version_owner_idx;
DROP INDEX IF EXISTS public._schools_v_version_version_created_at_idx;
DROP INDEX IF EXISTS public._schools_v_version_version__status_idx;
DROP INDEX IF EXISTS public._schools_v_updated_at_idx;
DROP INDEX IF EXISTS public._schools_v_snapshot_idx;
DROP INDEX IF EXISTS public._schools_v_rels_teachers_id_idx;
DROP INDEX IF EXISTS public._schools_v_rels_path_idx;
DROP INDEX IF EXISTS public._schools_v_rels_parent_idx;
DROP INDEX IF EXISTS public._schools_v_rels_order_idx;
DROP INDEX IF EXISTS public._schools_v_published_locale_idx;
DROP INDEX IF EXISTS public._schools_v_parent_idx;
DROP INDEX IF EXISTS public._schools_v_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public._schools_v_latest_idx;
DROP INDEX IF EXISTS public._schools_v_created_at_idx;
ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.teachers DROP CONSTRAINT IF EXISTS teachers_pkey;
ALTER TABLE IF EXISTS ONLY public.schools_rels DROP CONSTRAINT IF EXISTS schools_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.schools DROP CONSTRAINT IF EXISTS schools_pkey;
ALTER TABLE IF EXISTS ONLY public.schools_locales DROP CONSTRAINT IF EXISTS schools_locales_pkey;
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
ALTER TABLE IF EXISTS ONLY public.classes_locales DROP CONSTRAINT IF EXISTS classes_locales_pkey;
ALTER TABLE IF EXISTS ONLY public._schools_v_rels DROP CONSTRAINT IF EXISTS _schools_v_rels_pkey;
ALTER TABLE IF EXISTS ONLY public._schools_v DROP CONSTRAINT IF EXISTS _schools_v_pkey;
ALTER TABLE IF EXISTS ONLY public._schools_v_locales DROP CONSTRAINT IF EXISTS _schools_v_locales_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.teachers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.schools_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.schools_locales ALTER COLUMN id DROP DEFAULT;
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
ALTER TABLE IF EXISTS public.classes_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.classes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._schools_v_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._schools_v_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._schools_v ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users_sessions;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.teachers_id_seq;
DROP TABLE IF EXISTS public.teachers;
DROP SEQUENCE IF EXISTS public.schools_rels_id_seq;
DROP TABLE IF EXISTS public.schools_rels;
DROP SEQUENCE IF EXISTS public.schools_locales_id_seq;
DROP TABLE IF EXISTS public.schools_locales;
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
DROP SEQUENCE IF EXISTS public.classes_locales_id_seq;
DROP TABLE IF EXISTS public.classes_locales;
DROP SEQUENCE IF EXISTS public.classes_id_seq;
DROP TABLE IF EXISTS public.classes;
DROP SEQUENCE IF EXISTS public._schools_v_rels_id_seq;
DROP TABLE IF EXISTS public._schools_v_rels;
DROP SEQUENCE IF EXISTS public._schools_v_locales_id_seq;
DROP TABLE IF EXISTS public._schools_v_locales;
DROP SEQUENCE IF EXISTS public._schools_v_id_seq;
DROP TABLE IF EXISTS public._schools_v;
DROP TYPE IF EXISTS public.enum_users_role;
DROP TYPE IF EXISTS public.enum_schools_status;
DROP TYPE IF EXISTS public.enum_classes_weekday;
DROP TYPE IF EXISTS public.enum__schools_v_version_status;
DROP TYPE IF EXISTS public.enum__schools_v_published_locale;
DROP TYPE IF EXISTS public._locales;
DROP EXTENSION IF EXISTS vector;
DROP EXTENSION IF EXISTS postgis;
--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: _locales; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public._locales AS ENUM (
    'en',
    'de'
);


ALTER TYPE public._locales OWNER TO postgres;

--
-- Name: enum__schools_v_published_locale; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__schools_v_published_locale AS ENUM (
    'en',
    'de'
);


ALTER TYPE public.enum__schools_v_published_locale OWNER TO postgres;

--
-- Name: enum__schools_v_version_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__schools_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__schools_v_version_status OWNER TO postgres;

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

--
-- Name: enum_schools_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_schools_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_schools_status OWNER TO postgres;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'system',
    'admin',
    'writer',
    'school',
    'guest'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _schools_v; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._schools_v (
    id integer NOT NULL,
    parent_id integer,
    version_name character varying,
    version_website character varying,
    version_owner_id integer,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__schools_v_version_status DEFAULT 'draft'::public.enum__schools_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__schools_v_published_locale,
    latest boolean
);


ALTER TABLE public._schools_v OWNER TO postgres;

--
-- Name: _schools_v_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._schools_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public._schools_v_id_seq OWNER TO postgres;

--
-- Name: _schools_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._schools_v_id_seq OWNED BY public._schools_v.id;


--
-- Name: _schools_v_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._schools_v_locales (
    version_description jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


ALTER TABLE public._schools_v_locales OWNER TO postgres;

--
-- Name: _schools_v_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._schools_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public._schools_v_locales_id_seq OWNER TO postgres;

--
-- Name: _schools_v_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._schools_v_locales_id_seq OWNED BY public._schools_v_locales.id;


--
-- Name: _schools_v_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._schools_v_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    teachers_id integer
);


ALTER TABLE public._schools_v_rels OWNER TO postgres;

--
-- Name: _schools_v_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._schools_v_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public._schools_v_rels_id_seq OWNER TO postgres;

--
-- Name: _schools_v_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._schools_v_rels_id_seq OWNED BY public._schools_v_rels.id;


--
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    title character varying NOT NULL,
    cancelled character varying,
    school_id integer NOT NULL,
    address character varying DEFAULT 'Hamburg'::character varying NOT NULL,
    location public.geometry(Point) DEFAULT '0101000020E61000006C3F19E3C3FC234048A46DFC89C64A40'::public.geometry NOT NULL,
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
-- Name: classes_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes_locales (
    description character varying NOT NULL,
    weekday public.enum_classes_weekday NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


ALTER TABLE public.classes_locales OWNER TO postgres;

--
-- Name: classes_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.classes_locales_id_seq OWNER TO postgres;

--
-- Name: classes_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_locales_id_seq OWNED BY public.classes_locales.id;


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
    subtitle character varying,
    intro jsonb,
    donation jsonb,
    donation_box jsonb,
    disclaimer jsonb,
    learn_header character varying,
    learn_description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
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
    name character varying,
    website character varying,
    owner_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_schools_status DEFAULT 'draft'::public.enum_schools_status
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
-- Name: schools_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schools_locales (
    description jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


ALTER TABLE public.schools_locales OWNER TO postgres;

--
-- Name: schools_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schools_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schools_locales_id_seq OWNER TO postgres;

--
-- Name: schools_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schools_locales_id_seq OWNED BY public.schools_locales.id;


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
    role public.enum_users_role DEFAULT 'guest'::public.enum_users_role NOT NULL,
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
-- Name: _schools_v id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v ALTER COLUMN id SET DEFAULT nextval('public._schools_v_id_seq'::regclass);


--
-- Name: _schools_v_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_locales ALTER COLUMN id SET DEFAULT nextval('public._schools_v_locales_id_seq'::regclass);


--
-- Name: _schools_v_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_rels ALTER COLUMN id SET DEFAULT nextval('public._schools_v_rels_id_seq'::regclass);


--
-- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


--
-- Name: classes_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_locales ALTER COLUMN id SET DEFAULT nextval('public.classes_locales_id_seq'::regclass);


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
-- Name: schools_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_locales ALTER COLUMN id SET DEFAULT nextval('public.schools_locales_id_seq'::regclass);


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
-- Data for Name: _schools_v; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._schools_v (id, parent_id, version_name, version_website, version_owner_id, version_updated_at, version_created_at, version__status, created_at, updated_at, snapshot, published_locale, latest) FROM stdin;
2	1	DancE-Motion	https://www.instagram.com/dancemotion.diestel/	4	2026-04-05 14:59:44.316+00	2026-04-05 14:59:43.493+00	published	2026-04-05 14:59:44.318+00	2026-04-05 14:59:44.318+00	\N	\N	t
1	1	DancE-Motion	https://www.instagram.com/dancemotion.diestel/	4	2026-04-05 14:59:43.493+00	2026-04-05 14:59:43.493+00	draft	2026-04-05 14:59:43.496+00	2026-04-05 14:59:43.496+00	\N	\N	f
\.


--
-- Data for Name: _schools_v_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._schools_v_locales (version_description, id, _locale, _parent_id) FROM stdin;
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "MOVE & BE MOVED", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "based in Hamburg with:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨swing dance", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨dance movement therapy", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨focussing on inner growth and positive transformation through body work", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	1	de	1
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "MOVE & BE MOVED", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "based in Hamburg with:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨swing dance", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨dance movement therapy", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨focussing on inner growth and positive transformation through body work", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	2	de	2
\.


--
-- Data for Name: _schools_v_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._schools_v_rels (id, "order", parent_id, path, teachers_id) FROM stdin;
\.


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes (id, title, cancelled, school_id, address, location, updated_at, created_at) FROM stdin;
1	Begginer	\N	1	TangoMatrix, 13 A, Beim Schlump, Eimsbüttel, Hamburg, 20144, Germany	0101000020E610000007A348ADE6F323404F5C8E5720C94A40	2026-04-05 15:04:46.634+00	2026-04-05 15:01:22.93+00
2	Improver	\N	1	TangoMatrix, 13 A, Beim Schlump, Eimsbüttel, Hamburg, 20144, Germany	0101000020E610000007A348ADE6F323404F5C8E5720C94A40	2026-04-05 15:05:29.903+00	2026-04-05 15:05:18.677+00
\.


--
-- Data for Name: classes_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes_locales (description, weekday, id, _locale, _parent_id) FROM stdin;
Lindy Hop	Monday	3	en	1
Lindy Hop	Monday	4	de	1
Lindy Hop	Friday	6	en	2
Lindy Hop	Friday	7	de	2
\.


--
-- Data for Name: classes_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes_rels (id, "order", parent_id, path, teachers_id) FROM stdin;
3	1	1	teachers	1
4	2	1	teachers	2
7	1	2	teachers	1
8	2	2	teachers	2
\.


--
-- Data for Name: index; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.index (id, updated_at, created_at) FROM stdin;
1	2026-04-05 14:58:53.898+00	2026-04-05 14:58:53.898+00
\.


--
-- Data for Name: index_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.index_locales (subtitle, intro, donation, donation_box, disclaimer, learn_header, learn_description, id, _locale, _parent_id) FROM stdin;
 LISTINGS OF LINDY HOP CLASSES AND SOCIALS IN HAMBURG 	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Swing in ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Hamburg", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " lists all of the regular Swing Dance classes in Hamburg which teach ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "69c2b2c717be3f4a0b6fd8e5", "type": "link", "fields": {"url": "https://de.wikipedia.org/wiki/Lindy_Hop", "newTab": false, "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "Liny Hop", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": ", Charleston, Balboa, Blues, Shag, Tap and ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Authentic", "type": "text", "style": "", "detail": 0, "format": 8, "version": 1}, {"mode": "normal", "text": " Jazz. It also lists all of the opportunities for Social Dancing to vintage jazz music.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Did we forget something? Contact us at ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "69c2b79d3b58ac3bc22b2930", "type": "link", "fields": {"url": "mailto:team@swinginhamburg.de", "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "team@swinginhamburg.de", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": ".", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "If you find Swing in Hamburg useful, please consider making a contribution to hosting costs:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Please note: The listings below are only a guide. Always check the source website before making any plans", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	Learn Lindy Hop!	Weekly Classes	2	en	1
Lindy Hop Kurse und Socials in Hamburg	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Swing in ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Hamburg", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " listet alle regelmäßigen Swing Dance Kurse in Hamburg bei denen Lindy Hop, Charleston, Balboa, Blues, Shag, Tap und Authentic Jazz gelehrt wird. Ebenso listen wir Social Dance Veranstaltungen bei denen zu vintage Jazz Music getanzt wird.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Haben wir etwas vergessen? Schreibt uns eine Mail an ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "autolink", "fields": {"url": "mailto:team@swinginhamburg.de", "linkType": "custom"}, "format": "", "indent": 0, "version": 2, "children": [{"mode": "normal", "text": "team@swinginhamburg.de", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": ".", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Findest du Swing in Hamburg hilfreich? Unterstütze uns mit einer Spende:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Findest du Swing in Hamburg hilfreich? Unterstütze uns mit einer Spende:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	Lindy hop lernen!	Wöchtentliche Kurse	3	de	1
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
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, classes_id, schools_id, teachers_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-04-05 14:24:42.783+00	2026-04-05 14:24:42.783+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
1	collection-users	{"limit": 10, "editViewType": "default"}	2026-04-05 14:25:09.094+00	2026-04-05 14:25:03.397+00
2	collection-media	{}	2026-04-05 14:58:14.286+00	2026-04-05 14:58:14.285+00
4	global-index	{"editViewType": "default"}	2026-04-05 14:58:32.007+00	2026-04-05 14:58:32.008+00
7	collection-teachers	{"editViewType": "default"}	2026-04-05 15:02:09.363+00	2026-04-05 15:02:07.648+00
3	collection-classes	{"limit": 10, "editViewType": "default"}	2026-04-05 15:03:32.55+00	2026-04-05 14:58:15.028+00
6	collection-schools	{"limit": 10, "editViewType": "default"}	2026-04-05 15:03:41.456+00	2026-04-05 14:59:18.276+00
5	locale	"en"	2026-04-05 15:05:32.387+00	2026-04-05 14:58:55.465+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
3	\N	1	user	1
4	\N	2	user	1
6	\N	4	user	1
12	\N	7	user	1
13	\N	3	user	1
14	\N	6	user	1
17	\N	5	user	1
\.


--
-- Data for Name: schools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools (id, name, website, owner_id, updated_at, created_at, _status) FROM stdin;
1	DancE-Motion	https://www.instagram.com/dancemotion.diestel/	4	2026-04-05 14:59:44.316+00	2026-04-05 14:59:43.493+00	published
\.


--
-- Data for Name: schools_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools_locales (description, id, _locale, _parent_id) FROM stdin;
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "MOVE & BE MOVED", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "based in Hamburg with:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨swing dance", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨dance movement therapy", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "✨focussing on inner growth and positive transformation through body work", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	2	de	1
\.


--
-- Data for Name: schools_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools_rels (id, "order", parent_id, path, teachers_id) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, name, description, email, updated_at, created_at) FROM stdin;
1	Fabi	\N	\N	2026-04-05 15:02:13.107+00	2026-04-05 15:02:13.107+00
2	Niklas	\N	\N	2026-04-05 15:02:21.798+00	2026-04-05 15:02:21.798+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, role, updated_at, created_at, enable_a_p_i_key, api_key, api_key_index, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	admin	2026-04-05 14:24:59.601+00	2026-04-05 14:24:59.59+00	\N	\N	\N	test@test.de	e7b94bb998a46eea0acbdf02d7f399af89e6a991	2026-04-05 15:24:59.596+00	f81427e751b224c06e729675fd418edca90de7125624984c49ff67693358126a	6f6600c4872bfdb56149d49f7cd49c36ac95f78ca33ffb8d149ab6d90cba1a7ef6f346b0e27cce23aa37a184420d9338634f7337b3fb591c3d1d2cc18ca27ec7b87da6f3993fe4188111f5c757f15529b7bd01bbafc4cdd45cd4d59cd09930f30333d5de6cb6dc9168aeec410d5ba5dcecd47347a60cc45d6b2457b8caee0477a5547f9a0c3364b29a79afb949d849a69b26b438d2a331982765bc85b8ae1862be4f26c11ab77ff518a90621eb7039db9d9d208744c30e2e3b4254c7f50ac2bec82b57213a938a9cfbed3db666c1612010c3dc8fe7adb26e280ceaba0df61ff8cab9f1e0bc1745d41a8fcc8d0d344451a0477e714e482d5fbb894e883ecef9ae23180a5f5559877d31e7b7e4d944d052de4e25dfb8e3cd9a833e3325b0b5050733ba4360d773bf084e09c71fd2f5429f5e8ab11ad08f112eeb9d9ddab0898173fb1f128365fae2529757c94b1fd488d35f0f586b2627c08cda329d858931040e33e99eab5f4559c3b7d695b570dff9248bdbf8de938b79358a86eee77dc9175588f60e0178d6c3a91e64634db06e16945d93dad9bb26dcc93a8d6bb34ee5b67a4ea3779b07cdea051a457bec7bfa33bcfd885f691b7a02a28873992476c4956c9ef05556ede95da1144080816477a0d7a7b10d6e8d3ee258af73ca10d652241f6ce1b643c6b80a9b8ef07a4a770ec5e7efe33aa3bdcab5c12f3fdb57b89f11fe	0	\N
2	admin	2026-04-05 14:57:18.326+00	2026-04-05 14:57:18.321+00	\N	\N	\N	admin@test.de	d2dfc7adf1fee9a2e829a3ac828771540a110e8c	2026-04-05 15:57:18.324+00	a1d177a34febfb96561a3af4cdbdb1767f5b87c03242b038f8a89ab5da6077b1	10b5b0739b9fb6b1bd59b262d9679a26fba2fa8fd7b18d2eecad55afea02d5ae890ec727cd849d389e596b7485612bc5ba33ebbdf6db0edea91b84c6ec546d521a07be58aacbd63565176e95d3e4be728b6b2fa07155cba1bec63c7abec406eb498b0e7db17c5f4b9e753320505112d5f7591be15c097f98e7e291c45fb750db98897aea878be5e6624cdee66d6a46f4d85a380457853ac31539e31b3da22890aeaf68a9afaf874517f06bcbf85cb2efef8f6c39f059cbbf61e277aff1252756eede5e12f11d084ff1cf8ce927290ee117713b187801b4a8a1e43dd36cd02993ed66a99dac01d7dc7753af408e5268c4e164c245e35c2bf345aaf15131b74f6e9dfdb4136a61cb8f0d55a22661810956404100faa35129b8c8a23994af7edabc646a482440220d291dada1d4344a8eebfb3393406ca1ea6172a86e35c215657d773953c49d2d6d4b1042d486fece50494ee4245254dbfbe2d6aa919e6a0e9569fe8a69eac9b8353c04816caab94b406002bb8ecd16caec7b1f5c7e51529b67f9fe4abc5d784a1e06db567679429c5492c2d2c416cc3049294823c024e6fa0b6cc0971927bed9047bff41a4a285cd17b9885707ee47e4ed5d31351499e84bd3f46481c44e4788306e2182b57a327041a564d0de13d99eeadfa17e28475f1be91f6ba11dbda21d0399c42fb9ec65115a485c0b7e6693e3668972143071396e6bc4	0	\N
3	writer	2026-04-05 14:57:34.348+00	2026-04-05 14:57:34.343+00	\N	\N	\N	writer@test.de	ab199181371e0254f9f6a61927e687c3941eadec	2026-04-05 15:57:34.347+00	114d93a550bf647a46efa281df8212349fd8db803d4dc2a21fe67f2d1c0b260a	29605aa2741002654f7cef6e9211a98deb9359fb212fd8466ba9c739abee05e8fb58b2fcaad4b5f39d5fc9ac14bf59a87a47217c31a928eca98c2cf24b50fcbe6f4c7fcddecf42f2e520db5732326ce9505de1180b3436d8a04c71863407cd67d8fe045cedf64655018948610b5fc88f0ec77c8fb90cdffd22810c7233ba24065f2b4851f3b3df78a80e2f98a83b7c09bf38ceabca88400e32553de978a5b86c07cb7d3cabdb5424135577d5423ea7688733a21291dab28179571ce14affceecc18b0b6870aeba63c68d47942591c4caf129d9e7d11643e255a34dae8e611306d1a8e13079b97847f9254f7cf4732fe03d0026ac3241f78f92fe25457e39384e61aee2ad84d4142796eec45f0520bd94e54554e0f69d9c303846f601f1bc15c2e84d1e9876c4d94af652c4a82d2012ed28c0968e7be602bf2c4db91d5de672859eac665ef0a1faa70cdd813e8d8b613b36d3c1fd9f882e7bfa8d629644572b45ea2b128ae1e29ea3c196ba11ec03c0e43fe453d1fa5f6a825ca27f1752bb0713618b468964897a49d7f60c713b88dfd412ddded0d21bd37ccdbd68e9c60eab942ec3c3403eec45f4340c31b9064dfe416ebf5bd7ad625fdc45e0b22c03c019f9b41219aee3ac0eddbbd300b5bef2c77dd3ff7ae7306bdacd48357b61b78f0d60c962e4d16a6056a568b86a802bb1fc0bbee5c57401a6854120d140c0ae5fbf74	0	\N
4	school	2026-04-05 14:57:47.884+00	2026-04-05 14:57:47.881+00	\N	\N	\N	school@test.de	44a5180869a0479f37b28ae410b8d9b716f0305d	2026-04-05 15:57:47.883+00	ae829d0d2ae535af7c3e837fd1baaf5917f4532c999ba3ceec61a06b98572177	cd3d8a6e542238cc49c5027acb1ec92d5b1eada20ec95a2af0058a13c08cff73034003db0b078d17c603f2233519cd92ab6c1e695f96f5b5a954e82cff994e0ddd1c174c1905a1dc1e8d53c80132b798b8d042003ad404d7ed234d4d594ac2196bc5c1c0704a2114b73d4b3d2f5d5b324886b13e507f0154f8e4a4d30e331a1bbb50ba7d51143c200189b81c29e43ba550667c89fc0fccf880d2522e63800ce63db8f0a40d8679d1d0c61c9bc89cc50b26762dfeb793a8519115460faf49da05b5e2f7dda3fe1af814374cac128aa1198ea22f3901d80a5ff8b4e85fc831ce3e9de455b09c8f3aef71d1c10f8d1862f43459f7a00f3b21234e0734086480ad79c040c3a918f5411cc3d1591025e197d6b573c55a2a1dd362b9c5b512b4cd4373e156e16d4dec2cc3cd5c8bdeeb1ca4dfba1d1939c7ffdd334cda8ca316e99c1b7ea404189338e0e1806e1995622a0e64a57992dcc0d7ed61af6339211a27ecff8f279ab291640a39104b5b74f6bb524010921a3f4095ee7df7dcbcf9e35eff8ecd80e5467be6728959f1301d99fd9d67237330933f80fd0946da066540cca4ef44c3ba0288943590b046fad30d761cbfe7c0942a299f6739bb01ed73bfe2d5665614fd3d87babf100161a633c4e8c75937b2559e64f15043de77210e6784fe5549e7a4a13bbbe1a42eeacc77be88ec75c483d606a03e5d6293c4d862827b3b78	0	\N
5	system	2026-04-05 14:58:03.406+00	2026-04-05 14:58:03.401+00	t	89dca1011bd01719dd41c201d56b93d0bbef238edbd983462a6579dd1c698cb597bfd884a913ddc676f75231b3af635df67a9167	c7975d32f69099edcb631b9b3e9aa3b2c3d20dd50e84a3645c7f09aefde731e0	system@test.de	d51a11e4c0e0db4d6add69e2a74e59449b81beb7	2026-04-05 15:58:03.404+00	80ae359acf4bf645a7773b598876b01302f9aae122c64cbe5417011b1691722f	a1119d31458e30f5c34a4f1b2f233154844df12c2a8e312225e8e7107a2009d300b47a18426e79a190f6e04e2502e624d0bea086aeb4887056aba758f2380b29d9b1044937412ca58513e6b12e99eb7d5138d8a9f5cd57555c3a9f2402f928a3ba1f3c762a0492f1babee6c38439803bdf3fca3a7f95c50bad45372c4585e123406b30d1a407b0304d1e3c0568857c27cb537a2da0f9d01bc9f06b9f160dde31f8797fe0d0ab0e2ddaf9b49b51186e938524c99c9e73d615174eae8b8b3b08bd77ece2856a7b798040f289fd9a37a968a4d4e9bacc740bd0f3d31f1ed374998dfeac72748c5bd1a40b5ba6b65be05cd36df7c7ce86623154223700c13fad2af1952c1012d70eadcbb55c591f08572c3f66ff092a1706f399045e9998cc77c49a072f4fbd47320cfa64a499f7f8ba4f8cd518d8216ec423ea5ce3d99baddb657e97d127901534ac536f6ef35781389dc563b8b79634bbaa6b966d06aadb648c55329ac239ce94662fcbe980295137072932a76d65e9bcbefceaf9c40590f45926ecf933b813c0df13ad14f5893e6e14c5e1416291cccc88c3012414f8ee7511d8a73ffe5fd5776288ff69b0bb3fcce6f877019938fd551db55f564595e74aa8b269630ba305a4bc58cfc4bc2aa1113f76a319186e214f8812b40efa660bff694607073814cac21841a26fbb004f3492f4a92e4b47de66de0d2b26f22cad4f108a	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	af54f101-5b91-4e8b-943c-ddad75c8679d	2026-04-05 14:24:59.649+00	2026-04-05 16:24:59.649+00
\.


--
-- Name: _schools_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._schools_v_id_seq', 2, true);


--
-- Name: _schools_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._schools_v_locales_id_seq', 2, true);


--
-- Name: _schools_v_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._schools_v_rels_id_seq', 1, false);


--
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_id_seq', 2, true);


--
-- Name: classes_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_locales_id_seq', 7, true);


--
-- Name: classes_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_rels_id_seq', 8, true);


--
-- Name: index_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.index_id_seq', 1, true);


--
-- Name: index_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.index_locales_id_seq', 3, true);


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

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 5, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 8, true);


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

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 17, true);


--
-- Name: schools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_id_seq', 1, true);


--
-- Name: schools_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_locales_id_seq', 2, true);


--
-- Name: schools_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_rels_id_seq', 1, false);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: _schools_v_locales _schools_v_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_locales
    ADD CONSTRAINT _schools_v_locales_pkey PRIMARY KEY (id);


--
-- Name: _schools_v _schools_v_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v
    ADD CONSTRAINT _schools_v_pkey PRIMARY KEY (id);


--
-- Name: _schools_v_rels _schools_v_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_rels
    ADD CONSTRAINT _schools_v_rels_pkey PRIMARY KEY (id);


--
-- Name: classes_locales classes_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_locales
    ADD CONSTRAINT classes_locales_pkey PRIMARY KEY (id);


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
-- Name: schools_locales schools_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_locales
    ADD CONSTRAINT schools_locales_pkey PRIMARY KEY (id);


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
-- Name: _schools_v_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_created_at_idx ON public._schools_v USING btree (created_at);


--
-- Name: _schools_v_latest_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_latest_idx ON public._schools_v USING btree (latest);


--
-- Name: _schools_v_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX _schools_v_locales_locale_parent_id_unique ON public._schools_v_locales USING btree (_locale, _parent_id);


--
-- Name: _schools_v_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_parent_idx ON public._schools_v USING btree (parent_id);


--
-- Name: _schools_v_published_locale_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_published_locale_idx ON public._schools_v USING btree (published_locale);


--
-- Name: _schools_v_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_rels_order_idx ON public._schools_v_rels USING btree ("order");


--
-- Name: _schools_v_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_rels_parent_idx ON public._schools_v_rels USING btree (parent_id);


--
-- Name: _schools_v_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_rels_path_idx ON public._schools_v_rels USING btree (path);


--
-- Name: _schools_v_rels_teachers_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_rels_teachers_id_idx ON public._schools_v_rels USING btree (teachers_id);


--
-- Name: _schools_v_snapshot_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_snapshot_idx ON public._schools_v USING btree (snapshot);


--
-- Name: _schools_v_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_updated_at_idx ON public._schools_v USING btree (updated_at);


--
-- Name: _schools_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_version_version__status_idx ON public._schools_v USING btree (version__status);


--
-- Name: _schools_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_version_version_created_at_idx ON public._schools_v USING btree (version_created_at);


--
-- Name: _schools_v_version_version_owner_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_version_version_owner_idx ON public._schools_v USING btree (version_owner_id);


--
-- Name: _schools_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _schools_v_version_version_updated_at_idx ON public._schools_v USING btree (version_updated_at);


--
-- Name: classes_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_created_at_idx ON public.classes USING btree (created_at);


--
-- Name: classes_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX classes_locales_locale_parent_id_unique ON public.classes_locales USING btree (_locale, _parent_id);


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
-- Name: schools__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools__status_idx ON public.schools USING btree (_status);


--
-- Name: schools_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_created_at_idx ON public.schools USING btree (created_at);


--
-- Name: schools_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX schools_locales_locale_parent_id_unique ON public.schools_locales USING btree (_locale, _parent_id);


--
-- Name: schools_owner_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schools_owner_idx ON public.schools USING btree (owner_id);


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
-- Name: _schools_v_locales _schools_v_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_locales
    ADD CONSTRAINT _schools_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._schools_v(id) ON DELETE CASCADE;


--
-- Name: _schools_v _schools_v_parent_id_schools_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v
    ADD CONSTRAINT _schools_v_parent_id_schools_id_fk FOREIGN KEY (parent_id) REFERENCES public.schools(id) ON DELETE SET NULL;


--
-- Name: _schools_v_rels _schools_v_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_rels
    ADD CONSTRAINT _schools_v_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public._schools_v(id) ON DELETE CASCADE;


--
-- Name: _schools_v_rels _schools_v_rels_teachers_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v_rels
    ADD CONSTRAINT _schools_v_rels_teachers_fk FOREIGN KEY (teachers_id) REFERENCES public.teachers(id) ON DELETE CASCADE;


--
-- Name: _schools_v _schools_v_version_owner_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._schools_v
    ADD CONSTRAINT _schools_v_version_owner_id_users_id_fk FOREIGN KEY (version_owner_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: classes_locales classes_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_locales
    ADD CONSTRAINT classes_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.classes(id) ON DELETE CASCADE;


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
-- Name: schools_locales schools_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools_locales
    ADD CONSTRAINT schools_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: schools schools_owner_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_owner_id_users_id_fk FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE SET NULL;


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

