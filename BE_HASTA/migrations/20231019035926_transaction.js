/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transaction", (table) => {
    table.increments("id").primary();
    table.string("owner");
    table.bigInteger("totals").notNullable();
    table.bigInteger("uang").notNullable();
    table.bigInteger("kembalian").notNullable();
    table.boolean("isConfirm").defaultTo(false);
    table.boolean("isDone").defaultTo(false);
    table.boolean("isPickup").defaultTo(false);
    table.string("checked");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transaction");
};
