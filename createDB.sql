SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE DATABASE webtech21project WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE webtech21project OWNER TO postgres;

connect webtech21project

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

create table IF NOT EXISTS public.consultationStatus (
    StatusType varchar PRIMARY KEY,
    StatusName varchar
);

create table IF NOT EXISTS public.RoleType (
    RoleType varchar PRIMARY KEY,
    RoleName varchar
);

create table IF NOT EXISTS public.User (
    UserId int PRIMARY KEY ,
    UserName varchar,
    Password varchar,
    RoleType varchar,

    FOREIGN KEY (RoleType) REFERENCES public.RoleType(RoleType)
);

create table IF NOT EXISTS public.ConsultationRequest (
    ConsultationRequestId int PRIMARY KEY,
    UserId int,
    StatusType varchar,
    FOREIGN KEY (UserId) REFERENCES public.User(UserId),
    FOREIGN KEY (StatusType) REFERENCES public.consultationStatus(StatusType)
);

create table IF NOT EXISTS public.MenuItem (
    MenuItemId int PRIMARY KEY,
    Title varchar,
    ItemDescription varchar,
    Price float
);

create table IF NOT EXISTS public.Allergen (
    AllergenCode varchar PRIMARY KEY,
    AlergenDescription varchar
);

create table IF NOT EXISTS public.MenuItemAllergen (
    MenuItemId int,
    AllergenCode varchar,

    FOREIGN KEY (MenuItemId) REFERENCES public.MenuItem(MenuItemId),
    FOREIGN KEY (AllergenCode) REFERENCES public.Allergen(AllergenCode),
    CONSTRAINT MenuItemAllergen_pk PRIMARY KEY (MenuItemId, AllergenCode)
);

create table IF NOT EXISTS public.Category (
    CategoryId int PRIMARY KEY,
    CategoryTitle varchar,
    CategoryDescription varchar
);

create table IF NOT EXISTS public.Tables (
    TablesId int PRIMARY KEY,
    TablesSeats int,
    TablesLocationDescription varchar
);

create table IF NOT EXISTS public.MenuItemCategory (
    MenuItemId int,
    CategoryId int,
    FOREIGN KEY (MenuItemId) REFERENCES public.MenuItem(MenuItemId),
    FOREIGN KEY (CategoryId) REFERENCES public.Category(CategoryId),
    CONSTRAINT MenuItemCategory_pk PRIMARY KEY (MenuItemId, CategoryId)
);

create table IF NOT EXISTS public.OrderState (
    OrderStateType varchar PRIMARY KEY,
    OrderStateName varchar
);

create table IF NOT EXISTS public.Order (
    OrderId int PRIMARY KEY,
    UserId int,
    FOREIGN KEY (UserId) REFERENCES public.User(UserId)
);

create table IF NOT EXISTS public.OrderItem (
    ItemAmount int,
    OrderId int,
    MenuItemId int,
    OrderStateType varchar,

    FOREIGN KEY (OrderId) REFERENCES public.Order(OrderId),
    FOREIGN KEY (MenuItemId) REFERENCES public.MenuItem(MenuItemId),
    FOREIGN KEY (OrderStateType) REFERENCES public.OrderState(OrderStateType),
    CONSTRAINT OrderItem_pk PRIMARY KEY (OrderId, MenuItemId)
);

ALTER TABLE public.consultationStatus OWNER TO postgres;
ALTER TABLE public.RoleType OWNER TO postgres;
ALTER TABLE public.User OWNER TO postgres;
ALTER TABLE public.ConsultationRequest OWNER TO postgres;
ALTER TABLE public.MenuItem OWNER TO postgres;
ALTER TABLE public.Allergen OWNER TO postgres;
ALTER TABLE public.MenuItemAllergen OWNER TO postgres;
ALTER TABLE public.Category OWNER TO postgres;
ALTER TABLE public.MenuItemCategory OWNER TO postgres;
ALTER TABLE public.OrderState OWNER TO postgres;
ALTER TABLE public.Order OWNER TO postgres;
ALTER TABLE public.OrderItem OWNER TO postgres;


INSERT INTO public.consultationStatus(StatusType, StatusName) VALUES('OPEN', 'Request is not processed.');
