const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
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
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error)
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
 *  Add new classification
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
 *  Add new inventory item
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

/* **********************
 *   Check for existing classification
 * ********************* */
async function checkExistingClassification(classification_name) {
  try {
    const sql = "SELECT * FROM classification WHERE classification_name = $1"
    const result = await pool.query(sql, [classification_name])
    console.log('Checking classification:', classification_name, 'Result:', result.rowCount) // Debug log
    return result.rowCount > 0
  } catch (error) {
    console.error("Error checking existing classification:", error)
    return false
  }
}

/* **********************
 *   Check for existing inventory item
 * ********************* */
async function checkExistingInventory(inv_make, inv_model, inv_year) {
  try {
    console.log('Checking for existing inventory:', { inv_make, inv_model, inv_year })
    const sql = "SELECT * FROM inventory WHERE inv_make = $1 AND inv_model = $2 AND inv_year = $3"
    const result = await pool.query(sql, [inv_make, inv_model, inv_year])
    console.log('Query result rowCount:', result.rowCount)
    return result.rowCount > 0
  } catch (error) {
    console.error("Error checking existing inventory:", error)
    return false
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
  addClassification,
  addInventory,
  checkExistingClassification,
  checkExistingInventory
}