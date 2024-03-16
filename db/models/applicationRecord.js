// Require the knex library and initialize it with the development settings from the knexfile.
const knex = require("knex")(require("./db/knexfile.js").development);

// The ApplicationRecord class acts as a base class for all models in your application.
// It contains common operations for interacting with the database.
class ApplicationRecord {
  // This getter method should be overridden in derived classes to specify the table name associated with the model.
  static get tableName() {
    throw new Error("You must override this method in your model");
  }

  // Retrieves all records from the model's table.
  static async all() {
    return await knex(this.tableName).select("*");
  }

  // Finds a single record by its ID in the model's table.
  static async find(id) {
    return await knex(this.tableName).where("id", id).first();
  }

  // Inserts a new record into the model's table with the provided data.
  // Returns the newly created record.
  static async create(data) {
    const [insertId] = await knex(this.tableName).insert(data);
    if (!insertId) return null;
    return await knex(this.tableName).where("id", insertId).first();
  }

  // Updates an existing record identified by id with the given data.
  // Returns the updated record.
  static async update(id, data) {
    const updated = await knex(this.tableName).where("id", id).update(data);
    if (!updated) return null;
    return await knex(this.tableName).where("id", id).first();
  }

  // Deletes a record by its ID from the model's table.
  static async destroy(id) {
    return await knex(this.tableName).where("id", id).del();
  }

  // Retrieves a list of all attribute names (columns) for the model's table.
  static async attributes() {
    let columnInfo = await knex(this.tableName).columnInfo();
    return Object.keys(columnInfo);
  }

  // Retrieves specific columns for all records in the model's table.
  // If only one column name is provided, it returns an array of just those values.
  // If multiple column names are provided, it returns an array of arrays with the specified columns' values.
  static async pluck(...columnNames) {
    if (columnNames.length === 1) {
      const results = await knex(this.tableName).select(columnNames[0]);
      return results.map((row) => row[columnNames[0]]);
    } else {
      const results = await knex(this.tableName).select(columnNames);
      return results.map((row) => {
        return columnNames.map((columnName) => row[columnName]);
      });
    }
  }

  // Retrieves the first record in the model's table when sorted by ID.
  static async first() {
    return await knex(this.tableName).orderBy("id").first();
  }

  // Retrieves the last record in the model's table when sorted by ID in descending order.
  static async last() {
    return await knex(this.tableName).orderBy("id", "desc").first();
  }

  // Finds a single record that matches the given conditions.
  static async findBy(conditions) {
    return await knex(this.tableName).where(conditions).first();
  }

  // Returns a query builder instance for chaining more specific queries that match the given conditions.
  static where(conditions) {
    return knex(this.tableName).where(conditions);
  }

  // Counts the total number of records in the model's table.
  static async count() {
    const result = await knex(this.tableName).count({ count: "*" }).first();
    return result.count;
  }

  // Checks if there is at least one record that meets the given conditions.
  static async exists(conditions) {
    const result = await knex(this.tableName)
      .where(conditions)
      .select("id")
      .first();
    return !!result;
  }

  // Returns a query builder instance to order the results by a specific column and direction (ascending by default).
  static order(column, direction = "asc") {
    return knex(this.tableName).orderBy(column, direction);
  }

  // Tries to find a record that matches the given attributes. If it doesn't exist, creates one with those attributes.
  // Returns the found or created record.
  static async findOrCreateBy(attributes) {
    const found = await knex(this.tableName).where(attributes).first();
    if (found) {
      return found;
    } else {
      const [insertId] = await knex(this.tableName).insert(attributes);
      if (!insertId) return null;

      return await knex(this.tableName).where("id", insertId).first();
    }
  }
}

// Export the ApplicationRecord class for use in other parts of the application.
module.exports = ApplicationRecord;
