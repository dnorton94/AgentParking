import {sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const siteSecrets=sqliteTable('site_secrets',{name:text('name').primaryKey(),ciphertext:text('ciphertext').notNull(),updatedAt:text('updated_at').notNull()});
export const interfaceTranslations=sqliteTable('interface_translations',{id:text('id').primaryKey(),catalog:text('catalog').notNull()});
import {integer,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const phoneJobs=sqliteTable('phone_jobs',{id:text('id').primaryKey(),fingerprint:text('fingerprint').notNull(),accessHash:text('access_hash').notNull(),callId:text('call_id'),status:text('status').notNull(),purpose:text('purpose').notNull(),reference:text('reference').notNull(),amountPence:integer('amount_pence'),destination:text('destination').notNull(),createdAt:text('created_at').notNull()},t=>[uniqueIndex('phone_jobs_fingerprint_unique').on(t.fingerprint)]);
