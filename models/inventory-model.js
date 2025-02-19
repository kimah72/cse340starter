const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    console.log(`Query for classification ${classification_id} returned ${data.rows.length} results`);
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error)
    return [];
  }
}

/* ***************************
 *  Get specific vehicle by ID
 * ************************** */
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    )
    return data.rows[0] // Return just one vehicle or null if not found
  } catch (error) {
    console.error("getVehicleById error " + error)
    return null // Return null on error or if vehicle not found
  }
}

/* ***************************
 *  Add a classification
 * ************************** */

async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    const result = await pool.query(sql, [classification_name])
    return result.rows[0]
  } catch (error) {
    console.error("Error adding classification:", error)
    return false
  }
}

/* ***************************
 *  Add to inventory
 * ************************** */
async function addInventory(data) {
  try {
    const sql = "INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_color, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    const result = await pool.query(sql, [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_color,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles
    ])
    return result.rows[0]
  } catch (error) {
    console.error("Error adding inventory:", error)
    return false
  }
}

module.exports = {
  getClassifications, 
  getInventoryByClassificationId,
  getVehicleById,
  addClassification,
  addInventory
};