import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const inquiries=sqliteTable('inquiries',{id:text('id').primaryKey(),createdAt:integer('created_at').notNull(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull(),details:text('details').notNull(),ipHash:text('ip_hash').notNull()});
