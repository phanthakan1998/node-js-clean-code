exports.up = function (knex) {
  return knex.schema
    .createTable("destinations", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("fullname", 255).notNullable(); // lowercase
      table.string("shortname", 100).notNullable(); // lowercase
    })
    .then(() => {
      return knex("destinations").insert([
        { fullname: "New York City", shortname: "NYC" },
        { fullname: "Los Angeles", shortname: "LA" },
        { fullname: "Chicago", shortname: "CHI" },
      ]);
    })
    .then(() => {
      return knex.schema.createTable("origins", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("fullname", 255).notNullable(); // lowercase
        table.string("shortname", 100).notNullable(); // lowercase
      });
    })
    .then(() => {
      return knex("origins").insert([
        { fullname: "New York City", shortname: "NYC" },
        { fullname: "Los Angeles", shortname: "LA" },
        { fullname: "Chicago", shortname: "CHI" },
      ]);
    })
    .then(() => {
      return knex.schema.createTable("flights", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table
          .uuid("origin_id")
          .references("id")
          .inTable("origins")
          .onDelete("CASCADE");
        table
          .uuid("destination_id")
          .references("id")
          .inTable("destinations")
          .onDelete("CASCADE");
        table.integer("departure_date").notNullable();
        table.integer("arrival_date").notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.string("airline", 255).notNullable();
        table.string("status", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    })
    .then(() => {
      return knex.schema.createTable("payment", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("cardname", 100).notNullable(); // lowercase
        table.string("cardnumber", 19).notNullable(); // lowercase
        table.decimal("price", 10, 2).notNullable();
        table.string("bookingid", 50).notNullable().unique(); // lowercase
        table.string("status", 50).notNullable();
      });
    })
    .then(() => {
      return knex.schema.createTable("bookings", function (table) {
        table
          .uuid("bookingid")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("passengername", 100).notNullable(); // lowercase
        table.string("passengerlastname", 100).notNullable(); // lowercase
        table
          .uuid("flightid")
          .notNullable()
          .references("id")
          .inTable("flights");
        table
          .uuid("paymentid")
          .notNullable()
          .references("id")
          .inTable("payment");
        table.integer("bookingdate").notNullable(); // lowercase
        table.decimal("price", 10, 2).notNullable();
        table.string("passengerid", 100); // lowercase
        table.string("status", 50).notNullable();
      });
    })
    .then(async () => {
      const destinations = await knex("destinations").select("id");
      const origins = await knex("origins").select("id");
      const current_date = new Date();
      const end_date = new Date("2024-12-31");

      for (const origin of origins) {
        for (const destination of destinations) {
          if (origin.id !== destination.id) {
            let next_date = new Date(current_date);

            while (next_date <= end_date) {
              for (let i = 1; i <= 3; i++) {
                await knex("flights").insert({
                  origin_id: origin.id,
                  destination_id: destination.id,
                  departure_date:
                    Math.floor(next_date.getTime() / 1000) + i * 3600,
                  arrival_date:
                    Math.floor(next_date.getTime() / 1000) + (i + 1) * 3600,
                  price:
                    Math.round(Math.random() * (500 - 100) + 100 * 100) / 100,
                  airline: "Sample Airline",
                  status: "On Time",
                });
              }
              next_date.setDate(next_date.getDate() + 1);
            }
          }
        }
      }
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("bookings")
    .dropTableIfExists("payment")
    .dropTableIfExists("flights")
    .dropTableIfExists("origins")
    .dropTableIfExists("destinations");
};
