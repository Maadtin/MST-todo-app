exports.up = function (knex) {
    return knex
        .schema
        .createTable('todos', table => {
            table.increments('id');
            table.string('name').notNullable();
            table.boolean('completed').defaultTo(false);
        })
};

exports.down = function (knex) {
    return knex
        .schema
        .dropTable('todos');
};
