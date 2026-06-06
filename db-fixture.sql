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
ALTER TABLE IF EXISTS ONLY public.swing_locales DROP CONSTRAINT IF EXISTS swing_locales_parent_id_fk;
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
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_events_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_dances_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_classes_fk;
ALTER TABLE IF EXISTS ONLY public.index_locales DROP CONSTRAINT IF EXISTS index_locales_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.events_rels DROP CONSTRAINT IF EXISTS events_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.events_rels DROP CONSTRAINT IF EXISTS events_rels_dances_fk;
ALTER TABLE IF EXISTS ONLY public.events_locales DROP CONSTRAINT IF EXISTS events_locales_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.events DROP CONSTRAINT IF EXISTS events_background_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.dances_locales DROP CONSTRAINT IF EXISTS dances_locales_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.classes DROP CONSTRAINT IF EXISTS classes_school_id_schools_id_fk;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_teachers_fk;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_dances_fk;
ALTER TABLE IF EXISTS ONLY public.classes_locales DROP CONSTRAINT IF EXISTS classes_locales_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.about_locales DROP CONSTRAINT IF EXISTS about_locales_parent_id_fk;
DROP INDEX IF EXISTS public.users_updated_at_idx;
DROP INDEX IF EXISTS public.users_sessions_parent_id_idx;
DROP INDEX IF EXISTS public.users_sessions_order_idx;
DROP INDEX IF EXISTS public.users_email_idx;
DROP INDEX IF EXISTS public.users_created_at_idx;
DROP INDEX IF EXISTS public.teachers_updated_at_idx;
DROP INDEX IF EXISTS public.teachers_created_at_idx;
DROP INDEX IF EXISTS public.swing_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.schools_updated_at_idx;
DROP INDEX IF EXISTS public.schools_rels_teachers_id_idx;
DROP INDEX IF EXISTS public.schools_rels_path_idx;
DROP INDEX IF EXISTS public.schools_rels_parent_idx;
DROP INDEX IF EXISTS public.schools_rels_order_idx;
DROP INDEX IF EXISTS public.schools_owner_idx;
DROP INDEX IF EXISTS public.schools_locales_locale_parent_id_unique;
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
DROP INDEX IF EXISTS public.payload_locked_documents_rels_events_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_dances_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_classes_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_global_slug_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_created_at_idx;
DROP INDEX IF EXISTS public.payload_kv_key_idx;
DROP INDEX IF EXISTS public.media_updated_at_idx;
DROP INDEX IF EXISTS public.media_filename_idx;
DROP INDEX IF EXISTS public.media_created_at_idx;
DROP INDEX IF EXISTS public.index_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.events_updated_at_idx;
DROP INDEX IF EXISTS public.events_rels_path_idx;
DROP INDEX IF EXISTS public.events_rels_parent_idx;
DROP INDEX IF EXISTS public.events_rels_order_idx;
DROP INDEX IF EXISTS public.events_rels_dances_id_idx;
DROP INDEX IF EXISTS public.events_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.events_created_at_idx;
DROP INDEX IF EXISTS public.events_background_image_idx;
DROP INDEX IF EXISTS public.dances_updated_at_idx;
DROP INDEX IF EXISTS public.dances_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.dances_created_at_idx;
DROP INDEX IF EXISTS public.classes_updated_at_idx;
DROP INDEX IF EXISTS public.classes_school_idx;
DROP INDEX IF EXISTS public.classes_rels_teachers_id_idx;
DROP INDEX IF EXISTS public.classes_rels_path_idx;
DROP INDEX IF EXISTS public.classes_rels_parent_idx;
DROP INDEX IF EXISTS public.classes_rels_order_idx;
DROP INDEX IF EXISTS public.classes_rels_dances_id_idx;
DROP INDEX IF EXISTS public.classes_locales_locale_parent_id_unique;
DROP INDEX IF EXISTS public.classes_created_at_idx;
DROP INDEX IF EXISTS public.about_locales_locale_parent_id_unique;
ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.teachers DROP CONSTRAINT IF EXISTS teachers_pkey;
ALTER TABLE IF EXISTS ONLY public.swing DROP CONSTRAINT IF EXISTS swing_pkey;
ALTER TABLE IF EXISTS ONLY public.swing_locales DROP CONSTRAINT IF EXISTS swing_locales_pkey;
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
ALTER TABLE IF EXISTS ONLY public.events_rels DROP CONSTRAINT IF EXISTS events_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.events DROP CONSTRAINT IF EXISTS events_pkey;
ALTER TABLE IF EXISTS ONLY public.events_locales DROP CONSTRAINT IF EXISTS events_locales_pkey;
ALTER TABLE IF EXISTS ONLY public.dances DROP CONSTRAINT IF EXISTS dances_pkey;
ALTER TABLE IF EXISTS ONLY public.dances_locales DROP CONSTRAINT IF EXISTS dances_locales_pkey;
ALTER TABLE IF EXISTS ONLY public.classes_rels DROP CONSTRAINT IF EXISTS classes_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.classes DROP CONSTRAINT IF EXISTS classes_pkey;
ALTER TABLE IF EXISTS ONLY public.classes_locales DROP CONSTRAINT IF EXISTS classes_locales_pkey;
ALTER TABLE IF EXISTS ONLY public.about DROP CONSTRAINT IF EXISTS about_pkey;
ALTER TABLE IF EXISTS ONLY public.about_locales DROP CONSTRAINT IF EXISTS about_locales_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.teachers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.swing_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.swing ALTER COLUMN id DROP DEFAULT;
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
ALTER TABLE IF EXISTS public.events_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.events_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.dances_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.dances ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.classes_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.classes_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.classes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.about_locales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.about ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users_sessions;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.teachers_id_seq;
DROP TABLE IF EXISTS public.teachers;
DROP SEQUENCE IF EXISTS public.swing_locales_id_seq;
DROP TABLE IF EXISTS public.swing_locales;
DROP SEQUENCE IF EXISTS public.swing_id_seq;
DROP TABLE IF EXISTS public.swing;
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
DROP SEQUENCE IF EXISTS public.events_rels_id_seq;
DROP TABLE IF EXISTS public.events_rels;
DROP SEQUENCE IF EXISTS public.events_locales_id_seq;
DROP TABLE IF EXISTS public.events_locales;
DROP SEQUENCE IF EXISTS public.events_id_seq;
DROP TABLE IF EXISTS public.events;
DROP SEQUENCE IF EXISTS public.dances_locales_id_seq;
DROP TABLE IF EXISTS public.dances_locales;
DROP SEQUENCE IF EXISTS public.dances_id_seq;
DROP TABLE IF EXISTS public.dances;
DROP SEQUENCE IF EXISTS public.classes_rels_id_seq;
DROP TABLE IF EXISTS public.classes_rels;
DROP SEQUENCE IF EXISTS public.classes_locales_id_seq;
DROP TABLE IF EXISTS public.classes_locales;
DROP SEQUENCE IF EXISTS public.classes_id_seq;
DROP TABLE IF EXISTS public.classes;
DROP SEQUENCE IF EXISTS public.about_locales_id_seq;
DROP TABLE IF EXISTS public.about_locales;
DROP SEQUENCE IF EXISTS public.about_id_seq;
DROP TABLE IF EXISTS public.about;
DROP TYPE IF EXISTS public.enum_users_role;
DROP TYPE IF EXISTS public.enum_events_type;
DROP TYPE IF EXISTS public.enum_classes_weekday;
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
-- Name: enum_events_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_events_type AS ENUM (
    'Workshop',
    'Social'
);


ALTER TYPE public.enum_events_type OWNER TO postgres;

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
-- Name: about; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.about (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.about OWNER TO postgres;

--
-- Name: about_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.about_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.about_id_seq OWNER TO postgres;

--
-- Name: about_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.about_id_seq OWNED BY public.about.id;


--
-- Name: about_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.about_locales (
    title character varying,
    content jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


ALTER TABLE public.about_locales OWNER TO postgres;

--
-- Name: about_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.about_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.about_locales_id_seq OWNER TO postgres;

--
-- Name: about_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.about_locales_id_seq OWNED BY public.about_locales.id;


--
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    title character varying NOT NULL,
    cancelled character varying,
    school_id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    address character varying DEFAULT 'Hamburg'::character varying NOT NULL,
    location public.geometry(Point) DEFAULT '0101000020E61000006C3F19E3C3FC234048A46DFC89C64A40'::public.geometry NOT NULL
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
    description character varying,
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
    teachers_id integer,
    dances_id integer
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
-- Name: dances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dances (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    short_name character varying
);


ALTER TABLE public.dances OWNER TO postgres;

--
-- Name: dances_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dances_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dances_id_seq OWNER TO postgres;

--
-- Name: dances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dances_id_seq OWNED BY public.dances.id;


--
-- Name: dances_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dances_locales (
    description jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.dances_locales OWNER TO postgres;

--
-- Name: dances_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dances_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dances_locales_id_seq OWNER TO postgres;

--
-- Name: dances_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dances_locales_id_seq OWNED BY public.dances_locales.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    type public.enum_events_type NOT NULL,
    title character varying NOT NULL,
    start_date timestamp(3) with time zone NOT NULL,
    end_date timestamp(3) with time zone,
    address character varying DEFAULT 'Hamburg'::character varying NOT NULL,
    price numeric,
    cancelled character varying,
    background_image_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    start_time character varying,
    end_time character varying,
    location public.geometry(Point) DEFAULT '0101000020E61000006C3F19E3C3FC234048A46DFC89C64A40'::public.geometry NOT NULL,
    location_name character varying
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: events_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_locales (
    description jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


ALTER TABLE public.events_locales OWNER TO postgres;

--
-- Name: events_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_locales_id_seq OWNER TO postgres;

--
-- Name: events_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_locales_id_seq OWNED BY public.events_locales.id;


--
-- Name: events_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    dances_id integer
);


ALTER TABLE public.events_rels OWNER TO postgres;

--
-- Name: events_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_rels_id_seq OWNER TO postgres;

--
-- Name: events_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_rels_id_seq OWNED BY public.events_rels.id;


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
    teachers_id integer,
    dances_id integer,
    events_id integer
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
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    website character varying,
    owner_id integer
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
-- Name: swing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.swing (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.swing OWNER TO postgres;

--
-- Name: swing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.swing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.swing_id_seq OWNER TO postgres;

--
-- Name: swing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.swing_id_seq OWNED BY public.swing.id;


--
-- Name: swing_locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.swing_locales (
    title character varying,
    what_is_swing jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL,
    how_to_learn jsonb
);


ALTER TABLE public.swing_locales OWNER TO postgres;

--
-- Name: swing_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.swing_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.swing_locales_id_seq OWNER TO postgres;

--
-- Name: swing_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.swing_locales_id_seq OWNED BY public.swing_locales.id;


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
    lock_until timestamp(3) with time zone,
    role public.enum_users_role DEFAULT 'guest'::public.enum_users_role NOT NULL
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
-- Name: about id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.about ALTER COLUMN id SET DEFAULT nextval('public.about_id_seq'::regclass);


--
-- Name: about_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.about_locales ALTER COLUMN id SET DEFAULT nextval('public.about_locales_id_seq'::regclass);


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
-- Name: dances id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dances ALTER COLUMN id SET DEFAULT nextval('public.dances_id_seq'::regclass);


--
-- Name: dances_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dances_locales ALTER COLUMN id SET DEFAULT nextval('public.dances_locales_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: events_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_locales ALTER COLUMN id SET DEFAULT nextval('public.events_locales_id_seq'::regclass);


--
-- Name: events_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_rels ALTER COLUMN id SET DEFAULT nextval('public.events_rels_id_seq'::regclass);


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
-- Name: swing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.swing ALTER COLUMN id SET DEFAULT nextval('public.swing_id_seq'::regclass);


--
-- Name: swing_locales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.swing_locales ALTER COLUMN id SET DEFAULT nextval('public.swing_locales_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: about; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.about (id, updated_at, created_at) FROM stdin;
1	2026-05-10 13:10:55.862+00	2026-05-10 13:10:55.862+00
\.


--
-- Data for Name: about_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.about_locales (title, content, id, _locale, _parent_id) FROM stdin;
\N	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Über swinginhamburg.de", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In Hamburg gibt es eine große Zahl von Organisationen und Einzelpersonen, die regelmäßigen Swingtanz-Unterricht oder einmalige Workshops anbieten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "swinginhamburg.de hat das Ziel, eine Übersicht dieser Angebote zu schaffen. Die Website wird betrieben von einer Gruppe Freiwilliger aus der Hamburger Szene.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Diese Seite ist stark inspiriert von ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "69fbac52b63620000c2173ac", "type": "link", "fields": {"url": "https://", "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "swingoutlondon.co.uk", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": " — das Team dort hat eine sehr übersichtliche Seite geschaffen und in die public domain gestellt, wofür wir sehr dankbar sind.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Unsere Ziele", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Szenefokus", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir sehen uns als Info-Plattform für die Swingtanzszene, weniger als Werbeplattform für Kurse oder Events. Das bedeutet, dass wir nur solche Kurse und Workshops listen, die unsere Zielgruppe interessieren. Was dazugehört, haben wir in unserer Listings Policy zusammengefasst. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Unabhängigkeit", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir sind nicht mit Tanzschulen oder anderen Organisationen verbunden. Wir nehmen niemals Gegenleistungen an, um Organisationen oder Events zu bewerben. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Vollständigkeit", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir listen alle regelmäßigen Kurse und auch einmalige Workshops, egal welches Level und welcher Swingtanz. Die Daten werden von den Anbieter:innen gepflegt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [], "direction": null}], "direction": null}}	10	en	1
	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Über uns", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In Hamburg gibt es eine große Zahl von Organisationen und Einzelpersonen, die regelmäßigen Swingtanz-Unterricht oder einmalige Workshops anbieten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "swinginhamburg.de hat das Ziel, eine Übersicht dieser Angebote zu schaffen. Die Website wird betrieben von einer Gruppe Freiwilliger aus der Hamburger Szene.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Diese Seite ist stark inspiriert von ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "69fbac52b63620000c2173ac", "type": "link", "fields": {"url": "https://", "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "swingoutlondon.co.uk", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": " — das Team dort hat eine sehr übersichtliche Seite geschaffen und in die public domain gestellt, wofür wir sehr dankbar sind.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Unsere Ziele", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Szenefokus", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir sehen uns als Info-Plattform für die Swingtanzszene, weniger als Werbeplattform für Kurse oder Events. Das bedeutet, dass wir nur solche Kurse und Workshops listen, die unsere Zielgruppe interessieren. Was dazugehört, haben wir in unserer Listings Policy zusammengefasst. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Unabhängigkeit", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir sind nicht mit Tanzschulen oder anderen Organisationen verbunden. Wir nehmen niemals Gegenleistungen an, um Organisationen oder Events zu bewerben. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Vollständigkeit", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir listen alle regelmäßigen Kurse und auch einmalige Workshops, egal welches Level und welcher Swingtanz. Die Daten werden von den Anbieter:innen gepflegt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [], "direction": null}], "direction": null}}	11	de	1
\.


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes (id, title, cancelled, school_id, updated_at, created_at, address, location) FROM stdin;
4	Solo Jazz	\N	2	2026-06-06 09:49:27.725+00	2026-03-24 17:35:05.596+00	TangoMatrix, 13 A, Beim Schlump, Eimsbüttel, Hamburg, 20144, Germany	0101000020E610000007A348ADE6F323404F5C8E5720C94A40
3	Improver	\N	1	2026-06-06 09:49:38.437+00	2026-03-24 17:16:48.907+00	TangoMatrix, 13 A, Beim Schlump, Eimsbüttel, Hamburg, 20144, Germany	0101000020E610000007A348ADE6F323404F5C8E5720C94A40
2	Intermediate	\N	1	2026-06-06 09:49:50.097+00	2026-03-24 17:16:26.976+00	TangoMatrix, 13 A, Beim Schlump, Eimsbüttel, Hamburg, 20144, Germany	0101000020E610000007A348ADE6F323404F5C8E5720C94A40
1	Beginner 1	\N	1	2026-06-06 09:49:56.631+00	2026-03-24 17:16:07.892+00	Cotton Club, 10, Alter Steinweg, Portugiesenviertel, Neustadt, Hamburg-Mitte, Hamburg, 20459, Germany	0101000020E6100000A682E563D2F6234082ECAB6175C64A40
\.


--
-- Data for Name: classes_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes_locales (description, weekday, id, _locale, _parent_id) FROM stdin;
Classic Routines	Wednesday	21	en	4
Classic Routines	Wednesday	22	de	4
Lindy Hop	Monday	23	en	3
Lindy Hop	Monday	24	de	3
Lindy Hop	Monday	25	en	2
Lindy hop	Monday	26	de	2
Lindy Hop	Monday	27	en	1
Lindy Hop	Monday	28	de	1
\.


--
-- Data for Name: classes_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes_rels (id, "order", parent_id, path, teachers_id, dances_id) FROM stdin;
29	1	4	teachers	2	\N
30	1	4	dances	\N	6
31	1	3	teachers	3	\N
32	2	3	teachers	1	\N
33	3	3	teachers	2	\N
34	1	3	dances	\N	1
35	1	2	teachers	4	\N
36	2	2	teachers	5	\N
37	1	2	dances	\N	1
38	2	2	dances	\N	2
39	1	1	teachers	3	\N
40	1	1	dances	\N	1
41	2	1	dances	\N	2
\.


--
-- Data for Name: dances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dances (id, updated_at, created_at, short_name) FROM stdin;
2	2026-06-06 09:48:54.207+00	2026-05-25 12:49:03.825+00	Charleston
1	2026-06-06 09:48:58.815+00	2026-05-25 12:48:54.425+00	Lindy
7	2026-06-06 14:38:59.146+00	2026-05-25 12:54:25.735+00	Blues
6	2026-06-06 14:39:03.229+00	2026-05-25 12:54:14.449+00	Tap
4	2026-06-06 14:39:06.904+00	2026-05-25 12:49:32.324+00	Shag
3	2026-06-06 14:39:10.93+00	2026-05-25 12:49:19.092+00	Balboa
5	2026-06-06 17:39:07.185+00	2026-05-25 12:51:37.225+00	Solo
\.


--
-- Data for Name: dances_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dances_locales (description, id, _locale, _parent_id, name) FROM stdin;
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Charleston wird zu schneller Musik getanzt und entstand noch vor der Swingmusik. Die Haltung war anfangs an europäische Gesellschaftstänze angelehnt (20s Charleston). Mit dem Aufkommen der Swingmusik begannen einige Paare, sich beim Tanzen voneinander zu lösen (Breakaway), daraus wurde dann der Lindy Hop. Dieser spätere Charleston wird auch oft zusammen mit Lindy getanzt und vermischt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	16	de	2	Charleston
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lindy Hop ist heute der bekannteste Swingtanz und das, woran die meisten denken, wenn sie “Swingtanz” hören. Er entstand um 1927 in Harlem, NY in afroamerikanisch geprägten Ballrooms. Er ist sehr improvisierend, unernst und lässt beiden Tanzenden viel Freiraum. Egal ob wild oder ruhig, Social Dance zu zweit oder spektakuläre Performance, jede:r kann einen eigenen Stil finden, und Spielereien wie Stealing, Birthday Jams oder Jam Circles gehören fest dazu.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lindy Hop ist damit ein guter Einstieg ins Swingtanzen. Außerdem tanzen eigentlich alle Swingtänzer:innen Lindy Hop. Wer Lindy kann, findet also immer jemanden zum Tanzen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Und alle hier vorgestellten Tanzschulen unterrichten Lindy Hop, du findest also bei allen einen guten Einstieg.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	17	de	1	Lindy Hop
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Obwohl Blues kein Swingtanz ist, gehört er doch fest zur Szene. Blues beschreibt eine ganze Familie von Tänzen, die sich zu verschiedenen Musik-Stilen entwickelt haben, von minimalistisch bis zu energetisch haben sie alle aber einige Gemeinsamkeiten: Es geht nicht um kompliziertes Footwork, sondern ums Improvisieren und darum, den Rhythmus und das Gefühl der Musik in den Tanz einzubringen. Beide Tanzenden bestimmen sehr gleichberechtigt, was und wie getanzt wird.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	18	de	7	Blues
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tap (Stepptanz) ist als einziger Tanz in dieser Liste kein Social Dance — Tap ist eine Performance, die von den frühen Vaudeville-Shows über die ersten Musikfilme bis zu den Technicolor-Musicals sehr populär war. Tap erfordert viel Präzision und ausgezeichnetes Timing und ist daher ideal für alle, die eine besondere Herausforderung für Bühnenauftritte (oder auch nur für sich selbst) suchen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	19	de	6	Tap (Stepptanz)
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Collegiate Shag ist ein sehr energetischer Tanz, der durch sein federndes Footwork und die extreme Handhaltung auffällt. Wie Balboa wird Shag zu schneller Musik getanzt, bietet aber viel spektakulärere Bewegungen und sehr viel Gelegenheit zum Improvisieren.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	20	de	4	Collegiate Shag
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Balboa entstand in überfüllten Ballrooms auf Balboa Island vor Los Angeles zu schneller Musik. Er wird auf engem Raum getanzt und war anfänglich sehr minimalistisch (Pure-Bal), nahm später aber auch Einflüsse aus dem in L.A. getanzten Swing auf (Bal-Swing).", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	21	de	3	Balboa
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Solo Jazz (auch Authentic Jazz genannt)  wird allein getanzt. Solo kann man verschiedene Stile tanzen — meist an Charleston und Lindy Hop angelehnt, aber auch ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"id": "6a1445f9992249303eba5e9b", "type": "link", "fields": {"url": "https://www.youtube.com/watch?v=hYx86-1dOIY", "newTab": false, "linkType": "custom"}, "format": "", "indent": 0, "version": 3, "children": [{"mode": "normal", "text": "Blues", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"mode": "normal", "text": " lässt sich alleine tanzen. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	22	de	5	Authentic Jazz/Solo Jazz
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, type, title, start_date, end_date, address, price, cancelled, background_image_id, updated_at, created_at, start_time, end_time, location, location_name) FROM stdin;
1	Workshop	Dips & Tricks	2026-06-13 12:00:00+00	\N	TangoMatrix, 13 A, Beim Schlump, Eimsbüttel, Hamburg, 20144, Germany	3550	\N	\N	2026-06-06 14:32:53.479+00	2026-06-06 10:11:18.184+00	18:00	22:00	0101000020E610000007A348ADE6F323404F5C8E5720C94A40	TangoMatrix
\.


--
-- Data for Name: events_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_locales (description, id, _locale, _parent_id) FROM stdin;
{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This is the dips and tricks workshop", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	4	de	1
\.


--
-- Data for Name: events_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_rels (id, "order", parent_id, path, dances_id) FROM stdin;
4	1	1	dances	1
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
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, classes_id, schools_id, teachers_id, dances_id, events_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-06-06 14:31:02.203+00	2026-03-24 15:10:59.203+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
4	global-index	{"editViewType": "default"}	2026-03-24 15:20:24.197+00	2026-03-24 15:20:24.198+00
6	collection-users	{"limit": 10, "editViewType": "default"}	2026-03-24 17:00:20.944+00	2026-03-24 16:56:31.097+00
7	collection-media	{}	2026-03-24 17:01:49.883+00	2026-03-24 17:01:49.883+00
3	collection-teachers	{"limit": 10, "editViewType": "default"}	2026-03-24 17:38:54.055+00	2026-03-24 15:11:58.139+00
1	collection-classes	{"limit": 10, "editViewType": "default"}	2026-03-24 17:42:22.153+00	2026-03-24 15:11:54.641+00
8	global-about	{"editViewType": "default"}	2026-05-10 13:05:42.593+00	2026-05-10 13:05:42.595+00
9	global-swing	{"editViewType": "default"}	2026-05-10 13:10:58.291+00	2026-05-10 13:10:58.293+00
5	locale	"de"	2026-05-10 13:11:13.177+00	2026-03-24 16:31:42.432+00
10	collection-dances	{"limit": 10, "editViewType": "default"}	2026-05-25 12:55:54.811+00	2026-05-25 12:48:13.324+00
11	collection-events	{"limit": 10, "editViewType": "default"}	2026-06-06 10:06:24.269+00	2026-06-06 10:02:53.188+00
2	collection-schools	{"limit": 10, "editViewType": "default"}	2026-06-06 17:52:04.013+00	2026-03-24 15:11:56.175+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
4	\N	4	user	1
8	\N	6	user	1
9	\N	7	user	1
15	\N	3	user	1
16	\N	1	user	1
25	\N	8	user	1
27	\N	9	user	1
28	\N	5	user	1
31	\N	10	user	1
35	\N	11	user	1
36	\N	2	user	1
\.


--
-- Data for Name: schools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools (id, name, updated_at, created_at, website, owner_id) FROM stdin;
1	Dance Emotion	2026-03-24 17:15:04.684+00	2026-03-24 17:15:04.684+00	\N	\N
2	Swingwerkstatt	2026-03-24 17:34:36.235+00	2026-03-24 17:34:36.235+00	\N	\N
\.


--
-- Data for Name: schools_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools_locales (description, id, _locale, _parent_id) FROM stdin;
\.


--
-- Data for Name: schools_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schools_rels (id, "order", parent_id, path, teachers_id) FROM stdin;
1	1	2	teachers	2
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: swing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.swing (id, updated_at, created_at) FROM stdin;
1	2026-05-10 13:11:09.461+00	2026-05-10 13:11:09.461+00
\.


--
-- Data for Name: swing_locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.swing_locales (title, what_is_swing, id, _locale, _parent_id, how_to_learn) FROM stdin;
\N	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Was ist Swingtanz?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "„Swingtanz“ ist ein weit gefasster Begriff, der nicht immer klar abgegrenzt ist. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Die weiteste Definition würde sehr unterschiedliche Tänze einschließen, von heute großteils vergessenen Tänzen, die zum frühen Ragtime-Jazz entstanden, bis hin zu Electro Swing und Western Swing, die sich sehr weit von den ursprünglichen, afroamerikanisch geprägten Wurzeln entfernt haben.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Wir folgen hier dem Konsens der internationalen Szene, die sich um die Tänze der 20er bis 40er Jahre gebildet hat  — wir repräsentieren die Paartänze", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Um die Tänze der 20er bis 40er Jahre hat sich eine international vernetzte Szene gebildet, als deren Teil wir uns sehen — wir tanzen die Paartänze", "type": "text", "style": "", "detail": 0, "format": 4, "version": 1}], "direction": null, "textStyle": "", "textFormat": 4}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lindy Hop", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Charleston", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Balboa", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Collegiate Shag", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 5, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "St. Louis Shag", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}], "listType": "bullet", "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "sowie die Solotänze", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Authentic Jazz/Solo Jazz", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tap (Stepptanz)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}], "listType": "bullet", "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Alle diese Tänze haben einige Gemeinsamkeiten:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sie entstanden mit und durch den Swing, also dem als Tanzmusik gespielten Jazz des frühen 20. Jahrhunderts. Die Eigenheiten der Musik finden sich in den Bewegungen der Tänze wieder.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sie haben zwar ein bestimmtes Vokabular an Moves, es gibt aber keine Organisation, die über richtig und falsch entscheidet oder vorgibt, wie genau eine Bewegung auszusehen hat.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Auch wenn es durchaus Shows und Wettkämpfe gibt, die Swingtänze sind in ihrem Wesen „Social Dances“; sie sind kein Turniersport. Es geht nicht um Wettkämpfe oder Ranglisten, sondern darum, auf der Tanzfläche Inspiration zu finden, die eigene Persönlichkeit auszudrücken und vor allem Spaß zu haben.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}], "listType": "bullet", "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Und auch wenn Blues kein Jazz ist und Bluestanz kein Swingtanz im engeren Sinne, sind die Gemeinsamkeiten doch so groß, dass es keine wirkliche Trennung der Szenen und Veranstaltungen gibt. Wir listen daher selbstverständlich auch alle Blues-Angebote.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Was ist der Unterschied zwischen Lindy Hop, Swingtanz, Charleston usw.?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Alle oben genannten Tänze fallen unter den Oberbegriff „Swingtanz“. Am bekanntesten ist wahrscheinlich der Lindy Hop, den afroamerikanische Tänzer:innen im Harlem der späten 1920er Jahre erfunden haben — geprägt von der neuentstandenen Swingmusik und mit Einflüssen aus früheren Jazztänzen wie dem Charleston, aber auch von afrikanischen, karibischen und europäischen Volkstänzen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lindy Hop ist heute für die meisten der Einstieg in den Swingtanz. Er ist ein guter Start, um später eventuell auch in andere Swingtänze einzusteigen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wie kann ich Swingtanz lernen?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Die Swingtanz-Szene ist sehr offen und freut sich immer über alle, die Lust haben, mitzutanzen. Tatsächlich ist der Einstieg sehr leicht, du  brauchst keine Vorkenntnisse, keine besonderen Fähigkeiten oder vorhergehende Tanzerfahrung. Du musst nicht einmal eine:n Tanzpartner:in mitbringen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sowohl im normalen Unterricht als auch auf den Parties, auf Festivals und sonstigen Veranstaltungen ist es völlig normal, dass alle mit allen tanzen. Du bist also sowohl alleine als auch als Paar jederzeit willkommen, einfach mal vorbeizuschauen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir zeigen dir alle Organisationen auf, die in Hamburg Unterricht anbieten. Am besten schaust du zuerst, welche Organisationen für dich günstig gelegene Beginner-Kurse anbieten und fragst dann dort nach, wann der nächste Einstieg möglich ist.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Blocker: Swingtanz früher und heute", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Erstes Rüberschwappen, Nazizeit", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Revival in Europa und Hamburg", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	18	en	1	\N
	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Was ist Swingtanz?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "„Swingtanz“ ist ein weit gefasster Begriff, der nicht immer klar abgegrenzt ist. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Die weiteste Definition würde sehr unterschiedliche Tänze einschließen, von heute großteils vergessenen Tänzen, die zum frühen Ragtime-Jazz entstanden, bis hin zu Electro Swing und Western Swing, die sich sehr weit von den ursprünglichen, afroamerikanisch geprägten Wurzeln entfernt haben.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Wir folgen hier dem Konsens der internationalen Szene, die sich um die Tänze der 20er bis 40er Jahre gebildet hat  — wir repräsentieren die Paartänze.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Und auch wenn Blues kein Jazz ist und Bluestanz kein Swingtanz im engeren Sinne, sind die Gemeinsamkeiten doch so groß, dass es keine wirkliche Trennung der Szenen und Veranstaltungen gibt. Wir listen daher selbstverständlich auch alle Blues-Angebote.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Was ist der Unterschied zwischen Lindy Hop, Swingtanz, Charleston usw.?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Alle oben genannten Tänze fallen unter den Oberbegriff „Swingtanz“. Am bekanntesten ist wahrscheinlich der Lindy Hop, den afroamerikanische Tänzer:innen im Harlem der späten 1920er Jahre erfunden haben — geprägt von der neuentstandenen Swingmusik und mit Einflüssen aus früheren Jazztänzen wie dem Charleston, aber auch von afrikanischen, karibischen und europäischen Volkstänzen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lindy Hop ist heute für die meisten der Einstieg in den Swingtanz. Er ist ein guter Start, um später eventuell auch in andere Swingtänze einzusteigen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	19	de	1	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wie kann ich Swingtanz lernen?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Die Swingtanz-Szene ist sehr offen und freut sich immer über alle, die Lust haben, mitzutanzen. Tatsächlich ist der Einstieg sehr leicht, du  brauchst keine Vorkenntnisse, keine besonderen Fähigkeiten oder vorhergehende Tanzerfahrung. Du musst nicht einmal eine:n Tanzpartner:in mitbringen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sowohl im normalen Unterricht als auch auf den Parties, auf Festivals und sonstigen Veranstaltungen ist es völlig normal, dass alle mit allen tanzen. Du bist also sowohl alleine als auch als Paar jederzeit willkommen, einfach mal vorbeizuschauen.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wir zeigen dir alle Organisationen auf, die in Hamburg Unterricht anbieten. Am besten schaust du zuerst, welche Organisationen für dich günstig gelegene Beginner-Kurse anbieten und fragst dann dort nach, wann der nächste Einstieg möglich ist.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Blocker: Swingtanz früher und heute", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Erstes Rüberschwappen, Nazizeit", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Revival in Europa und Hamburg", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}
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

COPY public.users (id, updated_at, created_at, enable_a_p_i_key, api_key, api_key_index, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until, role) FROM stdin;
1	2026-05-10 13:09:30.553+00	2026-03-24 15:11:18.745+00	\N	\N	\N	test@test.de	\N	\N	47e9a9a9fd97d9eb04c7b52c1da0adb4862e1f56585e9869332fda6608a91fa1	36d2d8d651212a2cf23109107e090201c7eefc90a02cee8344447773fe207c2a6e96c8ca9867d9330b161c47b7cd865113b7eeaf611f178a8873d0c5692ff4886c1c7ce816555aa10bf3efadcd6f5233f8b77bbc7e271ed68cc5a9beb31242ef983e85c111bcda3dc66b08d26a7d0c2ed6fc27f5417223874d339818d0ba7b0501dcdcd344403f7bd31a37deed3610e8cb4be228014ff58055d61cf38f93e791c3a980551d3acadc356a2733b92568674e1a6d495be0c061f35a204e225541cc41452c88454e729f837c7b61323520c4fa7102c5a1c24e5cfd98ca8825f5a257323db86443e49d311eecb2b77da4cec3f0d35a355df50f9496e88da9b2cc5fa9c77351346b273df610c0b896ee9b17e56973b49bd5c23337936ca0607a7da88426250ec0f7d98e54c14fc2cb17a1dbfdf19242127392b1f3384dd83099edc7e0623fff445e2ba7f03328488c4644636a15f58035c0530491689902bd204f202428ae2ce14937fa15e2ce64a7f7e42d098f3882eafbb7fe5bb9fd07f9054e26b73072ce3d224634c1f213e7ef1a60b4e51dea24b83a89f890d797a2e51c6ef4d7b2d42bc31c1bb78f20ad394cd27ecc90b88b62c7c69c12011d4d2470512a4f9674f54e02240fddeb9cc3d5f6d5d9659be4b91d3304c49773a4c9d09c53bf4c1e85420d11d80969853b0af3f065c81cd1a8598569f909eeb318f8b9d0f6c63fdf	0	\N	admin
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	e08985de-73b2-4a63-9e2c-3e6f28bda217	2026-06-06 17:01:30.373+00	2026-06-06 19:01:30.373+00
\.


--
-- Name: about_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.about_id_seq', 1, true);


--
-- Name: about_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.about_locales_id_seq', 11, true);


--
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_id_seq', 4, true);


--
-- Name: classes_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_locales_id_seq', 28, true);


--
-- Name: classes_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_rels_id_seq', 41, true);


--
-- Name: dances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dances_id_seq', 7, true);


--
-- Name: dances_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dances_locales_id_seq', 22, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, true);


--
-- Name: events_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_locales_id_seq', 4, true);


--
-- Name: events_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_rels_id_seq', 4, true);


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

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 70, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 109, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 11, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 36, true);


--
-- Name: schools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_id_seq', 2, true);


--
-- Name: schools_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_locales_id_seq', 1, false);


--
-- Name: schools_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schools_rels_id_seq', 1, true);


--
-- Name: swing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.swing_id_seq', 1, true);


--
-- Name: swing_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.swing_locales_id_seq', 19, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: about_locales about_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.about_locales
    ADD CONSTRAINT about_locales_pkey PRIMARY KEY (id);


--
-- Name: about about_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.about
    ADD CONSTRAINT about_pkey PRIMARY KEY (id);


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
-- Name: dances_locales dances_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dances_locales
    ADD CONSTRAINT dances_locales_pkey PRIMARY KEY (id);


--
-- Name: dances dances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dances
    ADD CONSTRAINT dances_pkey PRIMARY KEY (id);


--
-- Name: events_locales events_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_locales
    ADD CONSTRAINT events_locales_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: events_rels events_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_rels
    ADD CONSTRAINT events_rels_pkey PRIMARY KEY (id);


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
-- Name: swing_locales swing_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.swing_locales
    ADD CONSTRAINT swing_locales_pkey PRIMARY KEY (id);


--
-- Name: swing swing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.swing
    ADD CONSTRAINT swing_pkey PRIMARY KEY (id);


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
-- Name: about_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX about_locales_locale_parent_id_unique ON public.about_locales USING btree (_locale, _parent_id);


--
-- Name: classes_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_created_at_idx ON public.classes USING btree (created_at);


--
-- Name: classes_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX classes_locales_locale_parent_id_unique ON public.classes_locales USING btree (_locale, _parent_id);


--
-- Name: classes_rels_dances_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classes_rels_dances_id_idx ON public.classes_rels USING btree (dances_id);


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
-- Name: dances_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dances_created_at_idx ON public.dances USING btree (created_at);


--
-- Name: dances_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX dances_locales_locale_parent_id_unique ON public.dances_locales USING btree (_locale, _parent_id);


--
-- Name: dances_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dances_updated_at_idx ON public.dances USING btree (updated_at);


--
-- Name: events_background_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_background_image_idx ON public.events USING btree (background_image_id);


--
-- Name: events_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_created_at_idx ON public.events USING btree (created_at);


--
-- Name: events_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX events_locales_locale_parent_id_unique ON public.events_locales USING btree (_locale, _parent_id);


--
-- Name: events_rels_dances_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_rels_dances_id_idx ON public.events_rels USING btree (dances_id);


--
-- Name: events_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_rels_order_idx ON public.events_rels USING btree ("order");


--
-- Name: events_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_rels_parent_idx ON public.events_rels USING btree (parent_id);


--
-- Name: events_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_rels_path_idx ON public.events_rels USING btree (path);


--
-- Name: events_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_updated_at_idx ON public.events USING btree (updated_at);


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
-- Name: payload_locked_documents_rels_dances_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_dances_id_idx ON public.payload_locked_documents_rels USING btree (dances_id);


--
-- Name: payload_locked_documents_rels_events_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_events_id_idx ON public.payload_locked_documents_rels USING btree (events_id);


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
-- Name: swing_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX swing_locales_locale_parent_id_unique ON public.swing_locales USING btree (_locale, _parent_id);


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
-- Name: about_locales about_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.about_locales
    ADD CONSTRAINT about_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.about(id) ON DELETE CASCADE;


--
-- Name: classes_locales classes_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_locales
    ADD CONSTRAINT classes_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.classes(id) ON DELETE CASCADE;


--
-- Name: classes_rels classes_rels_dances_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes_rels
    ADD CONSTRAINT classes_rels_dances_fk FOREIGN KEY (dances_id) REFERENCES public.dances(id) ON DELETE CASCADE;


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
-- Name: dances_locales dances_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dances_locales
    ADD CONSTRAINT dances_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.dances(id) ON DELETE CASCADE;


--
-- Name: events events_background_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_background_image_id_media_id_fk FOREIGN KEY (background_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: events_locales events_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_locales
    ADD CONSTRAINT events_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: events_rels events_rels_dances_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_rels
    ADD CONSTRAINT events_rels_dances_fk FOREIGN KEY (dances_id) REFERENCES public.dances(id) ON DELETE CASCADE;


--
-- Name: events_rels events_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_rels
    ADD CONSTRAINT events_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.events(id) ON DELETE CASCADE;


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
-- Name: payload_locked_documents_rels payload_locked_documents_rels_dances_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_dances_fk FOREIGN KEY (dances_id) REFERENCES public.dances(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_events_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_events_fk FOREIGN KEY (events_id) REFERENCES public.events(id) ON DELETE CASCADE;


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
-- Name: swing_locales swing_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.swing_locales
    ADD CONSTRAINT swing_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.swing(id) ON DELETE CASCADE;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

